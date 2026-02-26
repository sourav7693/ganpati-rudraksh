import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

const Header = () => {
  const navLinks = [
    {
      label: "Shop For Rudraksha",
      dropdown: [
        { name: "1 Mukhi", href: "#" },
        { name: "5 Mukhi", href: "#" },
        { name: "7 Mukhi", href: "#" },
      ],
    },
    {
      label: "Puja Services",
      dropdown: [
        { name: "Rudraksha Puja", href: "#" },
        { name: "Grah Shanti", href: "#" },
      ],
    },
    {
      label: "Rudraksha Anushthan",
      dropdown: [
        { name: "Rudraksha Archya", href: "#" },
        { name: "Grah Shanti", href: "#" },
      ],
    },
    {
      label: "Accessories",
      dropdown: [
        { name: "Chains", href: "#" },
        { name: "Bracelets", href: "#" },
      ],
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
      dropdown: [
        { name: "Astrology", href: "#" },
        { name: "Vastu", href: "#" },
      ],
    },
  ];
  return (
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

                <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
              </Link>

              {/* DROPDOWN */}
              <div
                className="
                  absolute left-0 top-full mt-3 w-56
                  bg-white border border-gray-200 shadow-lg rounded-md
                  opacity-0 invisible translate-y-2
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-300 ease-in-out
                  z-50
                "
              >
                <ul className="py-2 text-sm">
                  {item.dropdown.map((dropItem, dropIdx) => (
                    <li key={dropIdx}>
                      <Link
                        href={dropItem.href}
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {dropItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
