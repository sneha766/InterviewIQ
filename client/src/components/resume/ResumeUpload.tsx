import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw,
  X,
  Sparkles,
  ShieldCheck,
  FileBadge,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface ResumeUploadProps {
  onFileSelect: (file: File) => void | Promise<void>;
}

const MAX_SIZE = 5 * 1024 * 1024;

const schema = z.object({
  file: z
    .instanceof(File, {
      message: "Resume is required.",
    })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF resumes are supported."
    )
    .refine(
      (file) => file.size <= MAX_SIZE,
      "Resume must be under 5MB."
    ),
});

type FormValues = z.infer<typeof schema>;

type UploadState =
  | "idle"
  | "dragging"
  | "uploading"
  | "uploaded"
  | "error";

export default function ResumeUpload({
  onFileSelect,
}: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploadState, setUploadState] =
    useState<UploadState>("idle");

  const [progress, setProgress] =
    useState(0);

  const [dragCounter, setDragCounter] =
    useState(0);

  const uploadTime = useMemo(() => {
    if (!selectedFile) return null;

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
  }, [selectedFile]);

  useEffect(() => {
    if (uploadState !== "uploading") return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        return prev + Math.random() * 8;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [uploadState]);

  const finishUpload = useCallback(() => {
    setProgress(100);

    setTimeout(() => {
      setUploadState("uploaded");
    }, 250);
  }, []);

  const validateFile = useCallback((file: File) => {
    const parsed = schema.safeParse({ file });

    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ??
          "Invalid resume."
      );

      setUploadState("error");

      return false;
    }

    return true;
  }, []);

  const handleFile = useCallback(
    async (file: File) => {
      if (!validateFile(file)) return;

      setUploadState("uploading");
      setProgress(5);

      setSelectedFile(file);
      setValue("file", file);

      try {
        await onFileSelect(file);

        finishUpload();

        toast.success(
          "Resume uploaded successfully."
        );
      } catch {
        setUploadState("error");
        setProgress(0);

        toast.error(
          "Upload failed. Please try again."
        );
      }
    },
    [finishUpload, onFileSelect, setValue, validateFile]
  );

  const removeResume = () => {
    setSelectedFile(null);

    setProgress(0);

    setUploadState("idle");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    toast.success("Resume removed.");
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const replaceResume = () => {
    inputRef.current?.click();
  };

  const onDragEnter = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    setDragCounter((prev) => prev + 1);

    setUploadState("dragging");
  };

  const onDragLeave = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    setDragCounter((prev) => {
      const value = prev - 1;

      if (value <= 0) {
        setUploadState(
          selectedFile ? "uploaded" : "idle"
        );
      }

      return value;
    });
  };

  const onDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    setDragCounter(0);

    const file =
      e.dataTransfer.files &&
      e.dataTransfer.files[0];

    setUploadState(
      selectedFile ? "uploaded" : "idle"
    );

    if (file) {
      void handleFile(file);
    }
  };

  const borderClasses = {
    idle:
      "border-slate-300 hover:border-blue-500 hover:bg-blue-50/30",

    dragging:
      "border-blue-600 bg-blue-50 shadow-lg shadow-blue-100",

    uploading:
      "border-violet-500 bg-violet-50",

    uploaded:
      "border-emerald-500 bg-emerald-50",

    error:
      "border-red-500 bg-red-50",
  };

  return (
    <section className="rounded-[28px] border bg-white p-8 shadow-sm">

      {/* ---------- Header ---------- */}

      <div className="mb-8 flex items-start justify-between">

        <div>

          <div className="mb-3 flex items-center gap-3">

            <div className="rounded-2xl bg-blue-100 p-3">

              <Sparkles className="h-6 w-6 text-blue-600" />

            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              Upload Resume
            </h2>

          </div>

          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">

            Upload your latest resume and receive a
            detailed AI-powered ATS analysis, keyword
            optimization report, recruiter readiness
            insights, and personalized improvement
            suggestions.

          </p>

        </div>

        <div className="hidden rounded-2xl border bg-slate-50 p-5 lg:block">

          <div className="flex items-center gap-3">

            <ShieldCheck className="h-5 w-5 text-emerald-600" />

            <div>

              <p className="font-semibold">

                Secure Upload

              </p>

              <p className="text-xs text-muted-foreground">

                Files are encrypted and stored securely.

              </p>

            </div>

          </div>

        </div>

      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            void handleFile(file);
          }
        }}
      />

      {/* Upload Dropzone starts here in Part 2 */}
            <motion.div
        layout
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        animate={{
          scale: uploadState === "dragging" ? 1.02 : 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className={`relative overflow-hidden rounded-[28px] border-2 border-dashed p-10 transition-all duration-300 ${borderClasses[uploadState]}`}
      >
        <AnimatePresence>

          {uploadState === "dragging" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-blue-600/10 backdrop-blur-sm"
            >
              <motion.div
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                className="rounded-3xl bg-white px-10 py-8 shadow-2xl"
              >
                <Upload className="mx-auto h-12 w-12 text-blue-600" />

                <h3 className="mt-5 text-center text-2xl font-bold">
                  Drop your resume here
                </h3>

                <p className="mt-2 text-center text-muted-foreground">
                  Release to begin AI analysis
                </p>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center">

          <motion.div
            animate={{
              rotate:
                uploadState === "uploading"
                  ? 360
                  : 0,
              scale:
                uploadState === "dragging"
                  ? 1.1
                  : 1,
            }}
            transition={{
              rotate: {
                repeat:
                  uploadState === "uploading"
                    ? Infinity
                    : 0,
                duration: 2,
                ease: "linear",
              },
            }}
            className="rounded-full bg-blue-100 p-6"
          >
            {uploadState === "uploaded" ? (
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            ) : uploadState === "uploading" ? (
              <Loader2 className="h-10 w-10 animate-spin text-violet-600" />
            ) : uploadState === "error" ? (
              <AlertCircle className="h-10 w-10 text-red-600" />
            ) : (
              <Upload className="h-10 w-10 text-blue-600" />
            )}
          </motion.div>

          <motion.h3
            layout
            className="mt-6 text-2xl font-bold"
          >
            {uploadState === "uploaded"
              ? "Resume Ready"
              : uploadState === "uploading"
              ? "Uploading Resume..."
              : uploadState === "error"
              ? "Upload Failed"
              : "Drag & Drop Resume"}
          </motion.h3>

          <p className="mt-3 max-w-md text-center text-muted-foreground">
            {uploadState === "uploaded"
              ? "Your resume is ready for AI-powered ATS analysis."
              : uploadState === "uploading"
              ? "Please wait while we prepare your resume."
              : uploadState === "error"
              ? "Please try uploading again."
              : "PDF only • Maximum size 5MB"}
          </p>

          {uploadState === "idle" && (
            <Button
              className="mt-8 rounded-xl"
              onClick={openFilePicker}
            >
              Browse Resume
            </Button>
          )}

          {uploadState === "uploading" && (
            <div className="mt-10 w-full max-w-lg space-y-3">

              <Progress value={progress} />

              <div className="flex justify-between text-sm text-muted-foreground">

                <span>Uploading...</span>

                <span>
                  {Math.round(progress)}%
                </span>

              </div>

            </div>
          )}

        </div>
      </motion.div>

      {errors.file && (
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <div className="flex items-center gap-3">

            <AlertCircle className="h-5 w-5 text-red-600" />

            <p className="text-sm text-red-700">
              {errors.file.message}
            </p>

          </div>
        </motion.div>
      )}

      <AnimatePresence>

        {selectedFile && uploadState !== "uploading" && (
          <motion.div
            layout
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className="mt-8 rounded-3xl border bg-gradient-to-br from-slate-50 to-white p-6"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-5">

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FileBadge className="h-8 w-8 text-blue-600" />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold text-lg">
                      {selectedFile.name}
                    </h3>

                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                  </div>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">

                    <span>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>

                    <span>PDF</span>

                    {uploadTime && (
                      <span>{uploadTime}</span>
                    )}

                  </div>

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <Button
                  variant="outline"
                  onClick={replaceResume}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />

                  Replace
                </Button>

                <Button
                  variant="destructive"
                  onClick={removeResume}
                >
                  <X className="mr-2 h-4 w-4" />

                  Remove
                </Button>

              </div>

            </div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5"
            >
              <div className="flex items-start gap-4">

                <CheckCircle2 className="mt-1 h-6 w-6 text-green-600" />

                <div>

                  <h4 className="font-semibold text-green-700">
                    Ready for AI Analysis
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-green-700/80">
                    Your resume has been uploaded successfully.
                    You can now generate ATS insights,
                    keyword optimization suggestions,
                    recruiter readiness analysis,
                    and personalized improvements.
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
}