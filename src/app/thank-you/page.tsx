import Link from "next/link";
import { redirect } from "next/navigation";
import { BiCheckCircle } from "react-icons/bi";
export const dynamic = 'force-dynamic'; 
export default async function page({
  searchParams,
}: {
 searchParams: Promise<{
    payment?: string;
    order?: string;
  }>;
}) {
   const { payment, order } = await searchParams;

  if (!payment || !order) {
    redirect("/");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 sm:py-14">
      <div
        className="
            bg-white border border-gray-200 rounded-xl shadow-lg
            w-full max-w-sm sm:max-w-md
            text-center
            p-6 sm:p-8
          "
      >
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <BiCheckCircle
            size={64}
            className="text-define-red sm:w-[72px] sm:h-[72px]"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Order Placed Successfully
        </h1>

        <p className="mt-2 text-gray-500 text-xs sm:text-sm">
          Thank you for shopping with us. Your order has been confirmed.
        </p>

        {/* ORDER ID */}
        <div className="mt-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-define-brown text-base sm:text-lg tracking-wide">
            {order}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">Payment ID</p>
          <p className="font-semibold text-define-brown text-base sm:text-lg tracking-wide">
            {payment}
          </p>
        </div>

        {/* INFO */}
        <p className="mt-4 text-xs sm:text-sm text-gray-500">
          You will receive order updates on your registered email.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="
                flex-1 text-center
                px-4 py-2 sm:py-2.5
                rounded-full
                text-sm font-semibold
                text-white
              btn-grad
              "
          >
            Continue Shopping
          </Link>

          <Link
            href="/my-orders"
            className="
                flex-1 text-center
                px-4 py-2 sm:py-2.5
                rounded-full
                text-sm font-semibold
                border border-gray-300
                text-gray-700
                hover:bg-gray-100
                transition
              "
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
