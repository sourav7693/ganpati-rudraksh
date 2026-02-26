"use client";

import { useEffect } from "react";

type ConfirmModalProps = {
  open: boolean;
  text?: string;
  id?: string;
  onConfirm: (id?: string) => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  text = "Are you sure?",
  id,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Prevent background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-sm rounded-lg p-6 shadow-xl animate-fadeIn">
        <p className="text-gray-800 text-sm mb-6">{text}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
