import ReviewPage from "@/components/account/Review"
import MainTemplate from "@/templates/MainTemplate";
import { ProductType } from "@/types/types";
export const dynamic = "force-dynamic";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    product?: string;
  }>;
}) => {
  const { product } = await searchParams;
  let productDetails: ProductType | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${product}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Product not found");

    const data = await res.json();
    productDetails = data;
  } catch (error) {
    console.error("Product fetch failed:", error);
  }

  if (!product) {
    return (
      <MainTemplate>
        <div className="p-5 text-center text-define-red">Invalid product</div>
      </MainTemplate>
    );
  }

  return (
    <>
      <MainTemplate>
        <ReviewPage productDetails={productDetails} />
      </MainTemplate>
    </>
  );
};

export default page;
