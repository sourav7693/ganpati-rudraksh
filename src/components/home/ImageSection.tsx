"use client";
import Image from 'next/image'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ImageSection() {
  const images = [
    '/images/home1.png',
    '/images/rudrakshGold.png',
    '/images/rudrakshrasoria.png',    
  ]

  return (
    <section className="max-w-300 mx-auto md:px-0 p-4">
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
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[260px] rounded overflow-hidden ">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-contain"
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
  )
}
