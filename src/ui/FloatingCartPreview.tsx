"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartPreview } from "@/context/CartPreviewContext";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export default function FloatingCartPreview() {
  const { product, show, hidePreview } = useCartPreview();

  if (!show || !product) return null;

  return (
    <div
      className="
        fixed z-50
        bottom-0 left-0 right-0
        md:bottom-6 md:right-6 md:left-auto
        bg-white shadow-2xl
         md:rounded-xl
        p-3
        animate-slide-in
        md:w-[320px]
      "
    >
      {/* Close button (desktop only) */}
      <button
        onClick={hidePreview}
        className="flex absolute right-2 top-2 text-define-black rounded-full"
      >
        <IoMdCloseCircle size={16} className="text-define-red"/>
      </button>

      <div className="flex gap-3 items-center">
        {/* Image */}
        <div className="size-16 md:size-24 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-sm md:text-sm font-semibold line-clamp-1 text-define-brown">
            {product.name}
          </h4>

          <p className="hidden md:block text-xs text-gray-500 line-clamp-1">
            Fresh & premium quality
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="font-bold text-define-red">
              <FaRupeeSign className="inline" />
              {product.price}
            </span>

            {product.mrp && (
              <span className="text-xs text-gray-400 line-through">
                <FaRupeeSign className="inline" />
                {product.mrp}
              </span>
            )}
          </div>
          <Link
            href="/my-cart"
            className="
            shrink-0 mt-2
            rounded-full
           text-white
            text-xs md:text-xs
            px-4 py-1
            bg-define-red
          "
          >
            View Cart
          </Link>
        </div>

        {/* CTA */}
      </div>
    </div>
  );
}
