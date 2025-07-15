import { Tab } from "@headlessui/react";
import { FaRegListAlt, FaRegClock, FaRegQuestionCircle, FaRegFileAlt, FaRegCopy } from "react-icons/fa";

export default function ResultsTabs({ result, showTranscript, setShowTranscript, handleCopyToNotion, handleDownloadPDF }) {
  const tabs = [
    {
      name: "Summary",
      icon: <FaRegListAlt className="inline mr-2 text-blue-500" />,
      content: (
        <div className="flex flex-col gap-2">
          <button onClick={() => navigator.clipboard.writeText(result.summary.join("\n"))} className="self-end text-xs text-blue-600 hover:underline flex items-center gap-1"><FaRegCopy /> Copy</button>
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            {result.summary.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      ),
    },
    {
      name: "Timeline",
      icon: <FaRegClock className="inline mr-2 text-purple-500" />,
      content: (
        <div className="flex flex-col gap-2">
          <button onClick={() => navigator.clipboard.writeText(result.timeline.map(t => `${t.concept} — ${t.timestamp}`).join("\n"))} className="self-end text-xs text-blue-600 hover:underline flex items-center gap-1"><FaRegCopy /> Copy</button>
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            {result.timeline.map((t, i) => (
              <li key={i}>{t.concept} — {t.timestamp}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      name: "Q&A",
      icon: <FaRegQuestionCircle className="inline mr-2 text-green-500" />,
      content: (
        <div className="flex flex-col gap-2">
          <button onClick={handleDownloadPDF} className="self-end text-xs text-blue-600 hover:underline flex items-center gap-1"><FaRegCopy /> Export PDF</button>
          <ol className="list-decimal ml-6 text-gray-800 space-y-4">
            {result.qa.map((q, i) => (
              <li key={i} className="mb-2 bg-white/80 rounded-lg p-3 shadow hover:shadow-lg transition">
                <div className="font-medium mb-1">{q.question.replace(/^\d+\.?\s*/, "")}</div>
                <ul className="ml-4 space-y-1">
                  {q.options.map((opt, j) => (
                    <li key={j} className={`list-none pl-2 rounded px-2 py-1 ${q.answer === j ? 'bg-green-100 text-green-800 font-bold' : 'hover:bg-gray-100'}`}>{String.fromCharCode(97 + j)}. {opt}{q.answer === j ? " ✅" : ""}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      name: "Transcript",
      icon: <FaRegFileAlt className="inline mr-2 text-gray-500" />,
      content: (
        <div className="flex flex-col gap-2">
          <button onClick={() => navigator.clipboard.writeText(result.transcript)} className="self-end text-xs text-blue-600 hover:underline flex items-center gap-1"><FaRegCopy /> Copy</button>
          <div className="max-h-64 overflow-y-auto bg-gray-900 bg-opacity-80 p-4 rounded border text-sm whitespace-pre-wrap text-white font-mono shadow-lg">
            {result.transcript}
          </div>
        </div>
      ),
    },
  ];
  return (
    <Tab.Group>
      <Tab.List className="flex gap-4 mb-6">
        {tabs.map((tab, idx) => (
          <Tab key={tab.name} className={({ selected }) =>
            `flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition focus:outline-none ${selected ? 'bg-white/80 shadow text-blue-700' : 'bg-white/40 text-gray-600 hover:bg-white/60'}`
          }>
            {tab.icon} {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab, idx) => (
          <Tab.Panel key={tab.name} className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-6">
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
} 