1:"$Sreact.fragment"
2:"$Sreact.suspense"
4:I[76638,["/_next/static/chunks/b6fe96d9a4aecec2.js","/_next/static/chunks/850be5308cfc663b.js","/_next/static/chunks/2e947f17df1f6607.js","/_next/static/chunks/7b6144de88f47122.js","/_next/static/chunks/40dc698724ea2bb0.js","/_next/static/chunks/c3ead5223541d6f3.js","/_next/static/chunks/1b43f8ebbdb36a51.js","/_next/static/chunks/b9021385454d1efd.js","/_next/static/chunks/fcdf94b9bead80ce.js","/_next/static/chunks/cc8b2b08e7316566.js","/_next/static/chunks/4ccf89590d707c32.js","/_next/static/chunks/9cc28913953c0450.js"],"default"]
5:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/d2be314c3ece3fbe.js"],"OutletBoundary"]
3:T82e,
        /* From Uiverse.io by NlghtM4re */ 
        .container-a {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height:100vh;
        }

        .tree {
          position: relative;
          width: 50px;
          height: 50px;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(30deg);
          animation: treeAnimate 5s linear infinite;
        }

        @keyframes treeAnimate {
          0% {
            transform: rotateX(-20deg) rotateY(360deg);
          }
          100% {
            transform: rotateX(-20deg) rotateY(0deg);
          }
        }

        .tree div {
          position: absolute;
          top: -50px;
          left: 0;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform: translateY(calc(25px * var(--x))) translateZ(0px);
        }

        .tree div.branch span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #69c069, #77dd77);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          border-bottom: 5px solid #00000019;
          transform-origin: bottom;
          transform: rotateY(calc(90deg * var(--i))) rotateX(30deg) translateZ(28.5px);
        }

        .tree div.stem span {
          position: absolute;
          top: 110px;
          left: calc(50% - 7.5px);
          width: 15px;
          height: 50%;
          background: linear-gradient(90deg, #bb4622, #df7214);
          border-bottom: 5px solid #00000019;
          transform-origin: bottom;
          transform: rotateY(calc(90deg * var(--i))) translateZ(7.5px);
        }

        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          filter: blur(20px);
          transform-style: preserve-3d;
          transform: rotateX(90deg) translateZ(-65px);
        }
      0:{"buildId":"ejVlci8D25W7ZCUgSJFeR","rsc":["$","$1","c",{"children":[["$","div",null,{"className":"h-screen flex","children":["$","$2",null,{"fallback":[["$","style",null,{"children":"$3"}],["$","div",null,{"className":"container-a","children":["$","div",null,{"className":"tree","children":[["$","div",null,{"className":"branch","style":{"--x":0},"children":[["$","span",null,{"style":{"--i":0}}],["$","span",null,{"style":{"--i":1}}],["$","span",null,{"style":{"--i":2}}],["$","span",null,{"style":{"--i":3}}]]}],["$","div",null,{"className":"branch","style":{"--x":1},"children":[["$","span",null,{"style":{"--i":0}}],["$","span",null,{"style":{"--i":1}}],["$","span",null,{"style":{"--i":2}}],["$","span",null,{"style":{"--i":3}}]]}],["$","div",null,{"className":"branch","style":{"--x":2},"children":[["$","span",null,{"style":{"--i":0}}],["$","span",null,{"style":{"--i":1}}],["$","span",null,{"style":{"--i":2}}],["$","span",null,{"style":{"--i":3}}]]}],["$","div",null,{"className":"branch","style":{"--x":3},"children":[["$","span",null,{"style":{"--i":0}}],["$","span",null,{"style":{"--i":1}}],["$","span",null,{"style":{"--i":2}}],["$","span",null,{"style":{"--i":3}}]]}],["$","div",null,{"className":"stem","children":[["$","span",null,{"style":{"--i":0}}],["$","span",null,{"style":{"--i":1}}],["$","span",null,{"style":{"--i":2}}],["$","span",null,{"style":{"--i":3}}]]}],["$","span",null,{"className":"shadow"}]]}]}]],"children":["$","$L4",null,{}]}]}],[["$","script","script-0",{"src":"/_next/static/chunks/9cc28913953c0450.js","async":true}]],["$","$L5",null,{"children":["$","$2",null,{"name":"Next.MetadataOutlet","children":"$@6"}]}]]}],"loading":null,"isPartial":false}
6:null
