"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { IoMdClose, IoMdStar } from "react-icons/io";
import { api } from "@/api/customer";
import { useRouter } from "next/navigation";

interface FileWithPreview extends File {
  preview?: string;
}

interface ExistingFile {
  url: string;
  public_id: string;
  name?: string;
  type?: string;
}

interface ReviewData {
  _id: string;
  rating: number;
  title: string;
  description: string;
  supporting_files: { url: string; public_id: string }[];
}

export default function ReviewEdit({
  review,
  onClose,
  onUpdate,
}: {
  review: ReviewData;
  onClose?: () => void;
  onUpdate?: (updatedReview: ReviewData) => void;
}) {
  const router = useRouter(); // Initialize router
  // States
  const [rating, setRating] = useState(review.rating);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState(review.title);
  const [description, setDescription] = useState(review.description);
  
  const [supportingFiles, setSupportingFiles] = useState<FileWithPreview[]>([]);
  const [existingFiles, setExistingFiles] = useState<ExistingFile[]>(
    review.supporting_files.map((file) => ({
      ...file,
      name: file.url.split("/").pop() || "",
      type: getFileTypeFromUrl(file.url),
    })),
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to determine file type from URL
  function getFileTypeFromUrl(url: string): string {
    const extension = url.split(".").pop()?.toLowerCase();
    if (
      ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")
    ) {
      return "image/*";
    }
    if (["mp4", "webm", "ogg", "mov", "avi"].includes(extension || "")) {
      return "video/*";
    }
    return "application/octet-stream";
  }

  // Handle new files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const filesArray: FileWithPreview[] = Array.from(selectedFiles);

    const filesWithPreviews = filesArray.map((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const fileWithPreview: FileWithPreview = file;
        fileWithPreview.preview = URL.createObjectURL(file);
        return fileWithPreview;
      }
      return file;
    });

    setSupportingFiles((prev) => [...prev, ...filesWithPreviews]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove newly uploaded file
  const removeNewFile = (index: number) => {
    const fileToRemove = supportingFiles[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setSupportingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove existing file
  const removeExistingFile = (publicId: string) => {
    setExistingFiles((prev) =>
      prev.filter((file) => file.public_id !== publicId),
    );
  };

  const getFileIcon = (file: File | ExistingFile) => {
    const fileType = "type" in file ? file.type : file.type;
    if (fileType?.startsWith("image/")) return "🖼️";
    if (fileType?.startsWith("video/")) return "🎬";
    return "📄";
  };

  const getFileName = (file: File | ExistingFile) => {
    return "name" in file ? file.name : file.name || "file";
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || rating === 0 ) {
      toast.error("Please fill in all required fields and provide a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rating", rating.toString());

      // 1. Append NEW files exactly like the working ReviewPage
      supportingFiles.forEach((file) => {
        formData.append("images", file);
      });

      // 2. Append EXISTING files (using existingImages key for the backend fix)
      // Even if empty, we send it so the backend knows to delete them all
      const existingFilesData = existingFiles.map((file) => ({
        url: file.url,
        public_id: file.public_id,
      }));
      formData.append("existingImages", JSON.stringify(existingFilesData));

      const response = await api.put(`/review/${review._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      if(response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update review. Please try again.");
      }

      const updatedReview = response.data.review || response.data;
      toast.success("Review updated successfully!");
      router.refresh();

      if (onUpdate) {
        onUpdate(updatedReview);
      }

      if (onClose) {
        onClose();
      }

      // Cleanup preview URLs
      supportingFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      
    } catch (error: any) {
      console.error("Error updating review:", error);
      toast.error(
        error.message || "Failed to update review. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      supportingFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  // Reset form when review prop changes
  useEffect(() => {
    setRating(review.rating);
    setTitle(review.title);
    setDescription(review.description);
    setExistingFiles(
      review.supporting_files.map((file) => ({
        ...file,
        name: file.url.split("/").pop() || "",
        type: getFileTypeFromUrl(file.url),
      })),
    );
    setSupportingFiles([]);
  }, [review]);

  return (
    <form
      className="max-w-225 mx-auto bg-white px-4 rounded-md shadow-sm py-8 md:my-6"
      onSubmit={handleSubmit}
    >
      {/* RATING */}
      <div className="mt-6">
        <p className="font-medium mb-2">Rate this product</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <IoMdStar
                size={28}
                className={`${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* REVIEW TITLE */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-1">Review title *</label>
        <input
          type="text"
          placeholder="Eg: Very good product"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      {/* REVIEW TEXT */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Your review *</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share details of your experience"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          required
        />
      </div>

      {/* EXISTING FILES */}
      {existingFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">Current Files</p>
          <p className="text-xs text-gray-500 mb-2">
            Remove files you want to delete from the review
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {existingFiles.map((file) => (
              <div
                key={`existing-${file.public_id}`}
                className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <button
                  type="button"
                  onClick={() => removeExistingFile(file.public_id)}
                  className="absolute top-1 right-1 z-10 w-6 h-6 text-red-500 bg-white/80 rounded-full flex items-center justify-center text-xs hover:text-red-600 hover:bg-white transition-colors"
                  aria-label={`Remove ${getFileName(file)}`}
                >
                  <IoMdClose />
                </button>
                <div className="aspect-square flex items-center justify-center">
                  {file.type?.startsWith("image/") ? (
                    <img
                      src={file.url}
                      alt={getFileName(file)}
                      className="w-full h-full object-cover"
                    />
                  ) : file.type?.startsWith("video/") ? (
                    <div className="relative w-full h-full bg-black">
                      <video 
                        src={file.url}
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl">🎬</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <span className="text-2xl mb-2">{getFileIcon(file)}</span>
                      <span className="text-xs text-center break-words px-2">
                        {getFileName(file)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW FILE UPLOAD */}
      <div className="mt-6">
        <p className="text-sm font-medium mb-1">Add More Files (optional)</p>
        <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded cursor-pointer text-sm hover:bg-gray-50">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            hidden
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          📷 Upload Photos / Videos
        </label>

        {supportingFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">
              New Files to Upload ({supportingFiles.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {supportingFiles.map((file, index) => (
                <div
                  key={`new-${file.name}-${index}`}
                  className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  {/* PERFECTLY MATCHING DELETE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeNewFile(index)}
                    className="absolute top-1 right-1 z-10 w-6 h-6 text-red-500 bg-white/80 flex items-center justify-center rounded-full text-xs hover:text-red-600 hover:bg-white transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <IoMdClose />
                  </button>
                  <div className="aspect-square flex items-center justify-center">
                    {file.type.startsWith("image/") && file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : file.type.startsWith("video/") && file.preview ? (
                      <div className="relative w-full h-full bg-black">
                        <video
                          src={file.preview}
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl">🎬</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        <span className="text-2xl mb-2">
                          {getFileIcon(file)}
                        </span>
                        <span className="text-xs text-center break-words px-2">
                          {file.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        
        {/* MATCHING SUBMIT BUTTON WITH SPINNER */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            mt-3 sm:mt-auto flex items-center justify-center gap-2 
            text-white font-semibold text-xs sm:text-sm md:text-[15px] 
            px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 rounded-full btn-grad 
            active:scale-95 w-full sm:w-fit transition-all
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"}
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating...
            </>
          ) : (
            "Update Review"
          )}
        </button>
      </div>
    </form>
  );
}