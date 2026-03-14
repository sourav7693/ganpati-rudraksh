"use client";
import HelpIcon from "@/svgs/Help";
import EasyReturn from "@/svgs/EasyReturn";
import Original from "@/svgs/Original";
import MakeIndia from "@/svgs/MakeIndia";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FeaturesSection() {
  const features = [
    {
      icon: HelpIcon,
      title: "24/7 Support",
    },
    {
      icon: EasyReturn,
      title: "Easy Returns",
    },
    {
      icon: Original,
      title: "100% Original",
    },
    {
      icon: MakeIndia,
      title: "Made in India",
    },
  ];

  return (
    <section className="max-w-300 mx-auto p-4">
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 4 },
          }}
        >
          {features.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center flex-1 min-w-[120px]">
                <item.icon width={50} height={50} />
                <p className="mt-2 font-medium">{item.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
