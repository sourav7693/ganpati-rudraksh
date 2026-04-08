"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
import { useCustomer } from "@/context/CustomerContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdClose, IoMdStar } from "react-icons/io";
import { api } from "@/api/customer";

interface FileWithPreview extends File {
  preview?: string;
}

interface ExistingImage {
  public_id: string;
  url: string;
  _id?: string;
}

export default function ReviewPage({
  productDetails,
}: {
  productDetails?: ProductType | null;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [supportingFiles, setSupportingFiles] = useState<FileWithPreview[]>([]);
  const [existingFiles, setExistingFiles] = useState<ExistingImage[]>([]);

  const [existingReviewId, setExistingReviewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { customer } = useCustomer();
  const nav = useRouter();

  useEffect(() => {
    const fetchExistingReview = async () => {
      if (!customer?._id || !productDetails?._id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get(
          `/review?user=${customer._id}&product=${productDetails._id}`,
        );

        if (
          res.data.success &&
          res.data.reviews &&
          res.data.reviews.length > 0
        ) {
          const myReview = res.data.reviews[0];

          setExistingReviewId(myReview._id);
          setRating(myReview.rating);
          setTitle(myReview.title);
          setDescription(myReview.description);

          if (myReview.supporting_files) {
            setExistingFiles(myReview.supporting_files);
          }
        }
      } catch (error) {
        console.error("Failed to fetch existing review:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingReview();
  }, [customer, productDetails]);

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

  const removeFile = (index: number) => {
    const fileToRemove = supportingFiles[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setSupportingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (index: number) => {
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type.startsWith("video/")) return "🎬";
    return "📄";
  };

  useEffect(() => {
    return () => {
      supportingFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [supportingFiles]);

  async function handleSubmit() {
    try {
      if (!productDetails) return toast.error("Product not found"); // Changed from alert to toast
      if (rating === 0) return toast.error("Please select a rating");
      if (title.length <= 0 || title.length > 70) {
        return toast.error("Title must be between 1 and 70 characters");
      }
      if (description.length <= 0 || description.length > 300) {
        return toast.error("Description must be between 1 and 300 characters");
      }

      // 2. ADDED: Start submission loading
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rating", rating.toString());
      formData.append("productId", productDetails._id ?? "");
      formData.append("customerId", customer?._id ?? "");

      supportingFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (existingReviewId) {
        formData.append("existingImages", JSON.stringify(existingFiles));
      }

      let status, data;

      if (existingReviewId) {
        const res = await api.put(`/review/${existingReviewId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        status = res.status;
        data = res.data;
      } else {
        const res = await api.post(`review`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        status = res.status;
        data = res.data;
      }

      if (status === 201 || status === 200) {
        toast.success(
          existingReviewId
            ? "Review updated successfully"
            : "Review submitted successfully",
        );
        nav.push("/my-orders");
        return;
      }
      throw new Error(data.message);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ??
          error.message ??
          "Failed to submit review",
      );
    } finally {
      // 3. ADDED: Stop submission loading
      setIsSubmitting(false);
    }
  }

  // 4. ADDED: Better initial loading visual (Spinner)
  if (isLoading) {
    return (
      <div className="section-container flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading review details...</p>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="w-full bg-white px-6 rounded-md shadow-sm py-8 md:my-6">
        {/* PRODUCT INFO */}
        <div className="flex gap-4 border-b border-gray-300 pb-4">
          <div className="relative w-24 h-24 border border-gray-300 rounded">
            <Image
              src={productDetails?.coverImage?.url ?? ""}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-800">{productDetails?.name}</p>
            <p className="text-sm text-gray-500">
              {productDetails?.brand?.name}
            </p>
          </div>
        </div>

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
          <label className="block text-sm font-medium mb-1">Review title</label>
          <input
            type="text"
            placeholder="Eg: Very good product"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-define-red"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* REVIEW TEXT */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Your review</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share details of your experience"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-define-red"
          />
        </div>

        {/* IMAGE UPLOAD & PREVIEW */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">
            Supported Files &#40;optional&#41;
          </p>

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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {/* RENDER EXISTING CLOUD IMAGES */}
            {existingFiles.map((file, index) => (
              <div
                key={file.public_id}
                className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => removeExistingFile(index)}
                  className="absolute top-1 right-1 z-10 w-6 h-6 text-red-500 bg-white/80 rounded flex items-center justify-center text-xs hover:text-red-600 hover:bg-white transition-all"
                >
                  <IoMdClose />
                </button>
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src={file.url}
                    alt="existing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}

            {/* RENDER NEW LOCAL FILES */}
            {supportingFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 z-10 w-6 h-6 text-red-500 bg-white/80 rounded flex items-center justify-center text-xs hover:text-red-600 hover:bg-white transition-all"
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
                      <div className="absolute inset-0 flex items-center justify-center text-3xl">
                        🎬
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <span className="text-2xl mb-2">{getFileIcon(file)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-6 flex justify-end">
          {/* 5. ADDED: Disabled state and spinner on the submit button */}
          <button
            type="button"
            onClick={handleSubmit}
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
                {existingReviewId ? "Updating..." : "Submitting..."}
              </>
            ) : existingReviewId ? (
              "Update Review"
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}