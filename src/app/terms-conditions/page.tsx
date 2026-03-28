import MainTemplate from "@/templates/MainTemplate";
import { Section } from "../privacy-policy/page";

export default function TermsPage() {
  return (
    <MainTemplate>
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
        <div className="2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto p-4 bg-white md:p-10 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-6">📜 Terms & Conditions</h1>

          <Section title="1. General">
            Website owned by Ganpati Rudraakshaam. Terms may change anytime.
          </Section>

          <Section title="2. Products">
            Natural Rudraksha & gemstones may vary in size/shape.
          </Section>

          <Section title="3. Pricing">
            Prices in INR. Subject to change. Orders may be cancelled for
            errors.
          </Section>

          <Section title="4. Orders & Payments">
            Orders confirmed after successful payment.
          </Section>

          <Section title="5. Shipping">
            Handled via Shiprocket. Delivery times are estimates.
          </Section>

          <Section title="6. Cancellation">
            Not allowed after processing.
          </Section>

          <Section title="7. Refund Policy">
            Strict no refund except valid cases.
          </Section>

          <Section title="8. Authenticity">
            Products are genuine. Results may vary.
          </Section>

          <Section title="9. Intellectual Property">
            All content is owned. Unauthorized use prohibited.
          </Section>

          <Section title="10. Liability">
            Not responsible for courier delays or natural variations.
          </Section>

          <Section title="11. Governing Law">Governed by Indian laws.</Section>

          <Section title="Contact">📧 ganpatirudraakshaam@gmail.com</Section>
        </div>
      </div>
    </MainTemplate>
  );
}
