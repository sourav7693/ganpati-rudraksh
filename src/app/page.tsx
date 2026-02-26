import { fetchProducts } from "@/api/product";
import FeaturesSection from "@/components/home/FeaturesSection";
import HomeCategory from "@/components/home/HomeCategory";
import HomeSlider from "@/components/home/HomeSlider";
import HomeSlider2 from "@/components/home/HomeSlider2";
import ImageSection from "@/components/home/ImageSection";
import OurClients from "@/components/home/OurClients";
import ProductSection from "@/components/home/ProductSection";
import TitleSection from "@/components/home/TitleSection";
import { Whychoose } from "@/components/home/Whychoose";
import MainTemplates from "@/templates/MainTemplate";
export const dynamic = "force-dynamic";
const PRODUCT_LIMIT = 10;

const page = async () => {
  const newProducts = await fetchProducts("sort=-createdAt");
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

      <TitleSection
        title="Our Clients"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />

      <OurClients />
      <TitleSection
        title="Why Ganpati Rudraksh"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />
      <Whychoose />

      <TitleSection
        title="Explore Popular Categories"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />
      <ImageSection />
      <FeaturesSection/>
    </MainTemplates>
  );
};

export default page;
