import { fetchProductBySlug, fetchFullProduct } from "@/api/product";
import { ProductType } from "@/types/types";
import { Metadata } from "next";
import MainTemplates from "@/templates/MainTemplate";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProductSection from "@/components/product/RelatedProductSection";
import { api } from "@/api/customer";

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
    const product = await fetchProductBySlug(slug);

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
      description: "Find the perfect Rudraksh at Ganapati Rudrakash.",
    };
  }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const fullProduct = await fetchFullProduct(slug);

  if (!fullProduct) {
    return (
      <MainTemplates>
        <h2 className="text-center text-red-500 py-20 text-xl">
          Product Not Found
        </h2>
      </MainTemplates>
    );
  }
    <MainTemplates>
      <section className="2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto px-4 md:py-10  flex flex-col gap-8">
        <ProductDetails 
          product={fullProduct.selectedProduct} 
          initialVariants={fullProduct.variants}
          initialVariantOptions={fullProduct.variantOptions}
        />
        <div className="w-full max-md:mb-6">
          <RelatedProductSection slug={fullProduct.selectedProduct.slug} />
        </div>
      </section>
    </MainTemplates>
};

export default page;
