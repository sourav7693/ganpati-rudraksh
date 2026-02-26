"use client";

import Image from "next/image";
import React from "react";

import BadgeRight from "@/svgs/BadgeRight";

interface CardItem {
  title: string;
  desc: string;
}

export const Whychoose: React.FC = () => {
  const leftCards: CardItem[] = [
    {
      title: "Professional Technician",
      desc: "Highly trained professional technicians deliver reliable appliance repairs across Siliguri and greater North Bengal.",
    },
    {
      title: "Competitive Services",
      desc: "Competitive service packages provide excellent value with transparent pricing and dependable appliance repair solutions.",
    },
    {
      title: "Expert Technician",
      desc: "Expert technicians diagnose efficiently, using authorized parts to restore appliance performance and long-term reliability.",
    },
  ];

  const rightCards: CardItem[] = [
    {
      title: "Easy Call Booking",
      desc: "Book your home appliance repair easily and quickly with our 24x7 call support and instant doorstep service response.",
    },
    {
      title: "Affordable Service Price",
      desc: "Get professional home appliance repair at an affordable price with transparent rates and guaranteed quality service.",
    },
    {
      title: "Door-Step Service",
      desc: "Our convenient doorstep service ensures skilled technicians arrive fully equipped to repair your appliances quickly, efficiently, and safely.",
    },
  ];

  return (
    <section className="w-full flex justify-center px-4 py-5">
      <div className="w-full max-w-300 mx-auto flex flex-col lg:flex-row items-center gap-6">
        <div className="text-[20px] font-bold"></div>

        <div className="order-2 lg:order-1 flex-[1.5] flex flex-col gap-4 w-full">
          {leftCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg p-8 shadow-sm
             bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.2)_100%)]"
            >
              <div className="w-16 h-16 mr-4 flex items-center justify-center ">
                <BadgeRight className="w-12 h-12" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{card.title}</h4>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-1 lg:order-2 flex-1 w-full flex justify-center">
          <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[450px] rounded-xl overflow-hidden">
            <Image
              src="/images/rudraksh2.png"
              alt="Service Technician"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="order-3 flex-[1.5] flex flex-col gap-4 w-full">
          {rightCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg p-8 shadow-sm
             bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,#FFFFFF_100%)]"
            >
              <div className="w-16 h-16 mr-4 flex items-center justify-center ">
                <BadgeRight className="w-12 h-12" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{card.title}</h4>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
