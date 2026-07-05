import { Clock, Users } from "lucide-react";

const courses = [
  {
    badge: "FULL YEAR",
    grade: "7 – 10",
    title: "ICSE Foundation",
    desc: "Complete year long ICSE preparation across all core subjects, mapped to the CISCE syllabus.",
  },
  {
    badge: "FULL YEAR",
    grade: "7 – 10",
    title: "IGCSE Foundation",
    desc: "Complete year long IGCSE preparation across all core subjects, mapped to the CAIE international syllabus.",
  },
];

const subjects = [
  {
    name: "Mathematics",
    desc: "From arithmetic fluency to board-level geometry and algebra  precision, always.",
  },
  {
    name: "Science",
    desc: "Physics, Chemistry and Biology taught by subject specialists.",
  },
  {
    name: "English",
    desc: "Comprehension, composition, literature and grammar taught the right way.",
  },
  {
    name: "Hindi",
    desc: "Building confidence in reading, writing, and meaningful communication.",
  },
  {
    name: "History",
    desc: "A narrative approach to history  dates become stories, movements become meaning.",
  },
  {
    name: "Geography",
    desc: "Map skills, physical geography and human geography visualised, not memorised.",
  },
  {
    name: "Economics",
    desc: "Core concepts of markets, money and decision-making explained through real-world thinking.",
  },
];

export default function Courses() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 sm:pt-16 pb-16">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#D6242A]" />
          <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
            COURSES
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-[1.1] max-w-3xl">
          A curriculum built for
          <br />
          <span className="text-[#D6242A]">board day, not exam day.</span>
        </h1>

        <p className="mt-6 text-neutral-500 text-base leading-relaxed max-w-xl">
          Designed for Classes 7 to 10, available in both offline and online
          mode.
        </p>

        {/* Course cards */}
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {courses.map((course) => (
            <div
              key={course.title}
              className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="bg-[#D6242A]/10 text-[#D6242A] text-[11px] font-bold tracking-[0.1em] px-3 py-1.5 rounded-md">
                  {course.badge}
                </span>
                <span className="text-neutral-500 text-sm">{course.grade}</span>
              </div>
              <h3 className="text-neutral-900 text-2xl font-bold mb-3">
                {course.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed max-w-md">
                {course.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timing & batch info */}
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          <div className="flex items-start gap-4 border border-neutral-200 rounded-xl p-6">
            <div className="w-11 h-11 flex items-center justify-center bg-[#D6242A] rounded-full text-white shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-neutral-900 font-bold text-base">
                Class Timings
              </p>
              <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                Classes are held between 1:00 PM and 8:30 PM, with slots
                arranged around school hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border border-neutral-200 rounded-xl p-6">
            <div className="w-11 h-11 flex items-center justify-center bg-[#F3B70E] rounded-full text-white shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-neutral-900 font-bold text-base">
                Batch Size
              </p>
              <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                Every batch is capped at 15–20 students, so each child gets
                the teacher&rsquo;s attention.
              </p>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-16 pt-12 border-t border-neutral-200">
          {subjects.map((subject) => (
            <div key={subject.name}>
              <p className="text-neutral-400 text-xs font-semibold tracking-[0.15em] mb-3">
                SUBJECT
              </p>
              <h4 className="text-neutral-900 text-lg font-bold mb-2">
                {subject.name}
              </h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {subject.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}