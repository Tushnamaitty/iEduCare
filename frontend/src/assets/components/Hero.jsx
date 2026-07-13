import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { ArrowRight } from "lucide-react";
import heroImg from "../hero.png";

export default function Hero() {
  const [branches, setBranches] = useState([]);
  const [batchSize, setBatchSize] = useState("20");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/branches/`)
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error("Failed to load branches:", err));

    fetch(`${API_BASE_URL}/api/settings/1/`)
      .then(res => res.json())
      .then(data => {
        if (data.batch_size) setBatchSize(data.batch_size);
      })
      .catch(err => console.error("Failed to load settings:", err));
  }, []);

  const branchText = branches.length > 0 
    ? branches.map(b => b.name.toUpperCase()).join(" • ")
    : "CHEMBUR • MATUNGA";

  return (
    <section id="home" className="relative bg-[#FBF4E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D6242A]" />
            <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
              SINCE 2003 • {branchText}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-neutral-900">
            Building Strong
            <br />
            <span className="text-[#D6242A]">Foundations.</span>
            <br />
            Creating Future
            <br />
            <span className="text-[#F3B70E]">Toppers.</span>
          </h1>

          <p className="mt-6 text-neutral-700 text-base leading-relaxed max-w-md">
            Expert coaching for Classes 7 to 10 — experienced mentors,
            batches capped at {batchSize}, weekly diagnostics and an outstanding
            record of ICSE &amp; IGCSE board results.
          </p>

          <div className="flex flex-wrap items-center gap-8 mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-[#D6242A] hover:bg-[#B81E23] text-white font-semibold px-7 py-4 rounded-lg transition-colors"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Link>

            {/* decorative dot grid */}
            <div className="hidden sm:grid grid-cols-5 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#F3B70E]" />
              ))}
            </div>
          </div>
        </div>

        {/* Right: image with blob + circle accent */}
        <div className="relative mt-4 lg:mt-0">
          <span className="absolute -left-4 sm:-left-8 lg:-left-10 top-1/2 -translate-y-1/2 w-[75%] sm:w-[80%] lg:w-[85%] h-[75%] sm:h-[80%] lg:h-[85%] rounded-full bg-[#F3B70E] -z-10" />
          <div className="relative rounded-r-2xl rounded-l-[48px] sm:rounded-l-[80px] lg:rounded-l-[120px] overflow-hidden aspect-[4/3] shadow-xl">
            <img
              src={heroImg}
              alt="Students studying in a classroom"
              className="w-full h-full object-cover object-[54%_32%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}