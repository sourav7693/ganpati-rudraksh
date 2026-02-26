"use client";

import { addToCartApi } from "@/api/cart";
import { removeWishlistApi } from "@/api/wishlist";
import { useCustomer } from "@/context/CustomerContext";
import { WishlistType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CgShoppingCart } from "react-icons/cg";
import { FaIndianRupeeSign } from "react-icons/fa6";

const WishList = () => {
    const {customer, refreshCustomer} = useCustomer();
     const customerId = customer?._id;
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

 const handleWishlist = async (item: WishlistType) => {
   if (!customerId || loading) return;

   setLoading(true);

   try {
     await removeWishlistApi(customerId, item.product._id);
     await refreshCustomer();
     toast.success("Removed from wishlist");
   } catch (err) {
     console.log(err);
     toast.error("Failed to remove from wishlist");
   } finally {
     setLoading(false);
   }
 };

 const handleMoveToCart = async (item: WishlistType) => {
   // Implement move to cart functionality here
   if (!customerId || loading) return;

   setLoading(true);

   try {
     await addToCartApi(customerId, item.product._id, undefined, 1, item.product.price);
     await removeWishlistApi(customerId, item.product._id);
     await refreshCustomer();
     toast.success("Moved to cart");
     navigate.push("/my-cart");
   } catch (err) {
     console.log(err);
     toast.error("Failed to move to cart");
   } finally {
     setLoading(false);
   }
 };
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-8 h-[calc(100vh-100px)] overflow-y-auto no-scrollbar">
      <h1 className="text-xl font-bold text-define-red">
        Wishlist ({customer?.wishlist?.length || 0})
      </h1>

      <div>
        {customer?.wishlist?.length === 0 ? (
          <p className="text-gray-500 text-center">Your wishlist is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {customer?.wishlist?.map((item: WishlistType) => (
              <div
                key={item._id}
                className="flex flex-col lg:flex-row gap-2 rounded border border-gray-200 p-4"
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={item.product.coverImage?.url}
                    alt={item.product.coverImage?.public_id}
                    width={200}
                    height={200}
                    className="aspect-square rounded object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between w-full gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-medium text-gray-800 leading-snug">
                      {item.product.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {item.product.variables?.map((v) => v.name).join(", ")}
                    </p>

                    {item.product.price && (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-base sm:text-lg md:text-xl font-semibold text-define-red">
                          <FaIndianRupeeSign className="inline" />
                          {item.product.price.toFixed(0)}
                        </span>
                        <span className="line-through text-gray-500 text-xs sm:text-sm">
                          <FaIndianRupeeSign className="inline" />
                          {item.product.mrp.toFixed(0)}
                        </span>
                        <span className="text-xs text-define-brown font-medium">
                          {item.product.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <button
                    className="
              mt-3 sm:mt-auto flex items-center justify-center gap-2
              text-white font-semibold
              text-xs sm:text-sm md:text-[15px]
              px-3 py-1.5 sm:px-4 sm:py-2 md:px-5
              rounded-full
              btn-grad hover:scale-[1.03]
              active:scale-95
              w-full sm:w-fit
            "
                    onClick={() => handleMoveToCart(item)}
                  >
                    <CgShoppingCart size={14} className="sm:size-[16px]" />
                    <span className="whitespace-nowrap">Add to Cart</span>
                  </button>
                </div>
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 justify-between lg:justify-center">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className=" w-full inline-flex items-center justify-center
            bg-gray-100
            border border-gray-200
            transition-all duration-300
            hover:bg-gray-200 hover:border-gray-300 text-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-define-brown
          "
                  >
                    View Item
                  </Link>

                  <button
                    onClick={() => handleWishlist(item)}
                    className="w-full inline-flex items-center justify-center bg-define-red/10  text-define-red text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 hover:bg-define-red/20 hover:text-define-red/90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList