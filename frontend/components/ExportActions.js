export default function ExportActions({ onExportPDF, onExportNotion, onCopyAll }) {
  return (
    <div className="fixed bottom-6 right-6 flex gap-3 z-50 bg-white/70 backdrop-blur-md shadow-xl rounded-xl p-4 border border-blue-100">
      <button onClick={onExportPDF} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition">Export PDF</button>
      <button onClick={onExportNotion} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-green-700 transition">Export to Notion</button>
      <button onClick={onCopyAll} className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-gray-800 transition">Copy All</button>
    </div>
  );
} 