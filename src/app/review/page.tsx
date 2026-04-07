import { api } from "@/api/customer";
import ReviewPage from "@/components/account/Review";
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
    const res = await api.get(`/product/${product}`);

    if (!res.status || res.status !== 200) throw new Error("Product fetch failed");

    productDetails = res.data; 
  } catch (error) {
    console.error("Product fetch failed:", error);
  }

  if (!product || !productDetails) {
    return (
      <MainTemplate>
        <div className="p-5 text-center text-define-red">Invalid product</div>
      </MainTemplate>
    );
  }

  return (
    <MainTemplate>
      <ReviewPage productDetails={productDetails} />
    </MainTemplate>
  );
};

export default page;