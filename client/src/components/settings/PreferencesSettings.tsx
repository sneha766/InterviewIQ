import { useState } from "react";
import { Sliders, Code2, Brain, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function PreferencesSettings() {
  const [language, setLanguage] = useState("cpp");
  const [interviewType, setInterviewType] = useState("TECHNICAL");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("iq_pref_lang", language);
    localStorage.setItem("iq_pref_interview", interviewType);
    setSaved(true);
    toast.success("Application preferences saved.");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="p-8 space-y-6 rounded-3xl">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
          <Sliders className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Application Preferences</h2>
          <p className="text-sm text-slate-500">Configure default options for your interview practice & IDE workspace.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-blue-600" /> Default Programming Language
          </label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="rounded-xl border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpp">C++ (GCC)</SelectItem>
              <SelectItem value="java">Java (OpenJDK)</SelectItem>
              <SelectItem value="python">Python (3.x)</SelectItem>
              <SelectItem value="javascript">JavaScript (Node.js)</SelectItem>
              <SelectItem value="go">Go (Golang)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" /> Default Interview Mode
          </label>
          <Select value={interviewType} onValueChange={setInterviewType}>
            <SelectTrigger className="rounded-xl border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TECHNICAL">Technical Interview</SelectItem>
              <SelectItem value="HR">Behavioral / HR</SelectItem>
              <SelectItem value="CODING">Coding Algorithms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">
          {saved ? <><Check className="mr-2 h-4 w-4" /> Preferences Saved</> : "Save Preferences"}
        </Button>
      </div>
    </Card>
  );
}
