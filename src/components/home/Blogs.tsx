"use client";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Blogs = () => {
  const data = [
    {
      label: "How to Choose the Right Rudraksha for You",
      desc: "Finding the perfect Rudraksha depends on your life goals and energies. Learn how to select authentic beads that align with your mind, body, and success.",
      img: "/blog/1.jpg",
    },
    {
      label: "Benefits of Wearing Rudraksha in Daily Life",
      desc: "Rudraksha is not just spiritual—it improves focus, peace, and confidence. Discover how these sacred beads can positively impact your everyday life.",
      img: "/blog/2.jpg",
    },
    {
      label: "Original vs Fake Rudraksha – How to पहचान",
      desc: "With rising demand, fake Rudraksha is everywhere in the market. Here’s how you can identify genuine beads and avoid costly mistakes.",
      img: "/blog/3.jpg",
    },
    {
      label: "5 Powerful Rudraksha for Wealth & Success.",
      desc: "Certain Rudraksha beads are known to attract prosperity and growth. Explore the most powerful options trusted by spiritual experts.",
      img: "/blog/4.jpg",
    },
    {
      label: "Rudraksha Wearing Rules You Must Follow",
      desc: "Wearing Rudraksha correctly enhances its spiritual benefits. Learn the do’s and don’ts to unlock its full divine potential.",
      img: "/blog/5.jpg",
    },
  ];
  return (
    <section className="flex flex-col gap-4 xxl:max-w-460 2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto p-4">
      <h1 className="text-2xl font-bold text-define-brown">
        Read our Latest Blogs
      </h1>
      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer bg-white">
                <div className="flex flex-col gap-4 w-full h-auto p-4">
                  <div>
                    <Image
                      src={item.img}
                      alt={item.label}
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-2">
                    <h1 className="text-lg font-semibold line-clamp-1">
                      {item.label}
                    </h1>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Blogs;
