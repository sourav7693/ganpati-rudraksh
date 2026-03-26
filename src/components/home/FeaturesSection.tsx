"use client";

import FeaturesWhatsapp from "@/svgs/FeaturesWhatsapp";
import FreeShiping from "@/svgs/FreeShiping";
import FreshProduct from "@/svgs/FreshProduct";
import GetFlat from "@/svgs/GetFlat";
import QualityTested from "@/svgs/QualityTested";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FeaturesSection() {
  const features = [
    {
      icon: FreeShiping,
      title: "Free Shipping",
      desc: "Get shipping on order over ₹500 only.",
    },
    {
      icon: QualityTested,
      title: "Quality Tested",
      desc: "Products verified before delivery.",
    },
    {
      icon: FeaturesWhatsapp,
      title: "WhatsApp Support",
      desc: "Instant support via WhatsApp.",
    },
    {
      icon: GetFlat,
      title: "Get Flat 20% OFF",
      desc: "Special discounts on selected items.",
    },
    {
      icon: FreshProduct,
      title: "Fresh Product",
      desc: "Premium quality fresh products.",
    },
  ];

  return (
    <section className="2xl:max-w-360 lg:max-w-300 mx-auto p-4">
      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={20}         
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {features.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col items-center text-center px-4">
                <div className="mb-3 flex h-14 w-14 items-center justify-center">
                  <item.icon className="size-14" />
                </div>

                <h4 className="text-[16px] font-semibold text-gray-900">
                  {item.title}
                </h4>

                <p className="mt-1 text-[14px] text-gray-500">{item.desc}</p>

                {index !== features.length - 1 && (
                  <span
                    className="
                    absolute right-0 top-1/2
                    hidden md:block
                    h-20 w-px
                    -translate-y-1/2
                    bg-define-brown/30
                  "
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
