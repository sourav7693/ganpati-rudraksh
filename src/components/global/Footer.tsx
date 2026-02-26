"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiCheck, BiMapPin, BiPhone } from "react-icons/bi";
import { BsInstagram, BsYoutube } from "react-icons/bs";

import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const socialLinks = [
  { icon: LiaLinkedin, href: "https://www.linkedin.com/" },
  { icon: BsInstagram, href: "https://www.instagram.com/" },
  { icon: BsYoutube, href: "https://www.youtube.com/" },
  { icon: FaFacebook, href: "https://www.facebook.com/" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "" },
  { label: "Our Products", href: "" },
  { label: "My Account", href: "/my-account" },
  { label: "Contact Us", href: "" },
];

const quickLinks2 = [
  { label: "Shiping Policy", href: "" },
  { label: "Payment Help", href: "" },
  { label: "For Plant Help", href: "" },
  { label: "Invoice Help", href: "" },
  { label: "Our CSR", href: "" },
];

const quickLinks3 = [
  { label: "Refund Policy", href: "" },
  { label: "Privacy Policy", href: "" },
  { label: "Delivery", href: " " },
  { label: "Invoice Help", href: "" },
  { label: "Contact Us", href: "" },
];

export default function Footer() {
  const [formData, setFormData] = useState<{ message: string }>({
    message: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const whatsappMessage = `Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=+917586891753&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=+917586891753&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setFormData({
      message: "",
    });
  };

  return (
    <footer
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/footerbg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 pb-6 pt-12">
        <div className="mx-auto max-w-300 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded bg-white/10 backdrop-blur-md px-6 py-4">
            <p className="text-[17px] text-white">
              Get a call back within 15 minutes. WhatsApp us 24x7<br></br>{" "}
              between 9:00 AM and 8:00 PM.
            </p>

            <div className="flex w-full md:w-auto md:border md:border-white rounded-[40px]">
              <form action="" onSubmit={handleSubmit}>
                <div className="flex w-full md:w-[550px] px-4 md:px-0">
                  <div className="flex items-center   backdrop-blur-md rounded-l-[40px] px-3 w-full">
                    <div className="size-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,35,0,0)_32.21%,rgba(212,35,0,0.60)_100%)] border border-[#FFBB00] flex items-center justify-center">
                      <FaWhatsapp className="text-define-brown" />
                    </div>

                    <input
                      type="text"
                      placeholder="Message"
                      className=" text-white px-4 py-3 w-full focus:outline-none rounded-l-[40px] placeholder-gray-400"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button className="bg-white text-gray-900 px-6 py-3 rounded-tr-[40px]  rounded-br-[40px] font-semibold hover:bg-gray-200 transition flex items-center justify-center whitespace-nowrap">
                    Chat With
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-300 px-4 pb-12 pt-6">
          <div className="text-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-3">
                <Link href="/" className="block">
                  <Image
                    src="/logo-white.svg"
                    alt="logo"
                    width={150}
                    height={50}
                    className="h-auto w-auto object-contain"
                  />
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-justify">
                  Lorem ipsum dolor sit amet consectetur. Scelerisque et sem sem
                  fames sed ullamcorper. Sollicitudin erat id quisque at. A
                  semper nam in posuere euismod sed. Pretium elit mauris eget
                  amet magna consequat dignissim est tellus. Et malesuada
                  egestas viverra risus venenatis scelerisque tempus. Diam in
                  massa mattis non. Erat phasellus porta faucibus . massa mattis
                  non.
                </p>
              </div>

              <div className="lg:col-span-2 md:pl-10">
                <h4 className="mb-4 font-semibold text-white text-[22px]">
                  Quick Link
                </h4>
                <ul className="space-y-3 text-[17px]">
                  {quickLinks.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <BiCheck size={14} />
                      <Link
                        href={link.href}
                        className="hover:text-[#FFBB00] transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 md:pl-5">
                <h4 className="mb-4 font-semibold text-white text-[22px]">
                  Quick Link
                </h4>
                <ul className="space-y-3 text-[17px]">
                  {quickLinks2.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <BiCheck size={14} />
                      <Link
                        href={link.href}
                        className="hover:text-[#FFBB00] transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 ">
                <h4 className="mb-4 font-semibold text-white text-[22px]">
                  Quick Link
                </h4>
                <ul className="space-y-3 text-[17px]">
                  {quickLinks3.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <BiCheck size={14} />
                      <Link
                        href={link.href}
                        className="hover:text-[#FFBB00] transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3">
                <h4 className="mb-4 font-semibold text-white text-[22px]">
                  Contact Information
                </h4>
                <ul className="space-y-4 text-[17px]">
                  <li className="flex items-center gap-2">
                    <BiPhone size={16} />
                    <Link
                      href="tel:+917586891753"
                      className="hover:text-[#FFBB00] transition"
                    >
                      +91 98331 23423 / 98331 23423
                    </Link>
                  </li>

                  <li className="flex items-center gap-2">
                    <FaWhatsapp size={16} />
                    <Link
                      href="tel:+917586891753"
                      className="hover:text-[#FFBB00] transition"
                    >
                      +91 98331 23423 / 98331 23423
                    </Link>
                  </li>

                  <li className="flex items-center gap-2">
                    {/* <BiMail size={16} /> */}
                    <Link
                      href="mailto:contact@ganpatirudraksh.com"
                      className="hover:text-[#FFBB00] transition"
                    >
                      contact@ganpatirudraksh.com
                    </Link>
                  </li>

                  <li className="flex items-start gap-2">
                    <BiMapPin size={40} />
                    <Link
                      href="https://maps.app.goo.gl/HDFP8hN6nWyEAaJ6A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FFBB00] transition"
                    >
                      Papia Para, off Eastern Bypass Sadhon More Dabgrame 2,
                      Bhaktinagar, Ghogomali, Siliguri, West Bengal - 734004
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-300 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded bg-white/10 backdrop-blur-md px-6 py-4">
          <div className="flex items-center gap-3">
            <p className="text-white text-sm whitespace-nowrap">We Accept</p>

            <div className="flex items-center gap-2">
              {[
                "/images/visa.png",
                "/images/mastercard.png",
                "/images/rupay.png",
                "/images/upi.png",
              ].map((src) => (
                <div
                  key={src}
                  className="flex items-center justify-center rounded bg-white px-1 py-1"
                >
                  <Image
                    src={src}
                    alt="payment"
                    width={40}
                    height={26}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-white text-sm text-center md:pr-[100px]">
            © Ganpati Rudraksh – 2026 | All Right Reserved
          </p>

          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-gray-100 transition">
                  <Icon size={20} className="text-black" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 py-8 flex items-center justify-center gap-2 text-xs text-gray-400">
        <span className="text-[16px]">Developed By - </span>

        <Link
          href="https://rebootai.in/"
          target="_blank"
          className="inline-flex items-center"
        >
          <Image
            src="/images/reboots.png"
            alt="Raboot AI"
            width={80}
            height={24}
            className="h-4 w-auto object-contain opacity-90 hover:opacity-100 transition"
          />
        </Link>
      </div>
    </footer>
  );
}
