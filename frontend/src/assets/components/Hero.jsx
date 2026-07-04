import { ArrowRight } from "lucide-react";
import heroImg from "../hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center bg-black overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Students studying in a classroom"
          className="w-full h-full object-cover object-[54%_32%] opacity-40 sm:opacity-55 lg:opacity-70"
        />
        {/* left-to-right fade so text stays readable on wide screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-black from-20% via-black/55 via-45% to-black/10 to-75%" />
        {/* extra bottom-up fade so text stays readable on narrow screens where image fills the column */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 sm:hidden" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 py-20 sm:py-24">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-gold" />
            <p className="text-gold text-[11px] sm:text-xs font-semibold tracking-[0.2em]">
              SINCE 2003 • CHEMBUR • MATUNGA
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] sm:leading-[1.05]">
            Building Strong
            <br />
            <span className="italic font-serif text-gold font-medium">
              Foundations.
            </span>
            <br />
            Creating Future
            <br />
            Toppers.
          </h1>

          <p className="mt-5 sm:mt-6 text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
            Expert coaching for Classes 7 to 10 — experienced mentors,
            batches capped at 20, weekly diagnostics and an outstanding
            record of ICSE &amp; IGCSE board results.
          </p>

          <a
            href="#courses"
            className="mt-8 sm:mt-10 inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-black font-semibold px-6 sm:px-7 py-3.5 sm:py-4 rounded-md transition-colors"
          >
            Explore Courses
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}