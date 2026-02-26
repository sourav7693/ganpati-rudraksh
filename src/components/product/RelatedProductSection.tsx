"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ProductType } from "@/types/types";
import ProductCard from "@/ui/ProductCard";
import { fetchRelatedProducts } from "@/api/product";

export default function RelatedProductSection({ slug }: { slug: string }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      const data = await fetchRelatedProducts(slug);
      if (data?.success) {
        setProducts(data.data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading || products.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl lg:text-3xl font-semibold text-define-brown mb-4">
        Related Products
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1250: { slidesPerView: 4 },
          2400: { slidesPerView: 5 },
        }}
      >
        {products.map((p, index) => (
          <SwiperSlide key={p._id} className=" ">
            <ProductCard
              key={`${p._id}-${index}`}
              _id={p._id}
              name={p.name}
              price={p.price}
              coverImage={p.coverImage}
              mrp={p.mrp}
              discount={p.discount}
              slug={p.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
