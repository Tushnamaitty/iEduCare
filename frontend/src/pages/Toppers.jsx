import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import {
  ChevronRight,
  FlaskConical,
  Languages,
  Landmark,
  BookOpen,
  Award,
} from "lucide-react";

const groupConfigs = [
  {
    category: "SCIENCE",
    icon: FlaskConical,
    title: "Aggregate Science Toppers",
    statLabel: "AGGREGATE",
    statUnit: "%",
  },
  {
    category: "HINDI",
    icon: Languages,
    title: "Hindi Toppers",
    statLabel: "MARKS",
    statUnit: "/100",
  },
  {
    category: "HISTORY_GEOGRAPHY",
    icon: Landmark,
    title: "History & Geography Toppers",
    statLabel: "MARKS",
    statUnit: "/100",
  },
  {
    category: "LITERATURE_LANGUAGE",
    icon: BookOpen,
    title: "Literature & Language Toppers",
    statLabel: "MARKS",
    statUnit: "/100",
  },
];

const defaultToppers = [
  { name: "Sanjay Chapparwal", school: "AVM", score: "99.8", subject: "Chemistry", category: "SCIENCE", is_perfect: false },
  { name: "Maanvir Bamboli", school: "SJU", score: "98.4", subject: "Chemistry", category: "SCIENCE", is_perfect: false },
  { name: "Vansh Nevatia", school: "AVM", score: "98.4", subject: "Chemistry", category: "SCIENCE", is_perfect: false },
  { name: "Vatsal Shah", school: "SJU", score: "98.2", subject: "Chemistry", category: "SCIENCE", is_perfect: false },
  { name: "Diya Kapasi", school: "St. Gregorios High School", score: "99", subject: "Hindi", category: "HINDI", is_perfect: false },
  { name: "Aritro Biswas", school: "The Green Acres Academy", score: "99", subject: "Hindi", category: "HINDI", is_perfect: false },
  { name: "Aarya Mayekar", school: "J.B. Vachha High School", score: "98", subject: "Hindi", category: "HINDI", is_perfect: false },
  { name: "Khushi Didwania", school: "St. Gregorios High School", score: "98", subject: "Hindi", category: "HINDI", is_perfect: false },
  { name: "Aariz Bangi", school: "Ryan International", score: "100", subject: "History", category: "HISTORY_GEOGRAPHY", is_perfect: true },
  { name: "Suvir Bakshi", school: "Avalon", score: "100", subject: "History", category: "HISTORY_GEOGRAPHY", is_perfect: true },
  { name: "Mehak Khosla", school: "B. Scottish", score: "95", subject: "Geography", category: "HISTORY_GEOGRAPHY", is_perfect: false },
  { name: "Sarah Khan", school: "B. Scottish", score: "94", subject: "Geography", category: "HISTORY_GEOGRAPHY", is_perfect: false },
  { name: "Rukaan Chotrani", school: "Ryan International", score: "99", subject: "Literature", category: "LITERATURE_LANGUAGE", is_perfect: false },
  { name: "Rajvi Shah", school: "Gold Crest", score: "97", subject: "Literature", category: "LITERATURE_LANGUAGE", is_perfect: false },
  { name: "Risa Panekar", school: "St. Gregorios High School", score: "98", subject: "Language", category: "LITERATURE_LANGUAGE", is_perfect: false },
  { name: "Trishan Sharma", school: "St. Gregorios High School", score: "98", subject: "Language", category: "LITERATURE_LANGUAGE", is_perfect: false }
];

function TopperCard({ topper, statLabel, statUnit }) {
  const isPerfect = topper.is_perfect || topper.score === "100";

  return (
    <div className="relative bg-white border border-neutral-200 rounded-xl p-5 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {isPerfect && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#F3B70E] text-[#D6242A] text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Award size={11} strokeWidth={2.75} />
            PERFECT
          </div>
        </div>
      )}

      <h3 className="text-black font-bold text-base mb-1 pr-16">
        {topper.name}
      </h3>
      <p className="text-neutral-500 text-sm mb-5">
        {topper.school}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-2">
        <div>
          <p className="text-neutral-400 text-[11px] font-bold tracking-widest mb-1">
            {statLabel}
          </p>
          <p
            className={`text-3xl sm:text-2xl font-extrabold ${
              isPerfect ? "text-[#F3B70E]" : "text-black"
            }`}
          >
            {topper.score}
            <span className="text-black text-base font-bold ml-0.5">
              {statUnit}
            </span>
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-neutral-400 text-[11px] font-bold tracking-widest mb-1">
            BEST IN
          </p>
          <p className="text-black font-bold text-sm">
            {topper.subject}
          </p>
          <p className="text-neutral-400 text-xs">Class 10</p>
        </div>
      </div>
    </div>
  );
}

export default function Toppers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/toppers/`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load toppers from API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF4E9]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D6242A]"></div>
      </div>
    );
  }

  const flatToppers = data.length > 0 ? data : defaultToppers;

  // Group toppers dynamically by category matching groupConfigs
  const topperGroups = groupConfigs.map((cfg) => {
    const groupToppers = flatToppers.filter((t) => t.category === cfg.category);
    return {
      ...cfg,
      toppers: groupToppers,
    };
  });

  return (
    <>
      {/* Hero section */}
      <section className="bg-[#FBF4E9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-10 sm:pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <Link to="/" className="hover:text-[#D6242A]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#D6242A]">Toppers</span>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#D6242A]" />
              <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
                OUR TOPPERS
              </p>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#D6242A] leading-[1.15] max-w-2xl">
              The names on our{" "}
              <span className="text-[#F3B70E]">honours board.</span>
            </h1>

            <p className="mt-4 text-neutral-600 text-base leading-relaxed max-w-lg">
              Every one of these students walked into the board hall a
              little nervous, and walked out a little proud.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="border-t border-neutral-200" />
      </div>

      {/* Topper groups */}
      <section className="bg-[#FBF4E9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 sm:py-16 space-y-12">
          {topperGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-full bg-[#D6242A] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#F3B70E]" strokeWidth={2.25} />
                  </div>
                  <h2 className="text-[#D6242A] font-bold text-xl sm:text-2xl">
                    {group.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {group.toppers.map((topper) => (
                    <TopperCard
                      key={topper.name}
                      topper={topper}
                      statLabel={group.statLabel}
                      statUnit={group.statUnit}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}