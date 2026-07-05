import { Users, Award, ShieldCheck, BookOpen } from "lucide-react";

const stats = [
  { icon: Users, value: "10000+", label: "Students Guided" },
  { icon: Award, value: "20+", label: "Years Experience" },
  { icon: ShieldCheck, value: "100%", label: "Personal Attention" },
  { icon: BookOpen, value: "20", label: "Max Students Per Batch" },
];

export default function StatsBar() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, label }, i) => (
        <div
          key={label}
          className={`flex items-center gap-3 sm:gap-4 px-5 sm:px-10 py-6 sm:py-10 ${
            i % 2 === 0 ? "bg-[#D6242A]" : "bg-[#F3B70E]"
          }`}
        >
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0">
            <Icon size={20} className="text-[#B81E23] sm:hidden" />
            <Icon size={26} className="text-[#B81E23] hidden sm:block" />
          </div>
          <div>
            <p className="text-neutral-900 text-lg sm:text-2xl font-extrabold leading-none">
              {value}
            </p>
            <p className="text-neutral-900 text-xs sm:text-sm font-medium mt-1">
              {label}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}