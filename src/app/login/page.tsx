import Login from '@/components/auth/Login'
import MainTemplate from '@/templates/MainTemplate'
import { Suspense } from 'react';


const page = () => {
  return (
    <MainTemplate>
      <Suspense fallback={<div className="p-10">Loading...</div>}>
        <Login />
      </Suspense>
    </MainTemplate>
  );
}

export default page