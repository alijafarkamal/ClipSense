import { FaRegLightbulb, FaRegEdit, FaRegListAlt, FaRegQuestionCircle } from "react-icons/fa";

export default function SmartTips() {
  return (
    <div className="mt-12 bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-6 max-w-4xl mx-auto flex flex-wrap gap-8 justify-center">
      <div className="flex flex-col items-center">
        <FaRegLightbulb className="text-yellow-400" size={32} />
        <span className="mt-2 text-sm font-semibold">Create Flashcards</span>
      </div>
      <div className="flex flex-col items-center">
        <FaRegEdit className="text-blue-400" size={32} />
        <span className="mt-2 text-sm font-semibold">Blog Draft</span>
      </div>
      <div className="flex flex-col items-center">
        <FaRegListAlt className="text-green-400" size={32} />
        <span className="mt-2 text-sm font-semibold">Summarize Lectures</span>
      </div>
      <div className="flex flex-col items-center">
        <FaRegQuestionCircle className="text-purple-400" size={32} />
        <span className="mt-2 text-sm font-semibold">Quiz Classmates</span>
      </div>
    </div>
  );
} 