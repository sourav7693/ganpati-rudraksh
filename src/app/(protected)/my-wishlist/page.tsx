import WishList from "@/components/account/WishList"
import LoadingAnimation from "@/ui/LoadingAnimation";
import { Suspense } from "react";

const WishlistListPage = () => {
  return (
    <div className="h-screen flex">
        <Suspense fallback={<LoadingAnimation />}>
          <WishList />
        </Suspense>     
    </div>
  );
}

export default WishlistListPage