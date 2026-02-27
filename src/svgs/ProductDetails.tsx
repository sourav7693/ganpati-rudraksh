"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HelpIcon from "./Help";
import EasyReturn from "./EasyReturn";
import Original from "./Original";
import MakeIndia from "./MakeIndia";
import { CgShoppingCart } from "react-icons/cg";
import { BiShoppingBag } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";

type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  category?: string;
  des: string;
};

const ProductDetails = ({ product }: { product: ProductType }) => {
  const images = product.gallery?.length ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(images[0]);
  const router = useRouter();

  const handleBuyNow = () => {
    const order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Processing",
      total: product.price,
      items: [
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: 1,
        },
      ],
    };

    router.push("/my-account?tab=orders");
  };
  return (
    <>
      <section className="w-full">
        <div className="max-w-[1250px] mx-auto px-4 md:py-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10">
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="flex flex-col md:flex-row gap-4">
              <div
                className="flex md:flex-col flex-row gap-3 overflow-x-auto md:overflow-visible 
                    order-2 md:order-1"
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`border rounded p-1 transition shrink-0 ${
                      activeImage === img
                        ? "border-green-600"
                        : "border-gray-200 hover:border-green-600"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="product thumbnail"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>

              <div
                className="flex flex-col w-full md:w-[480px] 
                    order-1 md:order-2"
              >
                <div
                  className="rounded flex justify-center items-center border border-gray-200 
                      h-[280px] md:h-[420px] relative overflow-hidden"
                >
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="hidden sm:flex flex-col sm:flex-row gap-3 mt-3">
                  <button className="flex-1 bg-[#FFBB00] hover:bg-yellow-500 py-2 rounded font-medium flex items-center justify-center gap-2">
                    <CgShoppingCart size={16} />
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-define-brown  text-white py-2 rounded font-medium flex items-center justify-center gap-2"
                  >
                    <BiShoppingBag size={18} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-define-brown mb-1">
              Home ›{" "}
              <span className="text-black">
                {product.category ?? "Products"} ›
              </span>{" "}
              <span className="text-gray-600">{product.name}</span>
            </p>

            <h1 className="text-[22px] md:text-[32px] mb-2 font-bold text-define-black">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex items-center gap-1 bg-define-brown text-yellow-500 px-2 py-[2px] rounded text-sm">
                4.9 <IoMdStar size={14} fill="white" />
              </span>
              <span className="text-sm md:text-[16px] text-[#555555]">
                6,426 Ratings & 477 Reviews
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-green-600 font-medium">
                Special price
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl md:text-3xl font-semibold text-define-red">
                  ₹{product.price}
                </span>
                <span className="line-through text-gray-400">
                  ₹{Math.round(product.price * 1.8)}
                </span>
                <span className="text-define-brown font-medium">43% off</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4 mt-3">
                <input
                  type="text"
                  placeholder="Enter pin code"
                  className="border rounded-md px-3 py-2 text-sm w-full sm:w-40"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium">
                  Check
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Delivery by <b>21 Dec 2026, Sunday</b>
              </p>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select Type
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3">
              {[
                "Rudraksha In Gold",
                "One Mukhi Without ",
                "One Mukhi With Gold ",
                "Rudraksha In Gold",
                "One Mukhi Without ",
                "One Mukhi With Gold",
                "Rudraksha In Gold",
                "One Mukhi Without",
                "One Mukhi With Gold ",
              ].map((item, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" className="accent-green-600" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>

            <div className="w-full flex flex-wrap justify-between gap-6 mt-8 md:pr-[30px]">
              <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                <HelpIcon width={50} height={50} />
                <p className="mt-2 font-medium">24/7 Support</p>
              </div>

              <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                <EasyReturn width={50} height={50} />
                <p className="mt-2 font-medium">Easy Returns</p>
              </div>

              <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                <Original width={50} height={50} />
                <p className="mt-2 font-medium">100% Original</p>
              </div>

              <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                <MakeIndia width={50} height={50} />
                <p className="mt-2 font-medium">Make in India</p>
              </div>
            </div>

            <div className="w-full mt-6">
              {" "}
              <h2 className="text-define-black md:text-[24px] font-semibold mb-4 text-left">
                {" "}
                Product Short Details{" "}
              </h2>{" "}
              <div className="w-full flex py-2">
                {" "}
                <div className="w-[40%] font-medium md:text-[16px]">
                  {" "}
                  Point Headline{" "}
                </div>{" "}
                <div className="w-[60%] text-sm text-gray-600 ">
                  {" "}
                  Point Description{" "}
                </div>{" "}
              </div>{" "}
              <div className="w-full flex py-2">
                {" "}
                <div className="w-[40%] font-medium md:text-[16px]">
                  {" "}
                  Point Headline{" "}
                </div>{" "}
                <div className="w-[60%] text-sm text-gray-600">
                  {" "}
                  Point Description{" "}
                </div>{" "}
              </div>{" "}
              <div className="w-full flex py-2">
                {" "}
                <div className="w-[40%] font-medium md:text-[16px]">
                  {" "}
                  Point Headline{" "}
                </div>{" "}
                <div className="w-[60%] text-sm text-gray-600">
                  {" "}
                  Point Description{" "}
                </div>{" "}
              </div>{" "}
              <div className="w-full flex py-2">
                {" "}
                <div className="w-[40%] font-medium md:text-[16px]">
                  {" "}
                  Point Headline{" "}
                </div>{" "}
                <div className="w-[60%] text-sm text-gray-600">
                  {" "}
                  Point Description{" "}
                </div>{" "}
              </div>{" "}
            </div>

            <div className="w-full mt-6">
              {" "}
              <h2 className="text-define-black md:text-[24px] font-semibold mb-4 text-left">
                {" "}
                Product Description{" "}
              </h2>{" "}
              <div className="w-full border rounded-md overflow-hidden border-gray-300">
                {" "}
                <div className="w-full p-4 border-b text-sm text-gray-700 border-gray-300">
                  {" "}
                  Product Description{" "}
                </div>{" "}
                <div className="w-full flex border-b border-gray-300">
                  {" "}
                  <div className="w-[30%] p-4 font-medium text-sm border-r border-gray-300">
                    {" "}
                    Product Des1{" "}
                  </div>{" "}
                  <div className="w-[70%] p-4 text-sm text-gray-600 ">
                    {" "}
                    Water once a week or when the soil feels dry.{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-full flex border-b border-gray-300">
                  {" "}
                  <div className="w-[30%] p-4 font-medium text-sm border-r border-gray-300">
                    {" "}
                    Product Des2{" "}
                  </div>{" "}
                  <div className="w-[70%] p-4 text-sm text-gray-600">
                    {" "}
                    Well-drained fertile soil.{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-full flex">
                  {" "}
                  <div className="w-[30%] p-4 font-medium text-sm border-r border-gray-300">
                    {" "}
                    Product Des3{" "}
                  </div>{" "}
                  <div className="w-[70%] p-4 text-sm text-gray-600">
                    {" "}
                    Apply organic fertilizer once every month.{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>

            <div className="w-[100%] mt-6">
              <div className="w-[100%] border-l-3 border-define-brown pl-3 py-0">
                <p className="text-sm text-gray-700 leading-relaxed">
                  This product is carefully grown and maintained to ensure the
                  highest quality and long-lasting freshness. It is suitable for
                  both indoor and outdoor environments and requires minimal
                  maintenance, making it ideal for beginners as well as
                  experienced plant lovers. The plant helps enhance natural
                  beauty, improves air quality, and creates a calming atmosphere
                  in your living or working space. With proper care, it will
                  remain healthy and vibrant for a long time, adding a touch of
                  greenery and elegance to your surroundings.
                </p>
              </div>
            </div>

            <div className="w-full mt-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 mb-4">
                <div className="text-xl md:text-[24px] font-semibold">
                  Rating and Review
                </div>

                <button className="border px-4 py-2 text-sm rounded-full bg-define-brown text-white">
                  Rate this Product
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-[32%] rounded-md p-4 bg-white text-center">
                  <div className="text-3xl font-semibold text-define-brown">
                    4.5 ★
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    1,248 Ratings & 342 Reviews
                  </div>
                </div>

                <div className="w-full lg:w-[64%] rounded-md p-4 space-y-2 bg-white">
                  {[85, 65, 40, 20, 10].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-10 text-sm">{5 - i} ★</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div
                          className={`h-2 rounded ${
                            i === 0
                              ? "bg-green-600"
                              : i === 1
                              ? "bg-green-400"
                              : i === 2
                              ? "bg-yellow-500"
                              : i === 3
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white  p-2 flex gap-3 sm:hidden">
        <button className="flex-1 bg-[#FFBB00] hover:bg-yellow-500 py-3 rounded font-medium flex items-center justify-center gap-2">
          <CgShoppingCart size={16} />
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-define-brown hover:bg-green-700 text-white py-3 rounded font-medium flex items-center justify-center gap-2"
        >
          <BiShoppingBag size={18} />
          Buy Now
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
