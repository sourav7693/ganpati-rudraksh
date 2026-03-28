import MainTemplate from "@/templates/MainTemplate";
import { Section } from "../privacy-policy/page";

export default function RefundPolicy() {
  return (
    <MainTemplate>
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
        <div className="2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto p-4 bg-white md:p-10 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-6">🔁 Refund & Return Policy</h1>

          <p className="text-gray-600 mb-6">
            Due to the nature of spiritual and natural products, we follow a
            strict no refund and no return policy.
          </p>

          <Section title="No Refund Policy">
            No returns/refunds once delivered.
          </Section>

          <Section title="Exceptions">
            • Wrong product
            <br />
            • Damaged product
            <br />• Not delivered
          </Section>

          <Section title="Conditions">
            • Report within 48 hours
            <br />
            • Unboxing video required
            <br />• Clear images needed
          </Section>

          <Section title="Resolution">
            Replacement or rare refund after verification.
          </Section>

          <Section title="Contact">📧 ganpatirudraakshaam@gmail.com</Section>
        </div>
      </div>
    </MainTemplate>
  );
}
