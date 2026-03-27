"use client";

import Image from "next/image";

const LoadingAnimation = () => {
  return (
    <>
      <style>{`
        .container-a {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
        }

        .video-wrapper {
  width: 60vw;
  max-width: 500px;
  min-width: 250px;
  aspect-ratio: 1 / 1;
  animation: fadeIn 0.5s ease-in;
}
  @media (max-width: 640px) {
  .video-wrapper {
    width: 80vw;
    min-width: unset;
  }
           @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

      .shadow {
  width: 40%;
  height: 25px;
  background: rgba(0,0,0,0.2);
  filter: blur(15px);
  border-radius: 50%;
  margin: 20px auto 0;
}
      `}</style>

      <div className="container-a">
        <div style={{ textAlign: "center" }}>
         <div className="relative w-full h-[260px] lg:h-[350px] rounded-xl overflow-hidden video-wrapper">
                     <Image
                       src="/images/rudragif.gif"
                       alt="Service Technician"
                       fill
                       priority
                       className="object-cover"
                     />                     
                   </div>

          <div className="shadow"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
