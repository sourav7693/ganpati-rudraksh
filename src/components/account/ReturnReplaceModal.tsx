"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { api } from "@/api/customer";
import { OrderType } from "@/types/types";

interface ReturnReplaceModalProps {
  isOpen: boolean;
  order: OrderType | null;
  onClose: () => void;
  onSuccess: () => void; // To refresh orders list
}

export default function ReturnReplaceModal({
  isOpen,
  order,
  onClose,
  onSuccess,
}: ReturnReplaceModalProps) {
  const [requestType, setRequestType] = useState<"Return" | "Replacement" | "">("");
  const [reason, setReason] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !order) return null;

  // Check if a request already exists
  const hasRequested = [
    "ReturnRequested",
    "ReplacementRequested",
    "Returned",
    "Replaced",
    "ReturnRejected",
    "ReplacementRejected",
  ].includes(order.status);

  const productPolicy = order.product?.returnPolicy || "NO_RETURN_NO_REPLACEMENT";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }
    
    setImages((prev) => [...prev, ...files]);
    
    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]); // Cleanup memory
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestType) return toast.error("Please select Return or Replacement");
    if (!reason.trim()) return toast.error("Please provide a reason");
    if (images.length === 0) return toast.error("Please upload at least 1 image");

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("requestType", requestType);
      formData.append("reason", reason);
      images.forEach((img) => formData.append("images", img));

      const res = await api.post(`/order/${order._id}/return-replace`, formData,{headers: {
          "Content-Type": "multipart/form-data",
        },});
      
      if (res.status === 200) {
        toast.success("Request submitted successfully");
        onSuccess(); // Refresh the orders page
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-999 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-gray-900">
            {hasRequested ? "Request Status" : "Return / Replace Item"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="p-5">
          {/* ================= VIEW STATUS MODE ================= */}
          {hasRequested ? (
            <div className="space-y-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-md border">
                <p className="font-semibold text-gray-700 mb-1">Current Status:</p>
                <span className="inline-block px-3 py-1 bg-define-brown text-white rounded-full text-xs font-medium">
                  {order.status}
                </span>
              </div>

              {order.returnDetails && (
                <>
                  <div>
                    <p className="font-semibold text-gray-700">Reason Provided:</p>
                    <p className="text-gray-600 mt-1 bg-gray-50 p-2 rounded">{order.returnDetails.reason}</p>
                  </div>

                  {order.returnDetails.adminComment && (
                    <div>
                      <p className="font-semibold text-gray-700 text-define-red">Admin Note:</p>
                      <p className="text-gray-600 mt-1 bg-red-50 p-2 rounded border border-red-100">
                        {order.returnDetails.adminComment}
                      </p>
                    </div>
                  )}

                  {order.returnDetails.images && order.returnDetails.images.length > 0 && (
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Uploaded Images:</p>
                      <div className="flex gap-2">
                        {order.returnDetails.images.map((img: any, i: number) => (
                          <div key={i} className="relative size-16 rounded border">
                            <Image src={img.url} alt="Proof" fill className="object-cover rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* ================= CREATE REQUEST MODE ================= */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* POLICY WARNING BANNERS */}
              {productPolicy === "NO_RETURN_NO_REPLACEMENT" && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-100">
                  This product is not eligible for returns or replacements.
                </div>
              )}
              {productPolicy === "REPLACEMENT_ONLY" && (
                <div className="bg-orange-50 text-orange-700 p-3 rounded-md text-sm mb-4 border border-orange-100">
                  <strong>Note:</strong> Returns are not available for this product. You can only request a replacement.
                </div>
              )}
              {productPolicy === "RETURN_ONLY" && (
                <div className="bg-orange-50 text-orange-700 p-3 rounded-md text-sm mb-4 border border-orange-100">
                  <strong>Note:</strong> Replacements are not available for this product. You can only request a return.
                </div>
              )}

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What would you like to do? *</label>
                <div className="flex gap-4">
                  {/* RETURN BUTTON */}
                  <label className={`flex items-start gap-2 p-3 border rounded cursor-pointer flex-1 transition-all
                    ${requestType === "Return" ? "border-define-brown bg-orange-50" : "hover:bg-gray-50"} 
                    ${(productPolicy === "REPLACEMENT_ONLY" || productPolicy === "NO_RETURN_NO_REPLACEMENT") ? "opacity-50 !cursor-not-allowed bg-gray-100 hover:bg-gray-100" : ""}`}
                  >
                    <input 
                      type="radio" 
                      name="requestType" 
                      value="Return"
                      disabled={productPolicy === "REPLACEMENT_ONLY" || productPolicy === "NO_RETURN_NO_REPLACEMENT"}
                      onChange={(e) => setRequestType(e.target.value as "Return")} 
                      className="accent-define-brown mt-1"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">Return</span>
                      {(productPolicy === "REPLACEMENT_ONLY" || productPolicy === "NO_RETURN_NO_REPLACEMENT") && (
                        <span className="text-[11px] text-red-500 mt-0.5 leading-tight">Not available</span>
                      )}
                    </div>
                  </label>
                  
                  {/* REPLACE BUTTON */}
                  <label className={`flex items-start gap-2 p-3 border rounded cursor-pointer flex-1 transition-all
                    ${requestType === "Replacement" ? "border-define-brown bg-orange-50" : "hover:bg-gray-50"} 
                    ${(productPolicy === "RETURN_ONLY" || productPolicy === "NO_RETURN_NO_REPLACEMENT") ? "opacity-50 !cursor-not-allowed bg-gray-100 hover:bg-gray-100" : ""}`}
                  >
                    <input 
                      type="radio" 
                      name="requestType" 
                      value="Replacement"
                      disabled={productPolicy === "RETURN_ONLY" || productPolicy === "NO_RETURN_NO_REPLACEMENT"}
                      onChange={(e) => setRequestType(e.target.value as "Replacement")} 
                      className="accent-define-brown mt-1"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">Replace</span>
                      {(productPolicy === "RETURN_ONLY" || productPolicy === "NO_RETURN_NO_REPLACEMENT") && (
                        <span className="text-[11px] text-red-500 mt-0.5 leading-tight">Not available</span>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please describe the issue..."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-define-brown outline-none"
                  disabled={productPolicy === "NO_RETURN_NO_REPLACEMENT"}
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (Max 3) *</label>
                <p className="text-xs text-gray-500 mb-2">Please upload photos clearly showing the defect or issue.</p>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={productPolicy === "NO_RETURN_NO_REPLACEMENT"}
                />
                
                {previews.length < 3 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={productPolicy === "NO_RETURN_NO_REPLACEMENT"}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    + Add Image
                  </button>
                )}

                {previews.length > 0 && (
                  <div className="flex gap-3 mt-3">
                    {previews.map((preview, idx) => (
                      <div key={idx} className="relative size-16 border rounded group">
                        <Image src={preview} alt={`preview-${idx}`} fill className="object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <IoMdClose size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || productPolicy === "NO_RETURN_NO_REPLACEMENT"}
                className="w-full py-2 bg-define-brown text-white rounded hover:bg-define-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}