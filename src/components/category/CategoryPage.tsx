"use client";

import ProductCard from "@/ui/ProductCard";
import CategorySidebar from "./CategorySidebar";
import { ProductType } from "@/types/types";
import { useCategories } from "@/context/CategoryContext";
import { useMemo, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CardSkeleton from "@/ui/CardSkeleton";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";

export default function CategoryPage({
  activeCategory,
  activeBrand,
  activeAttribute,
  searchQuery,
}: {
  activeCategory: string;
  activeBrand: string;
  activeAttribute: string;
  searchQuery: string;
}) {
  const { categories } = useCategories();
  const [sortBy, setSortBy] = useState<
    "popularity" | "low-high" | "high-low" | "newest"
  >("popularity");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const LIMIT = 10;
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // const [isSearching, setIsSearching] = useState(false);
  console.log(products);

  const sortArr = [
    {
      name: "Popularity",
      type: "popularity",
    },
    {
      name: "Price : Low to High",
      type: "low-high",
    },
    {
      name: "Price : High to Low",
      type: "high-low",
    },
    {
      name: "Newest First",
      type: "newest",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProducts = async (pageNumber = 1) => {
    if (pageNumber === 1) {
      setLoading(true);
    } else {
      setFetchingMore(true);
    }

    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/product?status=Active`,
      );
      url.searchParams.set("page", String(pageNumber));
      url.searchParams.set("limit", String(LIMIT));

      if (activeCategory) {
        url.searchParams.append("category", activeCategory);
      }

      if (activeBrand) {
        url.searchParams.append("brand", activeBrand);
      }

      if (activeAttribute) {
        url.searchParams.append("attribute", activeAttribute);
      }

      if (debouncedSearch.trim()) {
        url.searchParams.append("q", debouncedSearch.trim());
      }

      const res = await fetch(url.toString(), { cache: "no-store" });
      const data = await res.json();
      const newProducts = data?.data || [];
      const totalPages = data?.pagination?.totalPages || 1;

      if (pageNumber === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNew = newProducts.filter(
            (p: ProductType) => !existingIds.has(p._id),
          );
          return [...prev, ...uniqueNew];
        });
      }

      setHasMore(pageNumber < totalPages);
    } catch (error) {
      console.error(error);
      if (pageNumber === 1) setProducts([]);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts([]);
    fetchProducts(1);
  }, [activeCategory, activeBrand, activeAttribute, debouncedSearch]);

  useEffect(() => {
    // Only fetch if looking at bottom, not currently loading, and has more data
    if (inView && !loading && !fetchingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  }, [inView, loading, fetchingMore, hasMore]);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sortBy) {
      case "low-high":
        return items.sort((a, b) => a.price - b.price);

      case "high-low":
        return items.sort((a, b) => b.price - a.price);

      case "newest":
        return items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      default:
        return items.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
    }
  }, [products, sortBy]);

  const sortBtnClass = (type: string) =>
    `rounded-full border border-define-red px-4 py-1 text-xs transition ${
      sortBy === type
        ? "bg-define-red text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <section className="md:py-8 max-w-300 px-4 mx-auto flex flex-col">
      <div className="flex justify-between items-start mb-4 p-2 min-h-[50rem]">
        {/* SIDEBAR */}
        <div className="w-[20%] lg:w-[10%] bg-white h-full">
          <CategorySidebar categories={categories} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-[90%] flex flex-col h-full">
          <div className="md:hidden flex  items-center  md:px-0">
            <div className="relative w-fit rounded border border-gray-200 bg-white">
              {/* 1. Icons are now visually 'under' the select, but visible because select is transparent */}

              {/* Left Icon */}
              <IoFilterSharp
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              {/* 2. The Select: bg-transparent, z-10 (on top), and cursor-pointer */}
              <select
                name="filter"
                // Add value prop to make it a controlled component (Recommended)
                // value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="relative z-10 w-full appearance-none bg-transparent py-1 pl-9 pr-8 text-sm text-gray-600 outline-none cursor-pointer"
              >
                <option value="" hidden>
                  Sort By
                </option>
                {sortArr.map((item) => (
                  <option key={item.type} value={item.type}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Right Icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MdKeyboardDoubleArrowDown />
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-wrap items-center gap-3 rounded bg-white p-4 shadow-sm">
            <span className="text-sm text-gray-600">Sort By</span>

            {sortArr.map((item) => (
              <button
                key={item.type}
                className={sortBtnClass(item.type)}
                onClick={() => setSortBy(item.type as typeof sortBy)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1 md:gap-4  lg:grid-cols-4 xxl:grid-cols-4 bg-white">
            {loading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
                <ProductCard key={item._id} {...item} _id={item._id} />
              ))
            ) : (
              <p className="col-span-full text-center py-20 text-gray-500">
                No products found
              </p>
            )}
          </div>

          {!loading && hasMore && (
            <div ref={ref} className="grid grid-cols-3 gap-4">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
