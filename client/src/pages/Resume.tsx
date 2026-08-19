import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import ResumeUpload from "../components/resume/ResumeUpload";
import ResumePreview from "../components/resume/ResumePreview";
import AnalysisResult from "../components/resume/AnalysisResult";
import ResumeHistory from "../components/resume/ResumeHistory";

import { Button } from "../components/ui/button";

import { analyzeResume } from "../services/resume.service";

import type { ResumeAnalysis,ResumeHistoryItem } from "../types/resume";

export default function Resume() {
  const [file, setFile] = useState<File | null>(null);

  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<ResumeHistoryItem[]>([]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setAnalysis(null);
  };

  const analyze = async () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }

    try {
      setLoading(true);

      const result = await analyzeResume();

      setAnalysis(result);

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          fileName: file.name,
          score: result.score,
          uploadedAt: new Date().toLocaleDateString(),
        },
        ...prev,
      ]);

      toast.success("Resume analyzed successfully.");
    } catch {
      toast.error("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const replaceResume = () => {
    setAnalysis(null);
    setFile(null);
  };

  const deleteResume = () => {
    setAnalysis(null);
    setFile(null);

    toast.success("Resume removed.");
  };

  const downloadReport = () => {
    toast.info("Coming soon.");
  };

  const shareReport = () => {
    toast.info("Coming soon.");
  };

  return (
    <div className="space-y-8">

      <ResumeUpload
        onFileSelect={handleFileSelect}
      />

      {file && (
        <ResumePreview
          file={file}
          onDelete={deleteResume}
          onReplace={replaceResume}
          onDownload={downloadReport}
        />
      )}

      {file && !analysis && (

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <div className="flex flex-col items-center">

            <Button
              size="lg"
              className="rounded-xl"
              disabled={loading}
              onClick={analyze}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Analyzing Resume...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>

          </div>

        </div>

      )}

      {analysis && file && (

        <AnalysisResult
          file={file}
          analysis={analysis}
          onAnalyzeAgain={analyze}
          onDelete={deleteResume}
          onReplace={replaceResume}
          onDownload={downloadReport}
          onShare={shareReport}
        />

      )}

      <ResumeHistory
        resumes={history}
      />

    </div>
  );
}