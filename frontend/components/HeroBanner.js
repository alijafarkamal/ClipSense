import { FaYoutube } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-12">
      <div>
        <h1 className="text-5xl font-extrabold flex items-center gap-3">
          ClipSense
          <span className="animate-pulse text-red-500">
            <FaYoutube size={40} />
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl">
          🎥 Extract Knowledge from Videos, Fast.<br />
          Paste any YouTube link and we’ll give you insights, summaries, and Q&A in seconds.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">👀 Live Demo</span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">⭐ Powered by Open Tech</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">🏁 Hackathon Edition</span>
        </div>
      </div>
    </section>
  );
} 