"use client";
import { FaRegUserCircle } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ExpertTeam = () => {
  const data = [
    {
      name: "Arindam Chatterjee",
      designation: "Founder – Ganpati Rudraakshaam",
      desc: "For Arindam Chatterjee, spirituality is not just a belief—it is a way of life. Raised in a traditional Bengali household rooted in devotion and discipline, his connection with Rudraksha began at a very young age. Known for his calm wisdom and deep understanding, Arindam has spent years studying the spiritual and scientific significance of sacred beads. His journey is driven by a single purpose—to guide people towards inner peace and balance. Through Ganpati Rudraakshaam, he has created a trusted space where faith meets authenticity, helping countless individuals transform their lives.",
    },
    {
      name: "Sanchita Mukherjee",
      designation: "Director – Spiritual Advisor & Panel Expert",
      desc: "Sanchita Mukherjee’s journey is a beautiful blend of intellect and spirituality. Though she pursued higher education in literature from Kolkata, her heart always remained connected to divine practices and meditation. Born into a culturally rich Bengali family, her devotion to Lord Shiva became her guiding force. Over the years, she has helped people overcome life challenges through spiritual counseling and Rudraksha guidance. At Ganpati Rudraakshaam, she brings compassion, clarity, and a deep intuitive understanding that makes every seeker feel heard, supported, and empowered.",
    },
    {
      name: "Subhajit Banerjee",
      designation: "Head Consultant – Rudraksha Specialist",
      desc: "Subhajit Banerjee is known for his analytical approach combined with spiritual depth. With a background in commerce and years of research in Rudraksha, he has developed a unique ability to recommend the right bead for each individual. His calm demeanor and patient listening make clients instantly comfortable. Subhajit believes that every problem has a spiritual solution when approached with the right guidance. His commitment to authenticity and personalized consultation has made him a trusted name among those seeking genuine Rudraksha solutions.",
    },
    {
      name: "Debolina Sen",
      designation: "Director – Client Experience & Healing Expert",
      desc: "Debolina Sen brings warmth, empathy, and healing energy to Ganpati Rudraakshaam. Deeply influenced by her upbringing in a spiritually inclined Bengali family, she has always believed in the power of divine connection. Her expertise lies in understanding people beyond their words—helping them find emotional strength and clarity through Rudraksha and spiritual practices. Debolina ensures that every client experiences not just a service, but a meaningful journey towards positivity and self-growth. Her presence adds a human touch that truly defines the soul of the organization.",
    },
  ];
  return (
    <section className="flex flex-col gap-4 2xl:max-w-360 lg:max-w-300 xxl:max-w-460 mx-auto p-4">
      <h1 className="text-2xl font-bold text-define-brown">Team of Experts</h1>
      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer ">
                <div className="flex flex-col gap-4 w-full h-auto p-4 bg-linear-to-b from-[#D4573D] to-[#824336] text-white">
                  <div className="flex items-center justify-center flex-col">
                    <div className="size-10 rounded-full bg-white text-define-red flex items-center justify-center">
                      <FaRegUserCircle size={30} />
                    </div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="font-bold">{item.designation}</p>
                  </div>
                  <p className="px-2">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExpertTeam;
