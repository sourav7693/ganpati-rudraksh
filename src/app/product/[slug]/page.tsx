import { fetchProductBySlug } from "@/api/product";
import { ProductType } from "@/types/types";
import { Metadata } from "next";
import MainTemplates from "@/templates/MainTemplate";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProductSection from "@/components/product/RelatedProductSection";

export const dynamic = "force-dynamic";
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim(); // Trim whitespace
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Product not found");

    const product = await res.json();

    return {
      title: product.name,
      description: stripHtmlTags(product.shortDescription),
      openGraph: {
        title: product.name,
        description: stripHtmlTags(product.shortDescription),
        images: [
          {
            url: product.coverImage.url,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: stripHtmlTags(product.shortDescription),
        images: [product.coverImage.url],
      },
    };
  } catch (error) {
    console.error("Metadata generation failed:", error);

    // Return fallback metadata if product fetch fails
    return {
      title: "Ganapati Rudrakash - Premium Rudraksh Supplies",
      description:
        "Find the perfect Rudraksh at Ganapati Rudrakash.",
    };
  }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
     const { slug } = await params;
     let product: ProductType | null = null;
     product = await fetchProductBySlug(slug);

     if (!product) {
       return (
         <MainTemplates>
           <h2 className="text-center text-red-500 py-20 text-xl">
             Product Not Found
           </h2>
         </MainTemplates>
       );
     }
  return (
    
    <MainTemplates>
      <section className="max-w-300 mx-auto px-4 md:py-10  flex flex-col gap-8">
        <ProductDetails product={product} />
        <div className="w-full max-md:mb-6">
          <RelatedProductSection slug={product.slug} />
        </div>
      </section>
    </MainTemplates>
  );
};

export default page