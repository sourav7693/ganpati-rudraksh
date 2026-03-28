import MainTemplate from "@/templates/MainTemplate";
import { Section } from "../privacy-policy/page";

export default function ShippingPolicy() {
  return (
    <MainTemplate>
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
        <div className="2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto p-4 bg-white md:p-10 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-6">📦 Shipping Policy</h1>

          <p className="text-gray-600 mb-6">
            At <span className="font-semibold">Ganpati Rudraakshaam</span>, we
            ensure safe and timely delivery of all our premium Rudraksha and
            gemstone products across India.
          </p>

          <Section title="Shipping Partner">
            We use Shiprocket as our trusted logistics partner.
          </Section>

          <Section title="Order Processing Time">
            • 1–3 business days after payment
            <br />• Weekend orders processed next working day
          </Section>

          <Section title="Delivery Time">
            • 3–7 business days
            <br />• Remote areas may take longer
          </Section>

          <Section title="Shipping Charges">
            Calculated at checkout. Free shipping (if any) will be shown
            clearly.
          </Section>

          <Section title="Order Tracking">
            Tracking ID will be shared via email after shipping.
          </Section>

          <Section title="Delivery Issues">
            Contact us at:
            <br />
            📧 ganpatirudraakshaam@gmail.com
          </Section>
        </div>
      </div>
    </MainTemplate>
  );
}
