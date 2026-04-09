import CartList from "@/components/account/CartList"
import LoadingAnimation from "@/ui/LoadingAnimation";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingAnimation />}>
        <CartList />
      </Suspense>
    </div>
  );
}

export default page