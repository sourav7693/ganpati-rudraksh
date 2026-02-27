module.exports=[42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React},9270,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.AppRouterContext},38783,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactServerDOMTurbopackClient},35112,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactDOM},42343,a=>{"use strict";var b=a.i(72131),c={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},d=b.default.createContext&&b.default.createContext(c),e=["attr","size","title"];function f(){return(f=Object.assign.bind()).apply(this,arguments)}function g(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function h(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{};b%2?g(Object(c),!0).forEach(function(b){var d,e,f;d=a,e=b,f=c[b],(e=function(a){var b=function(a,b){if("object"!=typeof a||!a)return a;var c=a[Symbol.toPrimitive];if(void 0!==c){var d=c.call(a,b||"default");if("object"!=typeof d)return d;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)}(a,"string");return"symbol"==typeof b?b:b+""}(e))in d?Object.defineProperty(d,e,{value:f,enumerable:!0,configurable:!0,writable:!0}):d[e]=f}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(c)):g(Object(c)).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(c,b))})}return a}function i(a){return c=>b.default.createElement(j,f({attr:h({},a.attr)},c),function a(c){return c&&c.map((c,d)=>b.default.createElement(c.tag,h({key:d},c.attr),a(c.child)))}(a.child))}function j(a){var g=c=>{var d,{attr:g,size:i,title:j}=a,k=function(a,b){if(null==a)return{};var c,d,e=function(a,b){if(null==a)return{};var c={};for(var d in a)if(Object.prototype.hasOwnProperty.call(a,d)){if(b.indexOf(d)>=0)continue;c[d]=a[d]}return c}(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(b.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}(a,e),l=i||c.size||"1em";return c.className&&(d=c.className),a.className&&(d=(d?d+" ":"")+a.className),b.default.createElement("svg",f({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},c.attr,g,k,{className:d,style:h(h({color:a.color||c.color},c.style),a.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),j&&b.default.createElement("title",null,j),a.children)};return void 0!==d?b.default.createElement(d.Consumer,null,a=>g(a)):g(c)}a.s(["GenIcon",()=>i],42343)},18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},24361,(a,b,c)=>{b.exports=a.x("util",()=>require("util"))},14747,(a,b,c)=>{b.exports=a.x("path",()=>require("path"))},46058,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},39118,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"},34239,a=>{"use strict";var b=a.i(87924);a.s(["default",0,()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
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
      `}),(0,b.jsx)("div",{className:"container-a",children:(0,b.jsxs)("div",{className:"tree",children:[(0,b.jsxs)("div",{className:"branch",style:{"--x":0},children:[(0,b.jsx)("span",{style:{"--i":0}}),(0,b.jsx)("span",{style:{"--i":1}}),(0,b.jsx)("span",{style:{"--i":2}}),(0,b.jsx)("span",{style:{"--i":3}})]}),(0,b.jsxs)("div",{className:"branch",style:{"--x":1},children:[(0,b.jsx)("span",{style:{"--i":0}}),(0,b.jsx)("span",{style:{"--i":1}}),(0,b.jsx)("span",{style:{"--i":2}}),(0,b.jsx)("span",{style:{"--i":3}})]}),(0,b.jsxs)("div",{className:"branch",style:{"--x":2},children:[(0,b.jsx)("span",{style:{"--i":0}}),(0,b.jsx)("span",{style:{"--i":1}}),(0,b.jsx)("span",{style:{"--i":2}}),(0,b.jsx)("span",{style:{"--i":3}})]}),(0,b.jsxs)("div",{className:"branch",style:{"--x":3},children:[(0,b.jsx)("span",{style:{"--i":0}}),(0,b.jsx)("span",{style:{"--i":1}}),(0,b.jsx)("span",{style:{"--i":2}}),(0,b.jsx)("span",{style:{"--i":3}})]}),(0,b.jsxs)("div",{className:"stem",children:[(0,b.jsx)("span",{style:{"--i":0}}),(0,b.jsx)("span",{style:{"--i":1}}),(0,b.jsx)("span",{style:{"--i":2}}),(0,b.jsx)("span",{style:{"--i":3}})]}),(0,b.jsx)("span",{className:"shadow"})]})})]})])},48817,a=>{"use strict";var b=a.i(83490);async function c(a=1,d=10){let e=await (0,b.default)(`https://api.ganpatirudraakshaam.com/api/category?limit=${d}&page=${a}`);if(!e.status||200!==e.status)throw Error("Failed to fetch categories");let f=(await e.data).categories||[],g=[];for(let a of f){let b=(a.children||[]).filter(a=>a.type?.toLowerCase()==="sub"&&a.name&&!1!==a.status).map(b=>({id:b.id,name:b.name,image:b.image?.url||a.image?.url||"/assets/home/category/plants.png"}));g.push({parent:{id:a.categoryId,name:a.name,image:a.image?.url||"/assets/home/category/plants.png"},subCategories:b})}return g}a.s(["fetchCategories",()=>c])},13891,a=>{"use strict";var b=a.i(87924),c=a.i(72131);let d=(0,c.createContext)(null);a.s(["CartPreviewProvider",0,({children:a})=>{let[e,f]=(0,c.useState)(null),[g,h]=(0,c.useState)(!1);return(0,b.jsx)(d.Provider,{value:{product:e,show:g,showPreview:a=>{f(a),h(!0),setTimeout(()=>h(!1),1e4)},hidePreview:()=>h(!1)},children:a})},"useCartPreview",0,()=>{let a=(0,c.useContext)(d);if(!a)throw Error("useCartPreview must be used inside provider");return a}])},92836,a=>{"use strict";let b;var c,d=a.i(87924),e=a.i(72131);let{Provider:f,useResource:g}=(c=a.i(48817).fetchCategories,b=(0,e.createContext)(null),{Provider:({children:a})=>{let[f,g]=(0,e.useState)(null),[h,i]=(0,e.useState)(!0),j=async a=>{try{a?.silent||i(!0);let b=await c();g(b)}catch{g(null)}finally{a?.silent||i(!1)}};(0,e.useEffect)(()=>{j()},[]);let k={data:f,loading:h,refresh:j,...void 0};return(0,d.jsx)(b.Provider,{value:k,children:a})},useResource:()=>{let a=(0,e.useContext)(b);if(!a)throw Error("Hook must be used inside its Provider");return a}});a.s(["CategoryProvider",()=>f,"useCategories",0,()=>{let a=g();return{categories:a.data,loading:a.loading,refreshCategories:a.refresh}}],92836)},83075,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(34239);let e=(0,c.createContext)(null);function f({children:a}){let[f,g]=(0,c.useState)(!1);return(0,b.jsxs)(e.Provider,{value:{showLoader:f,setShowLoader:g},children:[a,f&&(0,b.jsx)("div",{className:"fixed inset-0 z-[99999] bg-white flex items-center justify-center",children:(0,b.jsx)(d.default,{})})]})}function g(){let a=(0,c.useContext)(e);if(!a)throw Error("useGlobalUI must be used inside GlobalUIProvider");return a}a.s(["GlobalUIProvider",()=>f,"useGlobalUI",()=>g])},99214,a=>{"use strict";var b=a.i(87924),c=a.i(71987),d=a.i(38246),e=a.i(13891),f=a.i(71682),g=a.i(31173);function h(){let{product:a,show:h,hidePreview:i}=(0,e.useCartPreview)();return h&&a?(0,b.jsxs)("div",{className:"   fixed z-50   bottom-0 left-0 right-0   md:bottom-6 md:right-6 md:left-auto   bg-white shadow-2xl   md:rounded-xl   p-3   animate-slide-in   md:w-[320px]   ",children:[(0,b.jsx)("button",{onClick:i,className:"flex absolute right-2 top-2 text-define-black rounded-full",children:(0,b.jsx)(g.IoMdCloseCircle,{size:16,className:"text-define-red"})}),(0,b.jsxs)("div",{className:"flex gap-3 items-center",children:[(0,b.jsx)("div",{className:"size-16 md:size-24 overflow-hidden rounded-lg bg-gray-100",children:(0,b.jsx)(c.default,{src:a.image,alt:a.name,width:96,height:96,className:"h-full w-full object-cover"})}),(0,b.jsxs)("div",{className:"flex-1",children:[(0,b.jsx)("h4",{className:"text-sm md:text-sm font-semibold line-clamp-1 text-define-brown",children:a.name}),(0,b.jsx)("p",{className:"hidden md:block text-xs text-gray-500 line-clamp-1",children:"Fresh & premium quality"}),(0,b.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[(0,b.jsxs)("span",{className:"font-bold text-define-red",children:[(0,b.jsx)(f.FaRupeeSign,{className:"inline"}),a.price]}),a.mrp&&(0,b.jsxs)("span",{className:"text-xs text-gray-400 line-through",children:[(0,b.jsx)(f.FaRupeeSign,{className:"inline"}),a.mrp]})]}),(0,b.jsx)(d.default,{href:"/my-cart",className:"   shrink-0 mt-2   rounded-full   text-white   text-xs md:text-xs   px-4 py-1   bg-define-red   ",children:"View Cart"})]})]})]}):null}a.s(["default",()=>h])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b87e662._.js.map