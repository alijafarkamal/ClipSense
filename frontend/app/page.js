"use client";
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { FaYoutube } from "react-icons/fa";
import HeroBanner from "../components/HeroBanner";
import YoutubeInputCard from "../components/YoutubeInputCard";
import ResultsTabs from "../components/ResultsTabs";
import Sidebar from "../components/Sidebar";
import ExportActions from "../components/ExportActions";
import SmartTips from "../components/SmartTips";

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);

  const getVideoId = (url) => {
    const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setShowTranscript(false);
    try {
      const res = await axios.post("http://localhost:5000/process", { youtube_url: youtubeUrl });
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setResult(res.data);
      }
    } catch (err) {
      setError("Failed to process video. Please try again.");
    }
    setLoading(false);
  };

  const handleCopyToNotion = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      alert("Copied to clipboard! Paste into Notion.");
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(result.title, 10, 15);
    doc.setFontSize(12);
    doc.text("Summary:", 10, 25);
    result.summary.forEach((s, i) => {
      doc.text(`- ${s}`, 12, 32 + i * 7);
    });
    let y = 32 + result.summary.length * 7 + 5;
    doc.text("Timeline:", 10, y);
    y += 7;
    result.timeline.forEach((t, i) => {
      doc.text(`- ${t.concept} — ${t.timestamp}`, 12, y + i * 7);
    });
    y += result.timeline.length * 7 + 5;
    doc.text("Q&A:", 10, y);
    y += 7;
    result.qa.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question}`, 12, y);
      y += 7;
      q.options.forEach((opt, j) => {
        doc.text(`   ${String.fromCharCode(97 + j)}. ${opt}${q.answer === j ? " ✅" : ""}`, 16, y);
        y += 7;
      });
      y += 2;
    });
    doc.save("clipsense-notes.pdf");
  };

  const videoMeta = result && {
    title: result.title,
    channel: "Sample Channel",
    thumbnail: `https://img.youtube.com/vi/${getVideoId(youtubeUrl)}/hqdefault.jpg`,
    duration: "12:34",
    publishDate: "2024-07-14",
    viewCount: "1,234,567",
    url: youtubeUrl,
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <HeroBanner />
      <YoutubeInputCard
        youtubeUrl={youtubeUrl}
        setYoutubeUrl={setYoutubeUrl}
        loading={loading}
        handleSubmit={handleSubmit}
        stage={null}
      />
      <div className="text-xs text-gray-500 mt-2 max-w-md text-center">
        <p>For best results, use videos with English transcripts enabled.</p>
      </div>
      {loading && <div className="mt-6">Loading...</div>}
      {error && <div className="mt-6 text-red-500">{error}</div>}
      {result && (
        <>
          <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
            <div className="flex-1">
              <ResultsTabs
                result={result}
                showTranscript={showTranscript}
                setShowTranscript={setShowTranscript}
                handleCopyToNotion={handleCopyToNotion}
                handleDownloadPDF={handleDownloadPDF}
              />
            </div>
            <Sidebar video={videoMeta} />
          </div>
          <div className="hidden md:block">
            <ExportActions
              onExportPDF={handleDownloadPDF}
              onExportNotion={handleCopyToNotion}
              onCopyAll={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
            />
          </div>
          <SmartTips />
        </>
      )}
    </main>
  );
} 