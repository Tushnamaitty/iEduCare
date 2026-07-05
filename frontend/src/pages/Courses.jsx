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
      name: "Marathi",
      desc: "Strengthening grammar, comprehension and expression with a native ease.",
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
  
  const logistics = [
    {
      label: "CLASS TIMINGS",
      value: "1:00 PM – 8:30 PM",
      desc: "Flexible slots through the afternoon and evening to fit around school hours.",
    },
    {
      label: "BATCH SIZE",
      value: "15 – 20 Students",
      desc: "Small enough for individual attention, large enough for peer learning.",
    },
  ];
  
  export default function Courses() {
    return (
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 sm:pt-16 pb-16">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <p className="text-gold text-xs font-semibold tracking-[0.2em]">
              COURSES
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-[1.1] max-w-3xl">
            A curriculum built for
            <br />
            <span className="italic font-serif font-medium">
              board day, not exam day.
            </span>
          </h1>
          <p className="mt-6 text-neutral-500 text-base leading-relaxed max-w-xl">
            Designed for Classes 7 to 10, available in both offline and online
            mode.
          </p>
  
          {/* Logistics strip */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-8 max-w-2xl">
            {logistics.map((item) => (
              <div
                key={item.label}
                className="flex-1 border-l-2 border-gold pl-4"
              >
                <p className="text-neutral-400 text-[11px] font-semibold tracking-[0.15em] mb-1">
                  {item.label}
                </p>
                <p className="text-neutral-900 text-lg font-bold mb-1">
                  {item.value}
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
  
          {/* Course cards */}
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-neutral-950 rounded-xl p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="bg-white/10 text-gray-300 text-[11px] font-semibold tracking-[0.1em] px-3 py-1.5 rounded-md">
                    {course.badge}
                  </span>
                  <span className="text-gray-400 text-sm">{course.grade}</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  {course.desc}
                </p>
              </div>
            ))}
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