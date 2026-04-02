import React from "react";

interface TextCenterSectionProps {
  title: string;
  subtitle: string;
}

const TitleSection: React.FC<TextCenterSectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <section className="section-container w-full py-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-wide text-define-brown text-left">
          {title}
        </h2>

        <h3 className="text-[16px] md:text-[16px] font-semibold tracking-wide text-[#555555] text-left">
          {subtitle}
        </h3>
      </div>
    </section>
  );
};

export default TitleSection;
