// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// export default function Homebanner() {
//   const images = ["/slider/mobileslider1.avif", "/slider/mobileslider2.avif"];

//   return (
//     <div className="w-full mx-auto lg:hidden">
//       <Swiper
//         modules={[Autoplay]}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//         className="w-full"
//       >
//         {images.map((item, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full aspect-[7/16]">
//               <Image
//                 src={item}
//                 alt={`Banner ${index + 1}`}
//                 fill
//                 priority={index === 0}
//                 className="object-cover"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }


"use client";
import { useEffect, useRef } from "react";

export default function MobileSlider() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement)
        .play()
        .catch((error) => console.log("Autoplay blocked:", error));
    }
  }, []);

  return (
    <div className="w-full mx-auto lg:hidden">
      <video
        ref={videoRef}
        width="550"
        height="1440"
        loop
        autoPlay
        muted
        playsInline
        className="w-full h-[800px] object-cover"
      >
        <source src="/slider/mobile.mp4" type="video/mp4" />
      </video>
    </div>
  );
}