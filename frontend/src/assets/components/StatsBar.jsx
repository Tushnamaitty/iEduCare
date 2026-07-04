import { Users, Award, ShieldCheck, BookOpen } from "lucide-react";

const stats = [
  { icon: Users, value: "10000+", label: "Students Guided" },
  { icon: Award, value: "20+", label: "Years Experience" },
  { icon: ShieldCheck, value: "100%", label: "Personal Attention" },
  { icon: BookOpen, value: "20", label: "Max Students Per Batch" },
];

export default function StatsBar() {
  return (
    <section className="bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-gold/40 rounded-md text-gold shrink-0">
              <Icon size={18} className="sm:hidden" />
              <Icon size={22} className="hidden sm:block" />
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl font-bold leading-none">
                {value}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}