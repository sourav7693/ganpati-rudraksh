import { fetchProducts } from "@/api/product";
import Blogs from "@/components/home/Blogs";
import ExpertTeam from "@/components/home/ExpertTeam";
import FeaturesSection from "@/components/home/FeaturesSection";
import HomeCategory from "@/components/home/HomeCategory";
import HomeSlider from "@/components/home/HomeSlider";
import HomeSlider2 from "@/components/home/HomeSlider2";
import ImageSection from "@/components/home/ImageSection";
import OurClients from "@/components/home/OurClients";
import PlantsGallery from "@/components/home/PlantGallery";
import ProductSection from "@/components/home/ProductSection";
import TalesOfRudraksh from "@/components/home/TalesOfRudraksh";
import TitleSection from "@/components/home/TitleSection";
import VideoGallery from "@/components/home/VideoGallery";
import { Whychoose } from "@/components/home/Whychoose";
import MainTemplates from "@/templates/MainTemplate";
export const dynamic = "force-dynamic";
const PRODUCT_LIMIT = 10;

const page = async () => {
  const newProducts = await fetchProducts("sort=-createdAt");
    const rudra1Mukhi = await fetchProducts(
      "category=1+Mukhi+Rudraksha",
    );
    // const flowerPlantsroducts = await fetchProducts("category=Flower+Plants");
  return (
    <MainTemplates>
      <HomeSlider />
      <HomeSlider2 />
      <HomeCategory
        title="Shop by Categories"
        limit={8}
        page={1}
        enableLazy={false}
      />

      <TalesOfRudraksh />

      <TitleSection
        title="All Products"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />

      <ProductSection
        title="Newest Product in this Month"
        products={newProducts.data}
        pagination={newProducts.pagination}
        limit={PRODUCT_LIMIT}
        apiQuery="sort=-createdAt"
        enableLazy={false}
      />
      <ExpertTeam />
      <OurClients />
      <ProductSection
        title="1 Mukhi Rudraksha"
        products={rudra1Mukhi.data}
        pagination={rudra1Mukhi.pagination}
        limit={PRODUCT_LIMIT}
        apiQuery="sort=1+Mukhi+Rudraksha"
        enableLazy={false}
      />

      <TitleSection
        title="Why Ganpati Rudraksh"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />

      <Whychoose />
      <VideoGallery />

      <TitleSection
        title="Explore Popular Categories"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />
      <ImageSection />
      <FeaturesSection />
      <PlantsGallery />
      <Blogs />
    </MainTemplates>
  );
};

export default page;
