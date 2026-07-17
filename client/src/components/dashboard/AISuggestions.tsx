import { Sparkles } from "lucide-react";

const suggestions = [
  "Add more React projects to improve ATS score.",
  "Practice JavaScript coding interviews.",
  "Your communication score can be improved.",
  "Upload an updated resume.",
];

export default function AISuggestions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="text-blue-600" />

        <h2 className="text-xl font-semibold">
          AI Suggestions
        </h2>
      </div>

      <div className="space-y-4">
        {suggestions.map((tip) => (
          <div
            key={tip}
            className="rounded-xl bg-slate-100 p-4 text-sm"
          >
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}