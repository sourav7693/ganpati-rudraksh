"use client";
import { useCategoryList } from "@/hooks/useCategoryList";
import CardSkeleton from "@/ui/CardSkeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface HomeCategoryProps {
  title?: string;
  limit?: number;
  page?: number;
  enableLazy?: boolean;
}

export default function HomeCategory({
  title = "Shop by Categories",
  limit = 8,
  enableLazy = false,
  page = 1,
}: HomeCategoryProps) {
  const pathname = usePathname();
  const isCategoryPage = pathname === "/categories";

  const { categories, loading, loadingMore, hasMore, loadMore } =
    useCategoryList({
      initialLimit: limit,
      initialPage: page,
      isInfinite: enableLazy || isCategoryPage,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadingMore, loadMore]);

  if (loading) {
    return (
      <div className="py-5">
        <div className="mx-auto 2xl:max-w-360 lg:max-w-300 px-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 18 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pb-2">
      <div className="mx-auto 2xl:max-w-360 lg:max-w-300 px-4 flex flex-col gap-4 lg:gap-8">
        <div className="flex justify-between items-center">
          <h2 className=" lg:text-2xl text-center lg:text-left font-bold text-define-black">
            {title}
          </h2>
          {!isCategoryPage && (
            <div className="mt-2 flex items-center justify-end">
              <Link
                href="/categories"
                className="text-[15px] md:text-[18px] font-medium text-define-brown"
              >
                See All →
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 place-items-stretch justify-items-stretch gap-2">
          {categories.map((cat, index) => (
            <React.Fragment key={`${cat.parent.id}-${index}`}>
              <Link
                href={`/products?category=${encodeURIComponent(cat.parent.name)}`}
                className="text-center group"
              >
                <div className="relative mx-auto size-[4rem] lg:size-[7rem] overflow-hidden rounded-md bg-gray-300">
                  <Image
                    src={cat.parent.image}
                    alt={cat.parent.name}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                  />
                </div>

                <p className=" mt-2 lg:mt-4 text-define-brown font-medium text-xs sm:text-sm lg:text-sm">
                  {cat.parent.name}
                </p>
              </Link>

              {cat.subCategories.map(
                (subCat: { id?: string; name: string; image: string }) => (
                  <Link
                    key={subCat.id ?? subCat.name}
                    href={`/products?category=${encodeURIComponent(subCat.name)}`}
                    className="text-center group"
                  >
                    <div className="relative mx-auto size-[4rem] lg:size-[7rem] overflow-hidden rounded-md bg-gray-300">
                      <Image
                        src={subCat.image}
                        alt={subCat.name}
                        fill
                        className="object-cover group-hover:scale-110 transition"
                      />
                    </div>

                    <p className="mt-2 lg:mt-4 text-define-brown font-medium text-xs sm:text-sm lg:text-sm">
                      {subCat.name}
                    </p>
                  </Link>
                ),
              )}
            </React.Fragment>
          ))}

          {loadingMore && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>

        {(enableLazy || isCategoryPage) && hasMore && (
          <div
            ref={ref}
            className="w-full h-10 mt-4 flex justify-center items-center"
          ></div>
        )}

        {(enableLazy || isCategoryPage) &&
          !hasMore &&
          categories.length > 0 && (
            <p className="text-center text-gray-400 text-sm mt-8"></p>
          )}
      </div>
    </section>
  );
}
