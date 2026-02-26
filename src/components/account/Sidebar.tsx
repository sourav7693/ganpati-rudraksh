"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import { useCustomer } from "@/context/CustomerContext";
import AccountPageRenderer from "./AccountPageRenderer";

const Sidebar = () => {
  const { customer } = useCustomer();
  const pathname = usePathname();
  const sections = [
    {
      title: "Account Settings",
      key: "account",
      links: [
        { href: "/my-account", label: "My Account" },
        { href: "/manage-address", label: "Manage Address" },
      ],
    },
    {
      title: "Your Orders",
      key: "orders",
      links: [
        { href: "/my-orders", label: "My Orders" },
        { href: "/my-wishlist", label: "My Wishlist" },
        { href: "/my-cart", label: "My Cart" },
        { href: "/my-reviews", label: "My Reviews" },
      ],
    },  
  ];

  const [open, setOpen] = useState({
    account: true,
    orders: true,
    payments: true,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let activeSectionKey: string | null = null;

    sections.forEach((section) => {
      const match = section.links.some((link) =>
        pathname.startsWith(link.href),
      );

      if (match) {
        activeSectionKey = section.key;
      }
    });

    if (isMobile) {
      setActivePage(pathname);

      setOpen({
        account: activeSectionKey === "account",
        orders: activeSectionKey === "orders",
        payments: activeSectionKey === "payments",
      });
    } else {
      setOpen({
        account: true,
        orders: true,
        payments: true,
      });
    }
  }, [pathname, isMobile]);

  const linkClass = (href: string) => {
    const isActive = isMobile ? activePage === href : pathname === href;

    return `px-4 py-2 text-sm rounded-md cursor-pointer transition flex items-center
    ${
      isActive
        ? "bg-define-pink text-define-brown font-semibold"
        : "hover:bg-pink-50 text-gray-500"
    }`;
  };

  const isFocusedMobileView = isMobile && activePage;

 return (
  <div className="w-full flex flex-col">
    
    {/* MOBILE FOCUSED VIEW */}
    {isFocusedMobileView ? (
      <>      

        {/* Active Link Highlight */}
        <div className="px-4 py-2 bg-define-pink text-define-brown font-semibold rounded-md">
          {
            sections
              .flatMap((s) => s.links)
              .find((l) => l.href === activePage)?.label
          }
        </div>

        {/* Inline Page */}
        <div className="bg-gray-50 rounded-md mt-3">
          <AccountPageRenderer route={activePage} />
        </div>
      </>
    ) : (
      <>
        {/* NORMAL SIDEBAR VIEW */}

        {/* Profile Header */}
        <div className="bg-define-brown text-white p-4 flex items-center gap-3 shadow rounded-md">
          <div className="size-10 rounded-full overflow-hidden bg-white">
            <Image
              src="/images/profile.png"
              alt="profile"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs opacity-90">Good Morning</p>
            <p className="font-medium leading-tight">{customer?.name}</p>
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.key} className="rounded overflow-hidden">
            <div
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  [section.key]: !prev[section.key as keyof typeof prev],
                }))
              }
              className="w-full flex justify-between items-center px-4 py-3 bg-define-pink text-define-brown font-semibold"
            >
              {section.title}
              <BiChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  open[section.key as keyof typeof open] ? "rotate-180" : ""
                }`}
              />
            </div>

            {open[section.key as keyof typeof open] && (
              <ul className="bg-white text-gray-600 flex flex-col gap-1 p-2">
                {section.links.map((item) => (
                  <li key={item.href}>
                    {!isMobile ? (
                      <Link
                        href={item.href}
                        className={linkClass(item.href)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div
                        onClick={() => setActivePage(item.href)}
                        className={linkClass(item.href)}
                      >
                        {item.label}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </>
    )}
  </div>
);
};

export default Sidebar;
