import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
}

export default function ResumeUpload({
  onFileSelect,
}: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF resumes are supported.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume size must be less than 5MB.");
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    onFileSelect(file);

    toast.success("Resume uploaded successfully.");
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    toast.success("Resume removed.");
  };

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Upload Resume
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Upload your latest resume in PDF format and receive
          AI-powered ATS analysis with actionable suggestions.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
      />

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.995 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          const file = e.dataTransfer.files[0];

          if (file) {
            handleFile(file);
          }
        }}
        className={`rounded-3xl border-2 border-dashed p-10 transition-all duration-300 ${
          dragging
            ? "border-blue-600 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        }`}
      >
        <div className="flex flex-col items-center">

          <div className="rounded-full bg-blue-100 p-5">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="mt-5 text-xl font-semibold">
            Drag & Drop Resume
          </h3>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            PDF only • Maximum size 5MB
          </p>

          <Button
            className="mt-6 rounded-xl"
            onClick={handleBrowse}
          >
            Browse Resume
          </Button>

        </div>
      </motion.div>

      {selectedFile && (

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border bg-slate-50 p-5"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-100 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>

              <div>

                <h4 className="font-semibold">
                  {selectedFile.name}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
            >
              <X className="h-5 w-5" />
            </Button>

          </div>

        </motion.div>

      )}

    </section>
  );
}