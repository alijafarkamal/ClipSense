import { useState } from "react";

export default function YoutubeInputCard({ youtubeUrl, setYoutubeUrl, loading, handleSubmit, stage }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-8 border border-blue-100 transition-all hover:shadow-2xl"
    >
      <input
        type="text"
        placeholder="Paste YouTube link here"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="w-full p-4 rounded-lg border-2 border-blue-300 focus:border-blue-500 bg-blue-50 text-lg font-semibold placeholder-blue-400 transition mb-4"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-pulse"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="loader inline-block w-5 h-5 border-2 border-t-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </span>
        ) : (
          "Extract Insights"
        )}
      </button>
    </form>
  );
} 