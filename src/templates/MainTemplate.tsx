
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import TopHeader from "@/components/global/TopHeader";
import React from "react";

const MainTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="z-[1000] w-full fixed top-0 left-0">
        <TopHeader />
        <Header />
      </div>

      {/* Main Content */}
      <div className=" lg:mt-[5rem] md:mt-[5rem] pt-[4rem] mt-[2rem] bg-[#f5f5f5]">{children}</div>
      {/* <CartButton /> */}
      <Footer />
    </div>
  );
};

export default MainTemplate;
