import FeaturesWhatsapp from "@/svgs/FeaturesWhatsapp";
import FreeShiping from "@/svgs/FreeShiping";
import FreshProduct from "@/svgs/FreshProduct";
import GetFlat from "@/svgs/GetFlat";
import QualityTested from "@/svgs/QualityTested";

export default function FeaturesSection() {
  const features = [
    {
      icon: FreeShiping,
      title: "Free Shipping",
      desc: "Get shipping on order over ₹500 only.",
    },
    {
      icon: QualityTested,
      title: "Quality Tested",
      desc: "Get shipping on order over ₹500 only.",
    },
    {
      icon: FeaturesWhatsapp,
      title: "WhatsApp Support",
      desc: "Get shipping on order over ₹500 only.",
    },
    {
      icon: GetFlat,
      title: "Get Flat 20% OFF",
      desc: "Get shipping on order over ₹500 only.",
    },
    {
      icon: FreshProduct,
      title: "Fresh Product",
      desc: "Get shipping on order over ₹500 only.",
    },
  ];
  return (
    <section className="py-8">
      <div className="mx-auto max-w-300 px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center lg:px-4 w-full"
            >
           
              <div className="mb-4 flex h-14 w-14 items-center justify-center">
                <item.icon className="size-14" />
              </div>

              <h4 className="text-[16px] font-semibold text-gray-900">
                {item.title}
              </h4>

              <p className="mt-1 text-[15px] text-gray-500">
                {item.desc}
              </p>

              {index !== features.length - 1 && (
                <span
                  className="
                    absolute right-0 top-1/2
                    hidden md:block
                    h-32 w-px
                    -translate-y-1/2
                    bg-define-brown
                  "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
