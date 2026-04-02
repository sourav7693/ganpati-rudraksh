import MainTemplate from "@/templates/MainTemplate";
import { Suspense } from "react";
import HomeCategory from "@/components/home/HomeCategory";
import CardSkeleton from "@/ui/CardSkeleton";
import Image from "next/image";
export const dynamic = "force-dynamic";

const page = async () => {
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
      <Suspense
        fallback={
          <div className="py-6">
            <div className="section-container">
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
};

export default page;
