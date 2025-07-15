# ClipSense

AI-powered insight extractor for YouTube videos. Paste a YouTube link, get instant summaries, timelines, Q&A, and full transcripts in a beautiful SaaS UI. Built for hackathons, demos, and investor pitches.

## Features

- Paste any YouTube link and extract:
  - Bullet-point summary
  - Timeline of key concepts (with timestamps)
  - Multiple-choice Q&A
  - Full transcript
- Modern, responsive UI (Next.js, TailwindCSS)
- Glassmorphism cards, animated hero, export tools (PDF, Notion, Copy All)
- Video metadata sidebar (thumbnail, title, channel, duration, publish date, views)
- Smart Tips section for creative use cases
- Fast: parallel LLM calls, optimized chunking

## Demo

![ClipSense UI Screenshot](<img width="1823" height="784" alt="Screenshot from 2025-07-15 21-09-23" src="https://github.com/user-attachments/assets/8ac9972c-659f-46b7-a059-7d1d362fa846" />
)

## Architecture

- **Backend:**
  - FastAPI server
  - Extracts YouTube transcript using `youtube_transcript_api`
  - Chunks transcript into 5 parts for speed
  - Sends each chunk in parallel to OpenRouter LLM API (`moonshotai/kimi-k2:free`)
  - Aggregates summary, timeline, Q&A, and transcript
  - CORS enabled for frontend
- **Frontend:**
  - Next.js (App Router), React, TailwindCSS
  - Premium SaaS look: gradients, glassmorphism, rounded corners
  - Headless UI tabs for results (Summary, Timeline, Q&A, Transcript)
  - Export actions: PDF, Notion, Copy All
  - Responsive/mobile-friendly

## Quickstart

### 1. Clone & Install

```
git clone https://github.com/alijafarkamal/ClipSense.git
cd ClipSense
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Run Backend

```
uvicorn main:app --reload
```

### 4. Run Frontend

```
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

- `main.py` — FastAPI backend
- `frontend/` — Next.js frontend
  - `components/` — UI components
  - `src/app/` — Main app logic

## Tech Stack

- FastAPI, Python, OpenAI (OpenRouter), youtube_transcript_api
- Next.js, React, TailwindCSS, Headless UI, jsPDF, react-icons

## License

MIT © 2025 Ali Jafar

[GitHub Repo](https://github.com/alijafarkamal/ClipSense) 
