import ShowReview from '@/components/account/ShowReview';
import LoadingAnimation from '@/ui/LoadingAnimation'
import { Suspense } from 'react'
const page = () => {
  return (
    <div className="h-screen flex">
      <Suspense fallback={<LoadingAnimation />}>
        <ShowReview />
      </Suspense>
    </div>
  );
}

export default page