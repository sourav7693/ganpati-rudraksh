// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// type Banner = {
//   _id: string;
//   image: { url: string };
//   title?: string;
// };

// export default function Homebanner() {
//    const [banners, setBanners] = useState<Banner[]>([]);
//    const [loading, setLoading] = useState(true);
//    const prevRef = useRef(null);
//    const nextRef = useRef(null);

//     useEffect(() => {
//       const fetchBanners = async () => {
//         try {
//           // 👇 Update this URL to match your specific API endpoint
//           const res = await axios(
//             `${process.env.NEXT_PUBLIC_API_URL}/slider?page=1&limit=8&status=true`,
//           );

//           if (res.data.success) {
//             // Assuming your API returns { success: true, data: [...] }
//             setBanners(res.data.sliders || []);
//           }
//         } catch (error) {
//           console.error("Failed to fetch banners:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchBanners();
//     }, []);

//     // Optional: Loading Skeleton
//     if (loading) {
//       return (
//         <div className="w-full h-[13rem] md:h-[450px] lg:h-[520px] bg-gray-200 animate-pulse" />
//       );
//     }

//     // If no banners found, don't render the slider
//     if (banners.length === 0) return null;

//   return (
//     <div className="relative w-full mx-auto">
//       <Swiper
//         modules={[Autoplay, Navigation]}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         loop={banners.length > 1}
//         onBeforeInit={(swiper) => {
//           // @ts-ignore
//           swiper.params.navigation.prevEl = prevRef.current;
//           // @ts-ignore
//           swiper.params.navigation.nextEl = nextRef.current;
//         }}
//         navigation={{
//           prevEl: prevRef.current,
//           nextEl: nextRef.current,
//         }}
//         className="hidden lg:block xxl:h-[800px] 2xl:h-[650px] lg:h-[450px]"
//       >
//         {banners.map((item, index) => (
//           <SwiperSlide key={item._id || index} className="h-full">
//             <div className="relative h-full w-full">
//               <Image
//                 src={item.image.url}
//                 alt={`Banner ${index + 1}`}
//                 fill
//                 priority={index === 0}
//                 className="object-cover size-full"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {banners.length > 1 && (
//         <button
//           ref={prevRef}
//           className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 py-6 shadow hover:bg-white rounded-tr-[12px] rounded-br-[12px] cursor-pointer"
//         >
//           <BiChevronLeft size={20} className="text-black" />
//         </button>
//       )}

//       {banners.length > 1 && (
//         <button
//           ref={nextRef}
//           className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-tl-[12px] rounded-bl-[12px] bg-white/80 py-6 shadow hover:bg-white cursor-pointer"
//         >
//           <BiChevronRight size={20} className="text-black" />
//         </button>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useRef } from "react";

export default function HomeSlider() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement)
        .play()
        .catch((error) => console.log("Autoplay blocked:", error));
    }
  }, []);

  return (
    <div className="w-full hidden lg:block ">
      <video
        ref={videoRef}
        width="1440"
        height="550"
        loop
        autoPlay
        muted
        playsInline
        className="w-full h-[650px] object-cover"
      >
        <source src="/slider/rvideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}