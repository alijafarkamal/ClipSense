
# ClipSense

AI-powered insight extractor for YouTube videos. Paste a YouTube link, get instant summaries, timelines, Q&A, and full transcripts in a beautiful SaaS UI.

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

![Screenshot 1](https://github.com/user-attachments/assets/30ac20be-974b-4ba9-bdca-5e2b07404fc3)  
![Screenshot 2](https://github.com/user-attachments/assets/4af53e6d-6312-4900-a13b-d537b23f0987) 
![Screenshot 3](https://github.com/user-attachments/assets/59060c49-ac82-4b26-b34f-098c26ccf124) 
![Screenshot 4](https://github.com/user-attachments/assets/6ecf7797-5dd3-4be7-9ed5-e20dd90876d6)  
![Screenshot 5](https://github.com/user-attachments/assets/00c1b765-020f-47dd-a771-4ad84f4a2a77)  




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

```bash
git clone https://github.com/alijafarkamal/ClipSense.git
cd ClipSense
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd frontend
npm install
````

### 2. Environment Variables

Create a `.env` file in the root:

```bash
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Run Backend

```bash
uvicorn main:app --reload
```

### 4. Run Frontend

```bash
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

* `main.py` — FastAPI backend
* `frontend/` — Next.js frontend

  * `components/` — UI components
  * `src/app/` — Main app logic

## Tech Stack

* FastAPI, Python, OpenAI (OpenRouter), youtube\_transcript\_api
* Next.js, React, TailwindCSS, Headless UI, jsPDF, react-icons

## License

MIT © 2025 Ali Jafar

[GitHub Repo](https://github.com/alijafarkamal/ClipSense)
