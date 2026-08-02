import cloudinary from "../config/cloudinary";

export const uploadPdfToCloudinary = async (filePath: string) => {
  return cloudinary.uploader.upload(filePath, {
    folder: "InterviewIQ/resumes",
    resource_type: "raw",
    format: "pdf",
  });
};