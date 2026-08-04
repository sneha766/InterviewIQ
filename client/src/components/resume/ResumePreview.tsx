import { useEffect, useMemo, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HardDrive,
  Loader2,
  Maximize2,
  Minimize2,
  RefreshCw,
  Trash2,
  ZoomIn,
  ZoomOut,
  FileBadge2,
} from "lucide-react";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import { Button } from "../ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface ResumePreviewProps {
  file: File;
  onReplace?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
}

export default function ResumePreview({
  file,
  onReplace,
  onDelete,
  onDownload,
}: ResumePreviewProps) {

  const [numPages, setNumPages] =
    useState(0);

  const [pageNumber, setPageNumber] =
    useState(1);

  const [zoom, setZoom] =
    useState(1.1);

  const [loading, setLoading] =
    useState(true);

  const [fullscreen, setFullscreen] =
    useState(false);

  const viewerRef =
    useRef<HTMLDivElement>(null);

  const uploadedAt = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
  }, []);

  const fileUrl = useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  useEffect(() => {
    setLoading(true);
    setNumPages(0);
    setPageNumber(1);
  }, [file]);

  const nextPage = () => {
    setPageNumber((prev) =>
      Math.min(prev + 1, numPages)
    );
  };

  const previousPage = () => {
    setPageNumber((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  const zoomIn = () => {
    setZoom((prev) =>
      Math.min(prev + 0.2, 2.5)
    );
  };

  const zoomOut = () => {
    setZoom((prev) =>
      Math.max(prev - 0.2, 0.8)
    );
  };

  const toggleFullscreen = async () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      await viewerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyboard = (
      event: KeyboardEvent
    ) => {

      const target =
        event.target as HTMLElement | null;

      if (
        target &&
        (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        )
      ) {
        return;
      }

      switch (event.key) {

        case "ArrowLeft":
          event.preventDefault();
          previousPage();
          break;

        case "ArrowRight":
          event.preventDefault();
          nextPage();
          break;

      }

      if (
        event.ctrlKey ||
        event.metaKey
      ) {

        if (
          event.key === "+" ||
          event.key === "="
        ) {
          event.preventDefault();
          zoomIn();
        }

        if (
          event.key === "-"
        ) {
          event.preventDefault();
          zoomOut();
        }

      }

    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };

  }, [numPages]);

  return (

    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .35,
      }}
      className="rounded-[30px] border bg-white p-8 shadow-sm"
    >

      {/* Header */}

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-4">

              <FileBadge2 className="h-7 w-7 text-blue-600"/>

            </div>

            <div>

              <h2 className="text-3xl font-bold tracking-tight">

                Resume Preview

              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">

                Review your uploaded resume,
                navigate pages,
                zoom,
                replace files
                and download
                before running
                the AI ATS analysis.

              </p>

            </div>

          </div>

        </div>

        <div className="hidden rounded-2xl border bg-slate-50 p-5 lg:block">

          <p className="text-sm font-semibold">

            PDF Viewer

          </p>

          <p className="mt-1 text-xs text-muted-foreground">

            Keyboard:
            ← →
            Ctrl + +
            Ctrl + -

          </p>

        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-[340px,1fr]">

        {/* LEFT PANEL */}

        <div className="space-y-6">
                    {/* File Information */}

          <motion.div
            layout
            className="rounded-3xl border bg-gradient-to-br from-slate-50 to-white p-6"
          >
            <h3 className="mb-6 text-lg font-semibold">
              File Information
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-blue-100 p-3">

                  <FileText className="h-5 w-5 text-blue-600"/>

                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm text-muted-foreground">
                    File Name
                  </p>

                  <p className="mt-1 break-all font-medium">
                    {file.name}
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-violet-100 p-3">

                  <HardDrive className="h-5 w-5 text-violet-600"/>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    File Size
                  </p>

                  <p className="mt-1 font-medium">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-emerald-100 p-3">

                  <Calendar className="h-5 w-5 text-emerald-600"/>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Uploaded
                  </p>

                  <p className="mt-1 font-medium">
                    {uploadedAt}
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* Viewer Statistics */}

          <motion.div
            layout
            className="rounded-3xl border bg-white p-6"
          >

            <h3 className="mb-5 text-lg font-semibold">
              Viewer Statistics
            </h3>

            <div className="space-y-6">

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm text-muted-foreground">
                    Pages
                  </span>

                  <span className="font-semibold">
                    {numPages || "--"}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        numPages > 0
                          ? "100%"
                          : "15%",
                    }}
                    transition={{
                      duration: .6,
                    }}
                    className="h-full rounded-full bg-blue-600"
                  />

                </div>

              </div>

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm text-muted-foreground">
                    Zoom
                  </span>

                  <span className="font-semibold">
                    {Math.round(zoom * 100)}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                  <motion.div
                    animate={{
                      width: `${(zoom / 2.5) * 100}%`,
                    }}
                    className="h-full rounded-full bg-violet-600"
                  />

                </div>

              </div>

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm text-muted-foreground">
                    Current Page
                  </span>

                  <span className="font-semibold">
                    {pageNumber}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                  <motion.div
                    animate={{
                      width:
                        numPages
                          ? `${(pageNumber / numPages) * 100}%`
                          : "0%",
                    }}
                    className="h-full rounded-full bg-emerald-600"
                  />

                </div>

              </div>

            </div>

          </motion.div>

          {/* Quick Actions */}

          <motion.div
            layout
            className="rounded-3xl border bg-white p-6"
          >

            <h3 className="mb-5 text-lg font-semibold">
              Quick Actions
            </h3>

            <div className="space-y-3">

              <Button
                className="w-full justify-start rounded-xl"
                onClick={onDownload}
              >

                <Download className="mr-2 h-4 w-4"/>

                Download Resume

              </Button>

              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={onReplace}
              >

                <RefreshCw className="mr-2 h-4 w-4"/>

                Replace Resume

              </Button>

              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={toggleFullscreen}
              >

                {fullscreen ? (

                  <>
                    <Minimize2 className="mr-2 h-4 w-4"/>

                    Exit Fullscreen
                  </>

                ) : (

                  <>
                    <Maximize2 className="mr-2 h-4 w-4"/>

                    Fullscreen
                  </>

                )}

              </Button>

              <Button
                variant="destructive"
                className="w-full justify-start rounded-xl"
                onClick={onDelete}
              >

                <Trash2 className="mr-2 h-4 w-4"/>

                Delete Resume

              </Button>

            </div>

          </motion.div>

        </div>

        {/* PDF Viewer */}

        <motion.div
          ref={viewerRef}
          layout
          className="overflow-hidden rounded-[30px] border bg-slate-100 shadow-inner"
        >

          <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-white p-5">

            <div className="flex items-center gap-2">

              <Button
                size="icon"
                variant="outline"
                onClick={previousPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4"/>
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={nextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-4 w-4"/>
              </Button>

              <div className="ml-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">

                Page {pageNumber} of {numPages || "--"}

              </div>

            </div>

            <div className="flex items-center gap-2">

              <Button
                size="icon"
                variant="outline"
                onClick={zoomOut}
              >
                <ZoomOut className="h-4 w-4"/>
              </Button>

              <div className="min-w-[72px] text-center font-semibold">

                {Math.round(zoom * 100)}%

              </div>

              <Button
                size="icon"
                variant="outline"
                onClick={zoomIn}
              >
                <ZoomIn className="h-4 w-4"/>
              </Button>

            </div>

          </div>

          <div
            className="flex h-[760px] justify-center overflow-auto bg-slate-200 p-8"
            onWheel={(e) => {
              if (!e.ctrlKey) return;

              e.preventDefault();

              if (e.deltaY < 0) {
                zoomIn();
              } else {
                zoomOut();
              }
            }}
          >
                      <Document
              file={fileUrl}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setLoading(false);
              }}
              onLoadError={() => {
                setLoading(false);
                setNumPages(0);
              }}
              loading={
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="flex h-full min-h-[650px] w-full flex-col items-center justify-center"
                >
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600" />

                  <p className="mt-6 text-lg font-semibold">
                    Loading Resume
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Rendering PDF preview...
                  </p>

                  <div className="mt-10 w-[420px] max-w-full space-y-4">

                    <div className="h-5 animate-pulse rounded-full bg-slate-300" />

                    <div className="h-[420px] animate-pulse rounded-2xl bg-slate-300" />

                  </div>

                </motion.div>
              }
              error={
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex h-full min-h-[650px] flex-col items-center justify-center"
                >
                  <div className="rounded-full bg-red-100 p-6">

                    <FileText className="h-10 w-10 text-red-600" />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    Preview unavailable
                  </h3>

                  <p className="mt-3 max-w-md text-center text-muted-foreground">

                    We couldn't render this PDF preview.
                    The file is still available and you
                    can download or replace it.

                  </p>

                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={onReplace}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />

                    Replace Resume

                  </Button>

                </motion.div>
              }
            >

              <AnimatePresence mode="wait">

                <motion.div
                  key={`${pageNumber}-${zoom}`}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="rounded-xl bg-white shadow-2xl"
                >

                  <Page
                    pageNumber={pageNumber}
                    scale={zoom}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />

                </motion.div>

              </AnimatePresence>

            </Document>

          </div>

          <div className="border-t bg-white px-6 py-4">

            <div className="flex flex-wrap items-center justify-between gap-5">

              <div>

                <p className="font-medium">

                  Viewing page

                  <span className="font-bold">
                    {" "}
                    {pageNumber}
                  </span>

                  {" "}of{" "}

                  <span className="font-bold">
                    {numPages || "--"}
                  </span>

                </p>

                <p className="mt-2 text-xs text-muted-foreground">

                  Keyboard:
                  ← →
                  Ctrl + +
                  Ctrl + -

                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">

                  Zoom {Math.round(zoom * 100)}%

                </div>

                <div
                  className={`rounded-full px-4 py-2 text-xs font-medium ${
                    loading
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {loading
                    ? "Loading..."
                    : "Preview Ready"}
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </motion.section>
  );
}