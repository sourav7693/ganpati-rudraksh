"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BiChevronLeft } from "react-icons/bi";

const cards = [
  {
    id: 1,
    title: "Actress",
    name: "Shilpa Shetty",
    image: "/client/shilpa.png",
  },
  {
    id: 2,
    title: "Actress",
    name: "Pravati Patel",
    image: "/client/shilpa.png",
  },
  {
    id: 3,
    title: "Actress",
    name: "Priyanka Chopra",
    image: "/client/shilpa.png",
  },
  {
    id: 4,
    title: "Actress",
    name: "Sahiba Jha",
    image: "/client/shilpa.png",
  },
  {
    id: 5,
    title: "Actress",
    name: "Usha Martin",
    image: "/client/shilpa.png",
  },
  {
    id: 6,
    title: "Actress",
    name: "Simran Karnia",
    image: "/client/shilpa.png",
  },
  {
    id: 7,
    title: "Actress",
    name: "Kajal Agarwal",
    image: "/client/shilpa.png",
  },
];

export default function OurClients() {
  return (
    <section className="max-w-300 mx-auto px-4 py-4 relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {cards.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white  rounded px-4 py-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
              <div className="relative w-25 h-25 mb-6 rounded-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain rounded-full"
                />
              </div>

              <h3 className="text-base font-semibold text-gray-800">
                {item.name}
              </h3>

              <h4 className="text-sm text-gray-500">{item.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-end gap-3 mt-6">
        <button className="prev-btn w-9 h-9 border rounded-full flex items-center justify-center hover:bg-gray-100">
          <BiChevronLeft />
        </button>
        <button className="next-btn w-9 h-9 border rounded-full flex items-center justify-center hover:bg-gray-100">
          <BiChevronLeft className="rotate-180" />
        </button>
      </div>
    </section>
  );
}
