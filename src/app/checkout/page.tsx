import CheckoutClient from '@/components/extras/CheckoutClient';
import MainTemplate from '@/templates/MainTemplate'
import { Suspense } from 'react'
export const dynamic = 'force-dynamic'; 

const page = () => {
  return (
    <>
          <MainTemplate>
            <Suspense fallback={<div>Loading...</div>}>
            <CheckoutClient/>
            </Suspense>
          </MainTemplate>

    </>
  )
}

export default page