import CartList from "@/components/account/CartList"
import LoadingAnimation from "@/ui/LoadingAnimation";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="h-screen flex">
      <Suspense fallback={<LoadingAnimation />}>
        <CartList />
      </Suspense>
    </div>
  );
}

export default page