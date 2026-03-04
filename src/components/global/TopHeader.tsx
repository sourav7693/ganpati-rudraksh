"use client";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegUser, FaSearch, FaWhatsapp } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { useDebounce } from "@/hooks/useDebounce";
import { useCustomer } from "@/context/CustomerContext";
import toast from "react-hot-toast";
import { useGlobalUI } from "@/context/GlobalUIContext";
import LoadingAnimation from "@/ui/LoadingAnimation";
import { NavLinkType } from "./Header";

type SearchItem = {
  type: "product" | "category" | "brand" | "attribute";
  name: string;
  slug?: string;
  image?: string;
};

const TopHeader = ({ navLinks }: { navLinks: NavLinkType[] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  const pathname = usePathname();
  const words = ["Products", "Brands", "Categories"];
  const [query, setQuery] = useState("");
  const [activeWord, setActiveWord] = useState(0);
  const { customer, loading, logoutCustomer, clearCustomer } = useCustomer();
  // console.log("Customer in TopHeader:", customer);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query) return; // stop animation if user types

    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [query]);
  const fetchSuggestions = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/suggestions`,
    );

    const data = await res.json();

    if (data.success) {
      setSuggestions(data.results);
    }
  };

  const rankResults = (items: SearchItem[]) => {
    const priority = {
      product: 1,
      category: 2,
      brand: 3,
      attribute: 4,
    } as Record<string, number>;

    return [...items].sort((a, b) => priority[a.type] - priority[b.type]);
  };

  const handleSearchClick = (item: any) => {
    console.log(item);
    setShow(false);
    if (!item) {
      router.push(`/products?query=${query}`);
      setQuery("");
      return;
    }
    setQuery("");

    setTimeout(() => {
      switch (item.type) {
        case "product":
          router.push(`/product/${item.slug}`);
          break;
        case "category":
          router.push(`/products?category=${encodeURIComponent(item.name)}`);
          break;
        case "brand":
          router.push(`/products?brand=${encodeURIComponent(item.name)}`);
          break;
        case "attribute":
          router.push(`/products?attribute=${encodeURIComponent(item.name)}`);
          break;
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!show) return;

    const list = query ? results : suggestions;
    if (!list.length) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchClick(null);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % list.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick(list[activeIndex]);
    }

    if (e.key === "Escape") {
      setShow(false);
    }
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${debouncedQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResults(data.results);
          setShow(true);
        }
      });
  }, [debouncedQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        inputRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setShow(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  function getName(name = "") {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase() || "";
    }

    return (
      parts[0][0]?.toUpperCase() + parts[parts.length - 1][0]?.toUpperCase()
    );
  }

  const { setShowLoader } = useGlobalUI();
  useEffect(() => {
    setShowLoader(false);
  }, [pathname]);

  const list = query ? results : suggestions;

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShow(false);
  };

  const handleLogoutClick = async () => {
    try {
      //  setShowLoader(true);
      setAccountOpen(false);

      const res = await logoutCustomer();
      // if(res.success){
      toast.success("Logged out successfully!");
      clearCustomer();
      router.push("/");
      // }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      //  setShowLoader(false);
    }
  };

  const handleMobileBack = () => {
    setMobileSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-100 bg-white flex items-center justify-center">
          <LoadingAnimation />
        </div>
      )}
      <div
        className={`fixed md:hidden top-0 left-0 h-full w-[80%] bg-white z-[999]
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="font-semibold">Menu</span>

          <button onClick={() => setMenuOpen(false)}>
            <FiX className="text-2xl text-define-red" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {navLinks?.map((item, idx) => (
            <div key={idx} className="border-b border-gray-200">
              <button
                onClick={() => toggleAccordion(idx)}
                className="flex justify-between items-center text-define-red w-full px-4 py-3 text-left"
              >
                {item.label}

                {item.dropdown && (
                  <FiChevronDown
                    className={`transition-transform ${
                      openAccordion === idx ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.dropdown && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === idx
                      ? "max-h-96 overflow-y-auto no-scrollbar"
                      : "max-h-0"
                  }`}
                >
                  {item.dropdown.map((sub, i) => (
                    <Link
                      key={i}
                      href={sub.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-6 py-2 text-sm hover:bg-gray-100 text-define-brown"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <header className="w-full bg-white">
        <div className="w-full h-[5rem] text-define-brown  flex justify-between items-center px-4 md:px-10 max-w-300 mx-auto z-[60] relative">
          {/* LEFT SIDE */}
          <Link
            className="hover:scale-105 transition-all duration-300 font-medium hidden md:flex items-center gap-2"
            href={"/"}
            target="_blank"
          >
            <div className="size-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,35,0,0)_32.21%,rgba(212,35,0,0.60)_100%)] border border-define-red flex items-center justify-center">
              <FaWhatsapp className="text-define-brown" />
            </div>
            <span className="text-define-brown text-sm">+91 12345 67890</span>
          </Link>

          {/* LOGO */}
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden size-10 rounded-full flex items-center justify-center bg-define-white"
            >
              <FiMenu className="text-define-red size-5" />
            </button>
            <Link href={"/"}>
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={1224}
                height={181}
                priority
                className="w-[10rem] lg:w-[25rem] h-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div ref={inputRef} className="hidden md:flex relative">
              <button
                onClick={() => {
                  setDesktopSearchOpen(true);
                  fetchSuggestions();
                  setShow(true);
                }}
                className={`size-10 rounded-full items-center justify-center bg-define-white ${desktopSearchOpen ? "hidden" : "flex"}`}
              >
                <FaSearch className="text-define-brown size-4" />
              </button>

              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 
    flex items-center bg-white border rounded-full shadow-sm overflow-hidden
    transition-all duration-300 ease-in-out
    ${desktopSearchOpen ? "w-[270px] p-2 opacity-100" : "w-0 px-0 opacity-0"}
    `}
              >
                <div className="relative w-full">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                      if (!query) {
                        fetchSuggestions();
                        setShow(true);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none text-sm relative z-10"
                  />

                  {!query && (
                    <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden text-sm text-gray-400">
                      <span className="mr-1">Search for</span>

                      <div className="relative h-5 overflow-hidden">
                        <div
                          className="transition-transform duration-500 ease-in-out"
                          style={{
                            transform: `translateY(-${activeWord * 20}px)`,
                          }}
                        >
                          {words.map((word, index) => (
                            <div key={index} className="h-5">
                              "{word}"
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setDesktopSearchOpen(false);
                    setQuery("");
                  }}
                  className="ml-2"
                >
                  <IoMdClose className="text-define-brown size-5" />
                </button>
              </div>
              {show && desktopSearchOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-5 w-[320px] rounded-xl bg-white shadow-lg border z-50"
                >
                  {/* Suggestions */}
                  {!query && suggestions.length > 0 && (
                    <>
                      <p className="px-4 py-2 text-xs font-semibold text-define-brown">
                        Suggestions
                      </p>

                      {suggestions.map((item, idx) => (
                        <button
                          key={`suggest-${idx}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSearchClick(item);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left cursor-pointer"
                        >
                          {item.type === "product" && item.image && (
                            <Image
                              src={item.image}
                              alt=""
                              width={32}
                              height={32}
                            />
                          )}

                          <span className="text-sm text-define-brown">
                            <b>{item.name}</b>
                            <span className="ml-2 text-xs text-define-brown">
                              {item.type}
                            </span>
                          </span>
                        </button>
                      ))}
                    </>
                  )}

                  {/* Results */}
                  {query && results.length > 0 && (
                    <>
                      <p className="px-4 py-2 text-xs font-semibold text-gray-500">
                        Results
                      </p>

                      {results.map((item, idx) => (
                        <button
                          key={`result-${idx}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSearchClick(item);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left cursor-pointer"
                        >
                          {item.type === "product" && item.image && (
                            <Image
                              src={item.image}
                              alt=""
                              width={32}
                              height={32}
                            />
                          )}

                          <span className="text-sm text-gray-500">
                            <b>{item.name}</b>
                            <span className="ml-2 text-xs text-gray-500">
                              {item.type}
                            </span>
                          </span>
                        </button>
                      ))}
                    </>
                  )}

                  {/* No Results */}
                  {query && results.length === 0 && (
                    <p className="px-4 py-3 text-sm text-gray-400">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex md:hidden">
              {!mobileSearchOpen && (
                <button
                  onClick={() => setMobileSearchOpen(true)}
                  className="size-10 rounded-full flex items-center justify-center bg-define-white"
                >
                  <FaSearch className="text-define-brown size-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                router.push("/my-cart");
              }}
              className="size-10 rounded-full flex items-center justify-center bg-define-white"
            >
              <div className="relative">
                <MdAddShoppingCart className="text-define-brown size-5" />
                <span className="absolute -top-3 -right-4 size-4 rounded-full bg-defined-green text-[10px] font-bold bg-define-brown text-white flex items-center justify-center">
                  {customer?.cart?.length ?? 0}
                </span>
              </div>
            </button>

            {/* USER ICON SECTION */}
            {!customer ? (
              <div className="relative">
                <Link
                  href="/login"
                  className={`flex items-center gap-2 bg-define-brown text-white px-2 lg:px-3 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:scale-105
        ${!loading ? "animate-shake" : ""}
      `}
                >
                  <FaRegUser className="size-4" />
                  <span className="hidden lg:block">Login</span>
                </Link>
              </div>
            ) : (
              /* If logged in → show dropdown */
              <div
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
                className="relative z-50"
              >
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="size-10 rounded-full flex items-center justify-center bg-define-white"
                >
                  <div className="size-7 rounded-full bg-define-brown text-white flex items-center justify-center text-xs font-semibold">
                    {getName(customer?.name || "User")}
                  </div>
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full w-44">
                    <div className="rounded-md bg-white shadow-lg border-linear-to-r from-define-brown to-define-red shadow-define-brown/30 transition-all duration-300 hover:from-define-red hover:to-define-brown hover:shadow-lg hover:shadow-define-red/40 overflow-hidden">
                      <Link
                        href="/my-account"
                        className="block px-4 py-3 text-sm text-defined-green hover:bg-define-red/20 border-b border-gray-200"
                      >
                        My Account
                      </Link>

                      <Link
                        href="/my-orders"
                        className="block px-4 py-3 text-sm text-defined-green hover:bg-define-red/20 border-b border-gray-200"
                      >
                        My Orders
                      </Link>

                      <Link
                        href="/my-wishlist"
                        className="block px-4 py-3 text-sm text-defined-green hover:bg-define-red/20 border-b border-gray-200"
                      >
                        My Wishlist
                      </Link>

                      <Link
                        href="/my-cart"
                        className="block px-4 py-3 text-sm text-defined-green hover:bg-define-red/20 border-b border-gray-200"
                      >
                        My Cart
                      </Link>

                      <div className="p-2">
                        {" "}
                        <button
                          onClick={handleLogoutClick}
                          className="w-full px-3 py-2 text-sm text-center border border-define-red text-define-red hover:bg-define-red/20"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={`md:hidden relative transition-all duration-300 ease-in-out bg-white border-b border-gray-200
        ${mobileSearchOpen ? "opacity-100" : "hidden opacity-0"}`}
        >
          {mobileSearchOpen && (
            <>
              <div className="flex items-center gap-2 px-4">
                {/* Back Button */}
                <button onClick={handleMobileBack}>
                  <IoMdArrowBack className="size-6 text-define-brown" />
                </button>

                {/* Input */}
                <div className="relative w-full">
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                      if (!query) {
                        fetchSuggestions();
                        setShow(true);
                      }
                    }}
                    className="w-full bg-transparent outline-none text-sm relative z-10 flex-1 border rounded-full px-4 py-2"
                  />

                  {!query && (
                    <div className="absolute left-4 top-2 flex items-center pointer-events-none overflow-hidden text-sm text-gray-400">
                      <span className="mr-1">Search for</span>

                      <div className="relative h-5 overflow-hidden">
                        <div
                          className="transition-transform duration-500 ease-in-out"
                          style={{
                            transform: `translateY(-${activeWord * 20}px)`,
                          }}
                        >
                          {words.map((word, index) => (
                            <div key={index} className="h-5">
                              "{word}"
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Button */}
                {query.length > 0 && (
                  <button onClick={handleClear}>
                    <IoMdClose className="size-6 text-define-brown" />
                  </button>
                )}
              </div>

              {show && mobileSearchOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 w-full px-4 z-[999] "
                >
                  <div className="rounded-xl bg-white shadow-lg border max-h-[300px] overflow-y-auto">
                    {list.map((item, idx) => (
                      <button
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSearchClick(item);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-define-red/20 text-sm"
                      >
                        <b>{item.name}</b>
                        <span className="ml-2 text-xs text-gray-400">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
    </>
  );
};

export default TopHeader;
