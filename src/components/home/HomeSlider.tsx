"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Homebanner() {
  const images = [
    "/slider/homeslider1.png",
    "/slider/homeslider1.png",
    "/slider/homeslider1.png",
    "/slider/homeslider1.png",
  ];

  return (
    <div className="relative max-w-300 mx-auto">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        navigation={{
          nextEl: ".banner1-next",
          prevEl: ".banner1-prev",
        }}
        className="h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] mt-[-60px] mb-[-60px] md:mt-0 md:mb-0"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-contain md:object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="banner1-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 py-6 shadow hover:bg-white rounded-tr-[12px] rounded-br-[12px] ">
        <BiChevronLeft size={20} className="text-black" />
      </button>

      <button className="banner1-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 py-6 shadow hover:bg-white rounded-tl-[12px] rounded-bl-[12px]">
        <BiChevronRight size={20} className="text-black" />
      </button>
    </div>
  );
}
