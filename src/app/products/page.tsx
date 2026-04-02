import MainTemplate from "@/templates/MainTemplate";
import TitleSection from "@/components/home/TitleSection";
import ImageSection from "@/components/home/ImageSection";
import CategoryPage from "@/components/category/CategoryPage";
import Image from "next/image";
export const dynamic = "force-dynamic";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    attribute?: string;
    query?: string;
  }>;
}) => {
  const { category, brand, attribute, query } = await searchParams;

  return (
    <MainTemplate>      
       <div className="w-full h-auto pb-6">
              <Image
                src="/slider/subbanner.webp"
                alt="Sub Banner"
                width={1200}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
      <CategoryPage
        activeCategory={category || ""}
        activeBrand={brand || ""}
        activeAttribute={attribute || ""}
        searchQuery={query || ""}
      />
      <TitleSection
        title="Explore Popular Categories"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />
      <ImageSection />
    </MainTemplate>
  );
};

export default page;
