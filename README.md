# ClipSense

> **AI‑powered insight extractor for YouTube videos.**  
> Paste any YouTube link, get instant bullet‑point summaries, timelines of key concepts, multiple‑choice Q&A, full transcripts—and soon, a Chrome extension!

---

## 🚀 Motivation

> “I often find myself short on time but eager to learn from 10+ minute YouTube videos. I tried every Chrome extension—some paid, some token‑limited, many that simply failed on certain videos—and none offered a true all‑in‑one solution. I needed quick summaries, full transcripts, and the ability to jump to key moments. So I built **ClipSense**, the tool I wished existed. Now anyone can extract exactly what they need—at the speed they need it.”

---

## 🔥 What ClipSense Solves

- **Information Overload:** Long videos contain rich content but demand too much time.
- **Fragmented Tools:** Existing extensions either limit tokens, charge fees, or break on certain videos.
- **Inefficient Learning:** Manually pausing, transcript‑mining, and note‑taking steal valuable focus.

**ClipSense** combines everything in one modern SaaS interface:  
**Summaries**, **timelines**, **Q&A**, **full transcripts**, and **export tools**—so you can learn faster, remember better, and dive into the most important moments instantly.

---

## 🎯 Key Features

| Feature                         | Benefit                                                          |
| --------------------------------| -----------------------------------------------------------------|
| **Bullet‑point Summary**        | Distills hours of content into 5–10 concise points.              |
| **Timeline of Key Concepts**    | See timestamped concepts at a glance—jump straight to them.      |
| **Multiple‑Choice Q&A**         | Reinforce memory with auto‑generated questions & answers.        |
| **Full Transcript**             | Read or search every word; click timestamps to watch that moment.|
| **Export Tools**                | PDF, Notion, or “Copy All” for seamless integration.             |
| **Video Metadata Sidebar**      | Thumbnail, channel, publish date, view count, and “Watch Original.”|
| **Smart Tips**                  | Ideas for flashcards, blog drafts, quizzes, and more.            |
| **Premium UI**                  | Glassmorphism cards, animated hero, responsive design.           |
| **Parallel LLM Calls**          | Fast results via chunked transcripts and multithreading.         |
| **Upcoming Chrome Extension**   | Instant insights while you browse YouTube.                       |

---

## 🏗 Architecture

### Backend (Python / FastAPI)
1. **Transcript Extraction**  
   Uses [`youtube_transcript_api`](https://pypi.org/project/youtube-transcript-api/).
2. **Chunking & Parallel Processing**  
   Splits transcript into ~5 chunks, processes in parallel with `ThreadPoolExecutor`.
3. **LLM Integration**  
   Sends chunks to [OpenRouter LLM API](https://openrouter.ai/) (moonshotai/kimi-k2:free) to generate:
   - Bullet summaries  
   - Timestamped key concepts  
   - Multiple‑choice Q&A  
4. **Aggregation & API**  
   Combines all responses into a single JSON payload.  
5. **CORS** enabled for seamless frontend calls.

### Frontend (Next.js / React / TailwindCSS)
- **App Router** with pages for Home & Results.
- **Animated Hero** with Pulse YouTube icon.
- **Glassmorphism Cards** (`bg-white/60`, `backdrop-blur-md`).
- **Headless UI Tabs** for Summary, Timeline, Q&A, Transcript.
- **Export Buttons** powered by [`jsPDF`](https://github.com/parallax/jsPDF) & Notion‑compatible markdown.
- **Responsive**: Stacks elegantly on mobile; desktop shows sidebar + tabs.
- **Smart Tips** panel for suggested next‑steps.

---

## ⚙️ Tech Stack

- **Backend**  
  - Python 3.10+  
  - FastAPI  
  - `youtube_transcript_api`  
  - `openrouter` (LLM API)  
  - `concurrent.futures.ThreadPoolExecutor`  
- **Frontend**  
  - Next.js (React, App Router)  
  - TailwindCSS  
  - Headless UI  
  - react-icons  
  - jsPDF / html2canvas  
- **Dev & Deployment**  
  - GitHub Actions (CI)  
  - Vercel (frontend hosting)  
  - Docker (optional backend container)

---

## 📦 Quickstart

### 1. **Clone & Install**

```bash
git clone https://github.com/alijafarkamal/ClipSense.git
cd ClipSense
2. Backend Setup
bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create a .env file in the project root:
# OPENROUTER_API_KEY=your_openrouter_api_key

uvicorn main:app --reload
3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev

# Visit http://localhost:3000
📂 Folder Structure
bash
Copy
Edit
├── main.py           # FastAPI backend
├── requirements.txt
├── .env              # API keys & config
└── frontend/
    ├── pages/        # Next.js pages
    ├── components/   # Reusable UI components
    ├── styles/       # Tailwind config
    └── public/       # Static assets & icons
🎬 Demo
▶️ Watch the 2‑minute demo video: YouTube (Unlisted)

🖼 Images

![Screenshot 1](https://github.com/user-attachments/assets/30ac20be-974b-4ba9-bdca-5e2b07404fc3)  
![Screenshot 2](https://github.com/user-attachments/assets/4af53e6d-6312-4900-a13b-d537b23f0987) 
![Screenshot 3](https://github.com/user-attachments/assets/59060c49-ac82-4b26-b34f-098c26ccf124) 
![Screenshot 4](https://github.com/user-attachments/assets/6ecf7797-5dd3-4be7-9ed5-e20dd90876d6)  
![Screenshot 5](https://github.com/user-attachments/assets/00c1b765-020f-47dd-a771-4ad84f4a2a77)  

📈 Roadmap
Chrome Extension for in‑page insights

User Accounts & History

Custom Prompt Templates

Team & Classroom Plans (B2B)

White‑Label SDK for partners

🤝 License
MIT © 2025 Ali Jafar

