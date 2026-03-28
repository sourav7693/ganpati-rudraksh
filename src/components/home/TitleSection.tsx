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
    <section className="2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto w-full px-4 py-2">
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
