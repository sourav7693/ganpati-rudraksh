import { fetchProducts } from "@/api/product";
import { fetchCategories } from "@/api/category";
import MobileSlider from "@/components/home/MobileSlider";
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
import Image from "next/image";
export const dynamic = "force-dynamic";
const PRODUCT_LIMIT = 10;

const page = async () => {
   const [newProducts, categories] = await Promise.all([
     fetchProducts("sort=-createdAt"),
     fetchCategories(1,100),
   ]);

  const categoryProductPromises = categories.map(async (cat) => {
    const categoryName = cat.parent.name;
    const queryName = categoryName.replace(/\s+/g, "+");

    const res = await fetchProducts(
      `category=${encodeURIComponent(categoryName)}&limit=${PRODUCT_LIMIT}`,
    );
    
    if (res?.data?.length > 0) {
      return {
        category: categoryName,
        queryName,
        products: res.data,
        pagination: res.pagination,
      };
    }

    return null;
  });

  const categoryProducts = (await Promise.all(categoryProductPromises)).filter(
    Boolean,
  );
const firstBatch = categoryProducts.slice(0, 3);
const secondBatch = categoryProducts.slice(3, 6);
const thirdBatch = categoryProducts.slice(6, 9);
const fourthBatch = categoryProducts.slice(9, 12);
const fifthBatch = categoryProducts.slice(12, 15);
  return (
    <MainTemplates>
      <HomeSlider />
      <MobileSlider />
      <HomeSlider2 />
      <HomeCategory
        title="Shop by Categories"
        limit={8}
        page={1}
        enableLazy={false}
      />

      <ProductSection
        title="Newest Product in this Month"
        products={newProducts.data}
        pagination={newProducts.pagination}
        limit={PRODUCT_LIMIT}
        apiQuery="sort=-createdAt"
        enableLazy={false}
      />
      <TalesOfRudraksh />

      {firstBatch.map((item: any) => (
        <ProductSection
          key={item.category}
          {...item}
          title={item.category}
          products={item.products}
          pagination={item.pagination}
          limit={PRODUCT_LIMIT}
          apiQuery={`category=${item.queryName}`}
          enableLazy={false}
        />
      ))}
      <ExpertTeam />
      <OurClients />
      <div className="relative w-full my-8">
        {/* Background Image */}
        <Image
          src="/images/book-bg.avif"
          alt="book-bg"
          width={1440}
          height={550}
          className="w-full h-[500px] md:h-[550px] object-cover"
          priority
        />

        {/* Overlay (dark gradient for readability) */}
        <div className="absolute inset-0 bg-linear-to-r from-black/5 to-black" />

        {/* Content */}
        <div className="absolute top-1/2 -translate-y-1/2 lg:right-0 flex items-center justify-center px-4 md:px-10">
          <div className="text-center max-w-4xl text-white space-y-4 md:space-y-6 lg:text-right">
            <h1 className="text-2xl md:text-4xl  font-bold leading-snug">
              Unlock the Divine Power & Secrets of Rudraksha
            </h1>

            <p className="text-sm md:text-lg lg:text-xl font-medium text-yellow-300">
              Coming Soon – A Complete Spiritual Guide by Ganapati Rudraakshaam
            </p>

            <div className="text-xs md:text-base lg:text-lg space-y-2 md:space-y-3 text-gray-200">
              <p>
                ✨ The true spiritual significance and hidden powers of
                different Rudraksha beads
              </p>
              <p>
                ✨ How to choose the right Rudraksha based on your life goals
                and energies
              </p>
              <p>
                ✨ Ancient Vedic knowledge behind Rudraksha and its divine
                origins
              </p>
              <p>
                ✨ Powerful combinations of Rudraksha for protection, success,
                and inner peace
              </p>
            </div>
          </div>
        </div>
      </div>

      {secondBatch.map((item: any) => (
        <ProductSection
          key={item.category}
          {...item}
          title={item.category}
          products={item.products}
          pagination={item.pagination}
          limit={PRODUCT_LIMIT}
          apiQuery={`category=${item.queryName}`}
          enableLazy={false}
        />
      ))}
      <TitleSection
        title="Why Ganpati Rudraksh"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />

      <Whychoose />
      <VideoGallery />

      {thirdBatch.map((item: any) => (
        <ProductSection
          key={item.category}
          {...item}
          title={item.category}
          products={item.products}
          pagination={item.pagination}
          limit={PRODUCT_LIMIT}
          apiQuery={`category=${item.queryName}`}
          enableLazy={false}
        />
      ))}
      <TitleSection
        title="Explore Popular Categories"
        subtitle="Welcome to The World of Highest-Quality Rudraksha"
      />
      <ImageSection />
      {fourthBatch.map((item: any) => (
        <ProductSection
          key={item.category}
          {...item}
          title={item.category}
          products={item.products}
          pagination={item.pagination}
          limit={PRODUCT_LIMIT}
          apiQuery={`category=${item.queryName}`}
          enableLazy={false}
        />
      ))}
      <PlantsGallery />
      {fifthBatch.map((item: any) => (
        <ProductSection
          key={item.category}
          {...item}
          title={item.category}
          products={item.products}
          pagination={item.pagination}
          limit={PRODUCT_LIMIT}
          apiQuery={`category=${item.queryName}`}
          enableLazy={false}
        />
      ))}
      <FeaturesSection />
      <Blogs />
    </MainTemplates>
  );
};

export default page;
