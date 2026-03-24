// import React from 'react'

// const LoadingAnimation = () => {
//   return (
//     <>
//       <style>{`
//         /* From Uiverse.io by NlghtM4re */
//         .container-a {
//           width: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height:100vh;
//         }

//         .tree {
//           position: relative;
//           width: 50px;
//           height: 50px;
//           transform-style: preserve-3d;
//           transform: rotateX(-20deg) rotateY(30deg);
//           animation: treeAnimate 5s linear infinite;
//         }

//         @keyframes treeAnimate {
//           0% {
//             transform: rotateX(-20deg) rotateY(360deg);
//           }
//           100% {
//             transform: rotateX(-20deg) rotateY(0deg);
//           }
//         }

//         .tree div {
//           position: absolute;
//           top: -50px;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           transform: translateY(calc(25px * var(--x))) translateZ(0px);
//         }

//         .tree div.branch span {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, #69c069, #77dd77);
//           clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
//           border-bottom: 5px solid #00000019;
//           transform-origin: bottom;
//           transform: rotateY(calc(90deg * var(--i))) rotateX(30deg) translateZ(28.5px);
//         }

//         .tree div.stem span {
//           position: absolute;
//           top: 110px;
//           left: calc(50% - 7.5px);
//           width: 15px;
//           height: 50%;
//           background: linear-gradient(90deg, #bb4622, #df7214);
//           border-bottom: 5px solid #00000019;
//           transform-origin: bottom;
//           transform: rotateY(calc(90deg * var(--i))) translateZ(7.5px);
//         }

//         .shadow {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.4);
//           filter: blur(20px);
//           transform-style: preserve-3d;
//           transform: rotateX(90deg) translateZ(-65px);
//         }
//       `}</style>

//       <div className="container-a">
//         <div className="tree">
//           {/* Branch 0 */}
//           <div className="branch" style={{ "--x": 0 } as React.CSSProperties}>
//             <span style={{ "--i": 0 } as React.CSSProperties}></span>
//             <span style={{ "--i": 1 } as React.CSSProperties}></span>
//             <span style={{ "--i": 2 } as React.CSSProperties}></span>
//             <span style={{ "--i": 3 } as React.CSSProperties}></span>
//           </div>
//           {/* Branch 1 */}
//           <div className="branch" style={{ "--x": 1 } as React.CSSProperties}>
//             <span style={{ "--i": 0 } as React.CSSProperties}></span>
//             <span style={{ "--i": 1 } as React.CSSProperties}></span>
//             <span style={{ "--i": 2 } as React.CSSProperties}></span>
//             <span style={{ "--i": 3 } as React.CSSProperties}></span>
//           </div>
//           {/* Branch 2 */}
//           <div className="branch" style={{ "--x": 2 } as React.CSSProperties}>
//             <span style={{ "--i": 0 } as React.CSSProperties}></span>
//             <span style={{ "--i": 1 } as React.CSSProperties}></span>
//             <span style={{ "--i": 2 } as React.CSSProperties}></span>
//             <span style={{ "--i": 3 } as React.CSSProperties}></span>
//           </div>
//           {/* Branch 3 */}
//           <div className="branch" style={{ "--x": 3 } as React.CSSProperties}>
//             <span style={{ "--i": 0 } as React.CSSProperties}></span>
//             <span style={{ "--i": 1 } as React.CSSProperties}></span>
//             <span style={{ "--i": 2 } as React.CSSProperties}></span>
//             <span style={{ "--i": 3 } as React.CSSProperties}></span>
//           </div>
//           {/* Stem */}
//           <div className="stem">
//             <span style={{ "--i": 0 } as React.CSSProperties}></span>
//             <span style={{ "--i": 1 } as React.CSSProperties}></span>
//             <span style={{ "--i": 2 } as React.CSSProperties}></span>
//             <span style={{ "--i": 3 } as React.CSSProperties}></span>
//           </div>
//           <span className="shadow"></span>
//         </div>
//       </div>
//     </>
//   )
// }

// export default LoadingAnimation

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

        .rotate-img {
          width: 100px;
          height: 100px;
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        /* optional shadow */
        .shadow {
          width: 70px;
          height: 20px;
          background: rgba(0,0,0,0.2);
          filter: blur(10px);
          border-radius: 50%;
          margin: auto;
          margin-top: 10px;
        }
      `}</style>

      <div className="container-a">
        <div style={{ textAlign: "center" }}>
          <Image src="/images/rudraksh2.png" alt="rudraksh" width={500} height={500} className="object-cover size-full" />
          <div className="shadow"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;