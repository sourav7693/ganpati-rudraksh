import Orders from '@/components/account/Orders'
import LoadingAnimation from '@/ui/LoadingAnimation'
import { Suspense } from 'react'
const page = () => {
  return (
    <div className="h-screen flex">
      <Suspense fallback={<LoadingAnimation />}>
        <Orders />
      </Suspense>
    </div>
  );
}

export default page