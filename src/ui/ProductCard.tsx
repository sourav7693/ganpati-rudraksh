"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomer } from "@/context/CustomerContext";
import { removeWishlistApi, toggleWishlistApi } from "@/api/wishlist";
import { addToCartApi } from "@/api/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCartPreview } from "@/context/CartPreviewContext";
import confetti from "canvas-confetti";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { PiWarningCircleLight } from "react-icons/pi";

type Product = {
  _id: string;
  slug: string;
  name: string;
  price: number;
  mrp?: number;
  discount?: number;
  coverImage: {
    url: string;
    public_id: string;
  };
  height?: string;
  category?: string;
};

export default function ProductCard({
  _id,
  name,
  price,
  coverImage,
  mrp,
  discount,
  slug,
  height,
  category,
}: Product) {
  const { customer, refreshCustomer } = useCustomer();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const router = useRouter();  
  const [isAnimating, setIsAnimating] = useState(false);
  const { showPreview } = useCartPreview();

  const customerId = customer?._id;

  const handleWishlist = async () => {
    if (!customerId) {
     router.push("/login");
      return;
    }

    if (loading) return;

    setLoading(true);
    setIsWishlisted((prev) => !prev);

    try {
      if (isWishlisted) {
        // 🔴 Explicit remove
        await removeWishlistApi(customerId, _id);
        toast.success("Removed from wishlist");
      } else {
        // 🟢 Add
        await toggleWishlistApi(customerId, _id);
        toast.success("Added to wishlist");
      }

      await refreshCustomer();
    } catch (err) {
      console.error(err);
      setIsWishlisted((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  const handleCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!customerId) {
     router.push("/login");
      return;
    }

    if (loading) return;
    setIsAnimating(true);

    if (!isInCart) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        origin: { x, y },
        particleCount: 25,
        spread: 360,
        startVelocity: 15,
        decay: 0.9,
        gravity: 0,
        scalar: 0.8,
        colors: ["#22c55e", "#ffffff"],
        disableForReducedMotion: true,
        zIndex: 9999,
      });
    }
    setLoading(true);

    try {
      if (isInCart) {
        router.push("/my-cart");
        return;
      } else {
        await addToCartApi(customerId, _id, undefined, 1, price);
      }
      await refreshCustomer();

      setIsInCart(!isInCart);
      setTimeout(() => {
        setIsAnimating(false);
      }, 700);
      // toast.success(isInCart ? "Removed from cart" : "Added to cart");

      showPreview({
        _id,
        name,
        price,
        mrp,
        discount,
        image: coverImage.url,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!customer || !customer.wishlist) return;

    const exists = customer.wishlist.some(
      (item: any) =>
        String(item.product?._id || item.product) === String(_id) &&
        item.status === true,
    );

    setIsWishlisted(exists);
  }, [customer, _id]);

  useEffect(() => {
    if (!customer || !customer.cart) return;

    const exists = customer.cart.some(
      (item: any) =>
        String(item.productId?._id || item.productId) === String(_id),
    );

    setIsInCart(exists);
  }, [customer, _id]);


  return (
    <>
      <div className="relative rounded bg-white p-1 md:p-2 shadow-md hover:shadow-lg w-full flex flex-col justify-between">
        <Link
          href={`/product/${slug}`}
          className="absolute inset-0 z-10 "
          aria-label={`View ${name}`}
        ></Link>
        {/* IMAGE SECTION */}
        <div className="relative rounded bg-gray-100 overflow-hidden">
          <button
            onClick={handleWishlist}
            className="absolute right-2 top-2 z-20 rounded-full bg-white/50 p-1 shadow"
          >
            <FaHeart
              size={18}
              className={`
              transition-all duration-300
              ${
                isWishlisted
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-800"
              }
            `}
            />
          </button>

          <div
            className={` ${height}`}
          >
            <Image
              src={coverImage.url}
              alt={coverImage.public_id}
              height={500}
              width={500}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className=" pt-2 pb-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xs md:text-sm  font-semibold text-define-brown line-clamp-1">
              {name}
            </h3>
          </div>

          <div>
            <span className="text-xs md:text-lg font-bold text-define-brown">
              <FaRupeeSign className="inline" />
              {price.toFixed(0)}
            </span>

            {discount && discount > 0 && mrp && (
              <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-gray-500 line-through">
                <FaRupeeSign className="inline" />
                {mrp.toFixed(0)}
              </span>
            )}

            {discount && discount > 0 && (
              <span className="ml-1 md:ml-2 text-[10px] md:text-xs text-red-500">
                {discount}% OFF
              </span>
            )}
          </div>

          <div>
            {category && (
              <span className="rounded-full bg-define-pink px-3 py-1 text-define-red text-[9px] md:text-sm ">
                {category}
              </span>
            )}
          </div>

          {/* BUTTONS */}
          <div className="mt-2 flex justify-between items-center">
            <Link
              href={`/product/${slug}`}
              className="text-xs  text-define-brown font-medium border rounded-full px-3 py-2 hover:bg-define-brown/10 hidden md:flex justify-center items-center gap-1"
            >
              <PiWarningCircleLight size={18} />
              More Info
            </Link>

            <button
              onClick={handleCart}
              className={`cursor-pointer max-md:w-full relative z-20 
          group flex items-center justify-center gap-2
          text-xs font-semibold px-3 py-2 rounded-full                     
          ${isAnimating ? "scale-90" : "scale-100"} 
          ${
            isInCart
              ? "bg-define-pink text-define-red cursor-default shadow-inner"
              : "text-white btn-grad hover:scale-[1.03] ease-in-out"
          }
        `}
            >
              {isInCart ? (
                <>
                  <CgShoppingCart
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span>Go to Cart</span>
                </>
              ) : (
                <>
                  <CgShoppingCart
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
