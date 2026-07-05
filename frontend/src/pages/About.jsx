import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const cards = [
  {
    label: "MISSION",
    title: "Build confident learners.",
    text: "To help every student we teach walk into their board exam with quiet, earned confidence and walk out unsurprised.",
  },
  {
    label: "VISION",
    title: "The most trusted foundation.",
    text: "To be the coaching institute that Mumbai families recommend without hesitation, decade after decade.",
  },
  {
    label: "PHILOSOPHY",
    title: "Care, then curriculum.",
    text: "We believe curriculum works only when a child feels seen. So we do the second thing first always.",
  },
];

export default function About() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#FBF4E9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-20 sm:pb-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-10">
            <Link to="/" className="hover:text-[#D6242A]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-neutral-900">About</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D6242A]" />
            <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
              ABOUT THE INSTITUTE
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-[1.1] max-w-3xl">
            A coaching institute
            <br />
            <span className="text-[#D6242A]">that prefers depth to noise.</span>
          </h1>

          <p className="mt-6 text-neutral-600 text-base leading-relaxed max-w-xl">
            iEduCare was started by Nilesh Rai Sir in 2003. All these 23 years
            nothing has changed.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: heading */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#D6242A]" />
                <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
                  OUR STORY
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
                A trusted institution, built one student at a time.
              </h2>
            </div>

            {/* Right: paragraphs */}
            <div className="space-y-6 text-neutral-600 text-base leading-relaxed">
              <p>
                Every successful student has a story. Ours began in 2003 with
                a simple vision to create a learning environment where every
                student receives the attention they deserve. What started as
                a single classroom has grown into two campuses, mentoring
                thousands of students over the years.
              </p>
              <p>
                That philosophy shapes everything we do. By keeping our
                batches small, we ensure no student is overlooked. Every
                question is encouraged and every student&rsquo;s progress is
                closely monitored through continuous feedback, dedicated
                doubt solving sessions, and meaningful parent teacher
                interactions.
              </p>
              <p>
                Today, we proudly guide students from Classes 7 to 10 across
                the ICSE and IGCSE curriculum in six core subjects. More than
                helping students achieve excellent academic results, we
                strive to build strong foundations, inspire curiosity, and
                nurture confident learners.
              </p>
            </div>
          </div>

          {/* Mission / Vision / Philosophy cards */}
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-16">
            {cards.map((card) => (
              <div
                key={card.label}
                className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-sm"
              >
                <p className="text-[#D6242A] text-xs font-bold tracking-[0.15em] mb-4">
                  {card.label}
                </p>
                <h3 className="text-neutral-900 text-xl font-bold mb-3">
                  {card.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}