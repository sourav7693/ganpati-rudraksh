import MainTemplate from "@/templates/MainTemplate";
import HomeSlider from "@/components/home/HomeSlider";
import TitleSection from "@/components/home/TitleSection";
import ImageSection from "@/components/home/ImageSection";
import CategoryPage from "@/components/category/CategoryPage";
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
      <HomeSlider />      
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
