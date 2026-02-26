"use client";

import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  id: number;
  name: string;
  price?: number;
  image: string;
  category?: string;
  tag?: string;
  href: string; // all category page link
};

export default function CategoryCard({
  name,
  image,
  category,
  tag,
  href,
}: CategoryCardProps) {
  return (
    <div className="rounded">
      
      <Link href='/category'>
      
      <div className="relative h-[60px] md:h-[110px] overflow-hidden rounded-[20px]">
        {tag && (
          <span className="absolute left-2 top-2 rounded-full px-3 py-1 text-xs text-white bg-red-500 z-10">
            {tag}
          </span>
        )}

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-2 md:p-4">
       
        {category && (
          <p className="text-center text-[10px] md:text-sm text-define-brown font-medium">
            {category}
          </p>
        )}

       
      </div>
      
      </Link>

    </div>
  );
}
