"use client";

import { CategoryUI, fetchCategories } from "@/api/category";
import TopHeader from "./TopHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export type NavLinkType = {
  label: string;
  dropdown?: { name: string; href: string }[];
};

const Header = () => {
  const [accessories, setAccessories] = useState<
    { name: string; href: string }[]
  >([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data: CategoryUI[] = await fetchCategories();

        const mapped = data.map((cat) => ({
          name: cat.parent.name,
          href: `/products?category=${cat.parent.name}`,
        }));

        setAccessories(mapped);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }

    loadCategories();
  }, []);

  const navLinks: NavLinkType[] = [
    {
      label: "Shop For Rudraksha",
      dropdown: [
        { name: "1 Mukhi Rudra", href: "#" },
        { name: "2 Mukhi Rudra", href: "#" },
        { name: "3 Mukhi Rudra", href: "#" },
        { name: "4 Mukhi Rudra", href: "#" },
        { name: "5 Mukhi Rudra", href: "#" },
        { name: "6 Mukhi Rudra", href: "#" },
        { name: "7 Mukhi Rudra", href: "#" },
        { name: "8 Mukhi Rudra", href: "#" },
        { name: "9 Mukhi Rudra", href: "#" },
        { name: "10 Mukhi Rudra", href: "#" },
        { name: "11 Mukhi Rudra", href: "#" },
        { name: "12 Mukhi Rudra", href: "#" },
        { name: "12 Mukhi Rudra", href: "#" },
        { name: "12 Mukhi Rudra", href: "#" },
        { name: "12 Mukhi Rudra", href: "#" },
      ],
    },
    {
      label: "Puja Services",
      dropdown: [
        { name: "Special Puja", href: "#" },
        { name: "Path and Katha", href: "#" },
        { name: "Festival & Occassions", href: "#" },
      ],
    },
    {
      label: "Rudraksha Anushthan",
      dropdown: [{ name: "Rudraksha Archya", href: "#" }],
    },
    {
      label: "Accessories",
      dropdown: accessories,
    },
    {
      label: "About Ganpati Rudraksh",
      dropdown: [
        { name: "Our Story", href: "#" },
        { name: "Certifications", href: "#" },
      ],
    },
    {
      label: "Free Consultation",
    },
  ];

  return (
    <>
      <TopHeader navLinks={navLinks} />

      {/* DESKTOP NAV */}
      <header className="hidden md:block border border-gray-200 bg-white">
        <div className="mx-auto max-w-300 px-4">
          <nav className="flex justify-between py-4 text-gray-700 font-medium">
            {navLinks.map((item, idx) => (
              <div key={idx} className="relative group">
                <Link
                  href="#"
                  className="flex items-center gap-1 hover:text-black transition-colors duration-300"
                >
                  {item.label}

                  {item.dropdown && item.dropdown.length > 0 && (
                    <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {item.dropdown && item.dropdown.length > 0 && (
                  <div
                    className="
                    absolute -left-1/4 top-full mt-3 w-[500px]
                    bg-white border border-gray-200 shadow-lg rounded-md
                    opacity-0 invisible translate-y-2
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-300 ease-in-out
                    z-50
                  "
                  >
                    <ul className="py-2 text-sm grid grid-cols-3">
                      {item.dropdown.map((dropItem, dropIdx) => (
                        <li key={dropIdx}>
                          <Link
                            href={dropItem.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {dropItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
