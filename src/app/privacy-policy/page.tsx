import MainTemplate from "@/templates/MainTemplate";

export default function PrivacyPolicy() {
  return (
    <MainTemplate>
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
        <div className="2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto p-4 bg-white md:p-10 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-6">🔐 Privacy Policy</h1>

          <p className="text-gray-600 mb-6">
            We value your privacy and are committed to protecting your personal
            information.
          </p>

          <Section title="Information We Collect">
            • Name
            <br />
            • Email
            <br />
            • Address
            <br />• Payment details (secure gateway)
          </Section>

          <Section title="How We Use Your Information">
            • Order processing
            <br />
            • Customer support
            <br />
            • Service improvement
            <br />• Order updates
          </Section>

          <Section title="Data Protection">
            We use secure technologies and never sell your data.
          </Section>

          <Section title="Third-Party Services">
            Payment gateways & Shiprocket for shipping.
          </Section>

          <Section title="Cookies">
            Used to enhance browsing experience.
          </Section>

          <Section title="Consent">
            By using our website, you agree to this policy.
          </Section>
        </div>
      </div>
    </MainTemplate>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
