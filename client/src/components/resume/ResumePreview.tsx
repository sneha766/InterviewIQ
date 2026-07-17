import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  HardDrive,
  Download,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { Button } from "../ui/button";

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
  const uploadedAt = new Date().toLocaleString();

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-white p-8 shadow-sm"
    >
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Resume Preview
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Review your uploaded resume before AI analysis.
          </p>

        </div>

        <div className="rounded-2xl bg-blue-100 p-4">

          <FileText className="h-8 w-8 text-blue-600" />

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-[320px,1fr]">

        <div className="space-y-6">

          <div className="rounded-2xl border bg-slate-50 p-5">

            <h3 className="mb-5 font-semibold">
              File Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <FileText className="mt-1 h-5 w-5 text-blue-600" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    File Name
                  </p>

                  <p className="font-medium break-all">
                    {file.name}
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <HardDrive className="mt-1 h-5 w-5 text-blue-600" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    File Size
                  </p>

                  <p className="font-medium">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <Calendar className="mt-1 h-5 w-5 text-blue-600" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Uploaded
                  </p>

                  <p className="font-medium">
                    {uploadedAt}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="space-y-3">

            <Button
              className="w-full rounded-xl"
              onClick={onDownload}
            >
              <Download className="mr-2 h-4 w-4" />

              Download Resume
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={onReplace}
            >
              <RefreshCw className="mr-2 h-4 w-4" />

              Replace Resume
            </Button>

            <Button
              variant="destructive"
              className="w-full rounded-xl"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />

              Delete Resume
            </Button>

          </div>

        </div>

        <div className="overflow-hidden rounded-2xl border bg-slate-100">

          <iframe
            title="Resume Preview"
            src={URL.createObjectURL(file)}
            className="h-[700px] w-full"
          />

        </div>

      </div>

    </motion.section>
  );
}