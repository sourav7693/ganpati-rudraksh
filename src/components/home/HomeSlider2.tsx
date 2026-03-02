"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Homebanner2() {
  const images = [
    "/slider/rudrakshbracelate.png",
    "/slider/rudrakshrosaries.png",
    "/slider/trademarks.png",
    "/slider/rudrakshbracelate.png",
    "/slider/rudrakshrosaries.png",
    "/slider/trademarks.png",
  ];

  return (
    <section className="max-w-300 mx-auto md:px-0 px-4 py-12 mt-4">
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={16}
          navigation={{
            nextEl: ".banner2-next",
            prevEl: ".banner2-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[100px] sm:h-[200px] lg:h-[260px] rounded overflow-hidden ">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-container"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="
            banner2-prev absolute left-0 top-1/2 -translate-y-1/2 z-10
            bg-white/80 shadow hover:bg-white
            rounded-tr-[12px] rounded-br-[12px]
            py-5 md:py-6 px-1
          "
        >
          <BiChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
        </button>

        <button
          className="
            banner2-next absolute right-0 top-1/2 -translate-y-1/2 z-10
            bg-white/80 shadow hover:bg-white
            rounded-tl-[12px] rounded-bl-[12px]
            py-5 md:py-6 px-1 
          "
        >
          <BiChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </section>
  );
}
