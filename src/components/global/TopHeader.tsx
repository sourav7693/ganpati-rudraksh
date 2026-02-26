"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegUser, FaSearch, FaWhatsapp } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { useDebounce } from "@/hooks/useDebounce";
import { useCustomer } from "@/context/CustomerContext";
import toast from "react-hot-toast";

const TopHeader = () => {  
   const { customer, loading, logoutCustomer, clearCustomer } = useCustomer();
  console.log("Customer in TopHeader:", customer);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedQuery = useDebounce(searchText, 400);
    const [results, setResults] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const router = useRouter();    
    const [accountOpen, setAccountOpen] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchSuggestions = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search/suggestions`,
      );

      const data = await res.json();

      if (data.success) {
        setSuggestions(data.results);
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

    const list = searchText ? results : suggestions;


 const handleClear = () => {
   setSearchText("");
   setResults([]);
   setShow(false);
 };

 const handleLogoutClick = async () => {
   try {
    //  setShowLoader(true);
     setAccountOpen(false);     

     const res = await logoutCustomer();
    // if(res.success){
      toast.success( "Logged out successfully!");
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
    setSearchText("");
  };    
  return (
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

        {/* RIGHT ICONS */}
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
    ${desktopSearchOpen ? "w-[320px] p-2 opacity-100" : "w-0 px-0 opacity-0"}
    `}
            >
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => {
                  if (!searchText) {
                    fetchSuggestions();
                    setShow(true);
                  }
                }}
                placeholder="Search for Products, Brands, Categories"
                className="w-full bg-transparent outline-none text-sm"
              />

              <button
                onClick={() => {
                  setDesktopSearchOpen(false);
                  setSearchText("");
                }}
                className="ml-2"
              >
                <IoMdClose className="text-define-brown size-5" />
              </button>
            </div>
            {show && desktopSearchOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-3 w-[320px] rounded-xl bg-white shadow-lg border z-50"
              >
                {/* Suggestions */}
                {!searchText && suggestions.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500">
                      Suggestions
                    </p>

                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onMouseDown={(e) => e.preventDefault()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <b>{item.name}</b>
                        <span className="ml-2 text-xs text-gray-400">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </>
                )}

                {/* Results */}
                {searchText && results.length > 0 && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500">
                      Results
                    </p>

                    {results.map((item, idx) => (
                      <button
                        key={idx}
                        onMouseDown={(e) => e.preventDefault()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <b>{item.name}</b>
                        <span className="ml-2 text-xs text-gray-400">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </>
                )}

                {/* No Results */}
                {searchText && results.length === 0 && (
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
            /* If NOT logged in → show Login link */
            <Link
              href="/login"
              className="size-10 rounded-full flex items-center justify-center bg-define-white"
            >
               <FaRegUser className="text-define-brown size-5" />
            </Link>
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
                  {getName(customer?.name || "")}
                </div>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full w-44">
                  <div className="rounded-md bg-white shadow-lg border border-gray-200 overflow-hidden">
                    <Link
                      href="/my-account"
                      className="block px-4 py-3 text-sm text-defined-green hover:bg-gray-100"
                    >
                      My Account
                    </Link>

                    <Link
                      href="/my-orders"
                      className="block px-4 py-3 text-sm text-defined-green hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <Link
                      href="/my-wishlist"
                      className="block px-4 py-3 text-sm text-defined-green hover:bg-gray-100"
                    >
                      My Wishlist
                    </Link>

                    <Link
                      href="/my-cart"
                      className="block px-4 py-3 text-sm text-defined-green hover:bg-gray-100"
                    >
                      My Cart
                    </Link>

                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
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
              <input
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => {
                  if (!searchText) {
                    fetchSuggestions();
                    setShow(true);
                  }
                }}
                placeholder="Search for Products, Brands, Categories"
                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
              />

              {/* Clear Button */}
              {searchText.length > 0 && (
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
                      onMouseDown={(e) => e.preventDefault()}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
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
  );
};

export default TopHeader;
