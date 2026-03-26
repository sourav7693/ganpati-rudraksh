const TalesOfRudraksh = () => {
    const data = [
      {
        label: "What is Rudraksha?",
        desc: "Rudraksha is a sacred seed used in Hindu spirituality, symbolizing divine connection and protection. Derived from Sanskrit—“Rudra” (Lord Shiva) and “Aksha” (tears)—it represents the blessings of Mahadev. For centuries, sages and yogis have worn Rudraksha to enhance meditation, mental clarity, and spiritual growth. It is believed to create a protective aura around the wearer, aligning mind, body, and soul with higher consciousness.",
        sloka: "“रुद्राक्ष धारयेत् नित्यं सर्वपापैः प्रमुच्यते।”",
        meaning: "(One who wears Rudraksha is freed from all sins.)",
        src: "— Source: Shiva Purana",
      },
      {
        label: "Origin of Rudraksha",
        desc: "According to ancient scriptures, Rudraksha originated from the tears of Lord Shiva. After deep meditation for the welfare of humanity, Shiva opened his eyes, and his tears fell upon Earth, transforming into Rudraksha trees. This divine origin is described in texts like the Shiva Purana and Padma Purana, making Rudraksha not just a bead but a sacred gift to mankind.",
        sloka: "“शिवेन नेत्रात् पतितं रुद्राक्षं परमं शुभम्।”",
        meaning:
          "(Rudraksha fell from the eyes of Shiva and is supremely auspicious.)",
        src: "— Source: Shiva Purana",
      },
      {
        label: "Benefits of Rudraksha",
        desc: "Rudraksha offers both spiritual and practical benefits. Spiritually, it protects against negative energies, improves meditation, and balances chakras. Practically, it helps reduce stress, control anxiety, and improve focus. Many believe it has bio-electrical properties that stabilize heart rhythms and calm the nervous system. Different mukhi Rudraksha provides specific benefits like wealth, health, confidence, and success.",
        sloka: "“रुद्राक्षं परमं पुण्यं पावनं पापनाशनम्।”",
        meaning: "(Rudraksha is sacred, purifying, and destroys negativity.)",
        src: "— Source: Padma Purana",
      },
      {
        label: "How to Use Rudraksha",
        desc: "Rudraksha should be worn with devotion and proper discipline. It is best worn on Monday after purification and chanting Shiva mantras. One should maintain cleanliness and a positive mindset while wearing it. Avoid wearing during impure activities. Regular chanting enhances its energy and effectiveness, making it a lifelong spiritual companion.",
        sloka: "“ॐ नमः शिवाय”",
        meaning: "(Sacred Panchाक्षरी mantra to energize Rudraksha)",
        src: "— Source: Yajurveda",
      },
      {
        label: "Types of Rudraksha",
        desc: "Rudraksha beads are categorized based on the number of natural lines or “mukhis.” These range from 1 Mukhi (rare and powerful) to 21 Mukhi and beyond. Each mukhi represents a deity and has unique benefits—like 5 Mukhi for peace, 6 Mukhi for confidence, and 7 Mukhi for wealth. Ancient scriptures guide their use based on individual needs and life goals.",
        sloka: "“एकमुखी शिवस्वरूपं पंचमुखी कल्याणकारकः।”",
        meaning: "(1 Mukhi represents Shiva, 5 Mukhi brings well-being.)",
        src: "— Source: Skanda Purana",
      },
      {
        label: "Why Rudraksha is Trusted",
        desc: "Rudraksha has been mentioned in ancient scriptures like Shiva Purana, Skanda Purana, and Vedas for thousands of years. Saints, yogis, and spiritual leaders have used it for enlightenment and protection. Its continuous presence in sacred texts establishes its authenticity and spiritual importance, making it a trusted and time-tested divine tool.",
        sloka: "“रुद्राक्षं शिववक्त्रोत्थं धारयेत् भक्तिभावनः।”",
        meaning:
          "(Rudraksha originates from Shiva and should be worn with devotion.)",
        src: "— Source: Shiva Purana",
      },
      {
        label: "How to Identify Original Rudraksha",
        desc: `To build trust and avoid fake products, here are clear identification points:<br/>
        <b>Natural Lines (Mukhi): </b> Original Rudraksha has clear, continuous lines from top to bottom. <br/>
        <b>Texture: </b>  It feels natural and rough, not perfectly polished or plastic-like. <br/>
        <b>Water Test (Basic Check): </b> Real Rudraksha usually sinks in water (not 100% proof but helpful).
<br/>
        <b>Hole Structure: </b> Natural hole or properly drilled center without cracks. <br/>
        <b>No Artificial Joining: </b> Fake beads are often glued—check carefully under magnification. <br/>
        <b>X-Ray Certification: </b> Genuine sellers provide lab certification for mukhi verification. <br/>
        <b>Source: </b> Nepal and Indonesia are the most trusted origins.<br/>
        <b>Clarification: </b> No single home test is 100% accurate. Always buy from a trusted and certified seller like Ganpati Rudraakshaam to ensure authenticity.<br/>
        `,
        sloka: "",
        meaning: "",
        src: "",
      },
    ];
  return (
    <section className="grid grid-cols-1 gap-4 2xl:max-w-360 lg:max-w-300 mx-auto p-4 my-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-define-red/5 rounded-lg shadow-lg p-10 flex flex-col items-center justify-center gap-4"
        >
          <h3 className="text-2xl text-define-brown font-semibold text-center">
            {item.label}
          </h3>
          <p
            className="text-gray-600 text-center"
            dangerouslySetInnerHTML={{ __html: item.desc }}
          ></p>
          <div className="flex flex-col items-center justify-center">
            <p className="text-define-brown text-center">{item.sloka}</p>
            <p className="text-gray-600 text-center">{item.meaning}</p>
            <p className="text-gray-600 text-center">{item.src}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TalesOfRudraksh