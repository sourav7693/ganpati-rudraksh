import MainTemplate from "@/templates/MainTemplate"
import HomeSlider from "@/components/home/HomeSlider"
import HomeSlider2 from "@/components/home/HomeSlider2"
import { Suspense } from "react";
import HomeCategory from "@/components/home/HomeCategory";
import CardSkeleton from "@/ui/CardSkeleton";
export const dynamic = "force-dynamic";

 const page = async () => {
  return (
    <MainTemplate>
      <HomeSlider />
      <HomeSlider2 />
      <Suspense
        fallback={
          <div className="py-6">
            <div className="mx-auto max-w-300 px-4">
              <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        }
      >        
          <HomeCategory limit={8} enableLazy={true} />       
      </Suspense>
    </MainTemplate>
  );
}

export default page