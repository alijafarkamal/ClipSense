export default function Sidebar({ video }) {
  if (!video) return null;
  return (
    <aside className="hidden lg:block w-80 bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-6 ml-6">
      <img src={video.thumbnail} className="rounded-lg mb-4 w-full aspect-video object-cover" alt="Video thumbnail" />
      <h2 className="font-bold text-lg mb-1 truncate" title={video.title}>{video.title}</h2>
      <p className="text-gray-600 mb-2 truncate" title={video.channel}>{video.channel}</p>
      <div className="flex gap-2 text-xs mb-4 text-gray-500">
        <span>⏱ {video.duration}</span>
        <span>📅 {video.publishDate}</span>
        <span>👁 {video.viewCount}</span>
      </div>
      <a href={video.url} target="_blank" rel="noopener noreferrer" className="mt-4 block bg-red-500 text-white text-center py-2 rounded-lg font-semibold hover:bg-red-600 transition">Watch Original</a>
    </aside>
  );
} 