from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound
import re
from datetime import timedelta
import os
from openai import OpenAI
import concurrent.futures

app = FastAPI()

# Allow all origins for hackathon/demo purposes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProcessRequest(BaseModel):
    youtube_url: str

def extract_video_id(url: str) -> str:
    # Handles various YouTube URL formats
    patterns = [
        r"youtu\.be/([\w-]{11})",
        r"youtube\.com/watch\?v=([\w-]{11})",
        r"youtube\.com/embed/([\w-]{11})",
        r"youtube\.com/v/([\w-]{11})"
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def chunk_transcript(transcript, chunk_minutes=5):
    chunks = []
    current_chunk = []
    current_start = 0
    chunk_seconds = chunk_minutes * 60
    for entry in transcript:
        start = int(entry['start'])
        if not current_chunk:
            current_start = start
        if start - current_start < chunk_seconds:
            current_chunk.append(entry)
        else:
            chunks.append(current_chunk)
            current_chunk = [entry]
            current_start = start
    if current_chunk:
        chunks.append(current_chunk)
    # Convert each chunk to text with timestamps
    chunk_texts = []
    for chunk in chunks:
        text = " ".join([f"[{str(timedelta(seconds=int(e['start'])))}] {e['text']}" for e in chunk])
        chunk_texts.append(text)
    return chunk_texts

def chunk_transcript_dynamic(transcript, num_chunks=10):
    if not transcript:
        return []
    total_duration = transcript[-1]['start'] + transcript[-1].get('duration', 0)
    chunk_length = total_duration / num_chunks
    chunks = [[] for _ in range(num_chunks)]
    for entry in transcript:
        idx = min(int(entry['start'] // chunk_length), num_chunks - 1)
        chunks[idx].append(entry)
    # Convert each chunk to text with timestamps
    chunk_texts = []
    for chunk in chunks:
        text = " ".join([f"[{str(timedelta(seconds=int(e['start'])))}] {e['text']}" for e in chunk])
        chunk_texts.append(text)
    return chunk_texts

PROMPT_TEMPLATE = """
You're an educational AI agent. I’ll give you a chunk of transcript text from a YouTube video. Your job is to:

1. Summarize it in simple language (max 5 bullets)
2. Identify key concepts with timestamp markers
3. Create 2 multiple-choice questions (MCQs) with answer + 2 wrong options

Here’s the chunk:
---
{text}
---

Now output in this format:
---
SUMMARY:
- Bullet 1
- Bullet 2
...

KEY CONCEPTS:
- Concept A — 00:02:15
- Concept B — 00:03:40

Q&A:
1. [Question]
   a. Wrong
   b. Correct ✅
   c. Wrong

2. [Question]
   a. Correct ✅
   b. Wrong
   c. Wrong
---
"""

def call_openrouter_on_chunk(chunk_text):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise Exception("OPENROUTER_API_KEY environment variable not set.")
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )
    prompt = PROMPT_TEMPLATE.replace("{text}", chunk_text)
    messages = [
        {"role": "user", "content": prompt}
    ]
    completion = client.chat.completions.create(
        extra_headers={
            "HTTP-Referer": "https://clipsense.ai",  # Replace with your site URL
            "X-Title": "ClipSense",  # Replace with your site name
        },
        extra_body={},
        model="moonshotai/kimi-k2:free",
        messages=messages
    )
    return parse_gemini_response(completion.choices[0].message.content)

def parse_gemini_response(text):
    # Simple parser for the expected format
    summary, key_concepts, qa = [], [], []
    section = None
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("SUMMARY:"):
            section = "summary"
            continue
        elif line.startswith("KEY CONCEPTS:"):
            section = "concepts"
            continue
        elif line.startswith("Q&A:"):
            section = "qa"
            continue
        elif line.startswith("---") or not line:
            continue
        if section == "summary" and line.startswith("-"):
            summary.append(line[1:].strip())
        elif section == "concepts" and line.startswith("-"):
            parts = line[1:].split("—")
            if len(parts) == 2:
                key_concepts.append({"concept": parts[0].strip(), "timestamp": parts[1].strip()})
        elif section == "qa":
            if line[0].isdigit() and "." in line:
                qa.append({"question": line[line.find("]")+1:].strip(), "options": [], "answer": None})
            elif line[0] in "abc" and "." in line:
                opt = line[line.find(".")+1:].strip()
                if "✅" in opt:
                    opt = opt.replace("✅", "").strip()
                    qa[-1]["options"].append(opt)
                    qa[-1]["answer"] = len(qa[-1]["options"])-1
                else:
                    qa[-1]["options"].append(opt)
    return {"summary": summary, "key_concepts": key_concepts, "qa": qa}

def get_video_title(video_id):
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        resp = requests.get(url)
        if resp.status_code == 200:
            return resp.json().get("title", "YouTube Video")
    except Exception:
        pass
    return "YouTube Video"

def process_video_chunks_parallel(chunks):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = list(executor.map(call_openrouter_on_chunk, [chunk for chunk in chunks if chunk.strip()]))
    return results

@app.post("/process")
async def process_video(request: ProcessRequest):
    video_id = extract_video_id(request.youtube_url)
    if not video_id:
        return {"error": "Invalid YouTube URL"}
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except (TranscriptsDisabled, NoTranscriptFound):
        return {"error": "Transcript not available for this video."}
    except Exception as e:
        return {"error": str(e)}
    # Dynamically chunk transcript into 5 equal parts
    chunks = chunk_transcript_dynamic(transcript, num_chunks=5)
    processed_chunks = process_video_chunks_parallel(chunks)
    summary = sum([c["summary"] for c in processed_chunks], [])
    timeline = sum([c["key_concepts"] for c in processed_chunks], [])
    qa = sum([c["qa"] for c in processed_chunks], [])
    title = get_video_title(video_id)
    # Add full transcript text for frontend transcript button
    full_transcript = "\n".join([e['text'] for e in transcript])
    return {
        "title": title,
        "summary": summary,
        "timeline": timeline,
        "qa": qa,
        "transcript": full_transcript
    } 