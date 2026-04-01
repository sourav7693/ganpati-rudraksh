"use client";
import { SliderItem } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeSlider() {
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios(
          `${process.env.NEXT_PUBLIC_API_URL}/slider?page=1&limit=10&status=true`,
        );

        if (res.data.success) {
          setSliders(res.data.sliders || []);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // autoplay fix
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      video?.play().catch(() => {});
    });
  }, [sliders]);

  if (isMobile === null) return null;
  
  const filtered = sliders.filter((item) => {
    if (item.target === "all") return true;
    if (item.target === "mobile") return isMobile;
    if (item.target === "desktop") return !isMobile;
    return true;
  });

  if (!filtered.length) return null;

  if (loading) {
    return (
      <div className="w-full h-[13rem] md:h-[450px] lg:h-[520px] bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="relative mx-auto w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={filtered.length > 1}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const video = activeSlide.querySelector("video");

          if (video) {
            swiper.autoplay.stop();

            video.currentTime = 0;
            video.play().catch(() => {});

            video.onended = () => {
              swiper.autoplay.start();
              swiper.slideNext();
            };
          } else {
            swiper.autoplay.start();
          }
        }}
        className="h-[750px] xxl:h-[950px] 2xl:h-[650px] lg:h-[550px]"
      >
        {filtered.map((item, index) => (
          <SwiperSlide key={item.sliderId || index} className="h-full">
            <div className="relative h-full w-full">
              {item.media.resource_type === "image" ? (
                <Image
                  src={item.media.url}
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover size-full"
                />
              ) : (
                <video
                  src={item.media.url}
                  className="object-cover size-full w-full h-full"
                  muted
                  playsInline
                  autoPlay
                  preload="none"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
