import { Link } from "react-router-dom";
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import nileshRaiSir from "../assets/nilesh-rai-sir.png";

const branches = [
  {
    name: "Chembur",
    address:
      "101 Jolitha Complex, Near Ratna store, opposite Shiv Mandir, Ghatla village marg, Chembur, Mumbai- 400071",
  },
  {
    name: "Matunga",
    address:
      "2nd floor 36, Vorabhavan Plot No. 467-A, Dr. Ambedkar road, above Bank Of Baroda, Mumbai- 400019",
  },
];

export default function Contact() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#FBF4E9] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-16 sm:pb-24">
          <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 mb-10">
            <Link to="/" className="hover:text-[#D6242A]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-neutral-900">Contact</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D6242A]" />
            <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
              GET IN TOUCH
            </p>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-[1.15] sm:leading-[1.1] max-w-3xl break-words">
            Have a question?
            <br />
            <span className="text-[#D6242A]">Sir will answer it himself.</span>
          </h1>

          <p className="mt-6 text-neutral-600 text-base leading-relaxed max-w-xl">
            Call either branch, drop us an email, or walk into a campus.
            We reply to every parent and student personally, usually the
            same day.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <div className="inline-flex items-center gap-2 bg-[#D6242A] text-white font-semibold text-sm px-6 py-3 rounded-lg">
              <Phone size={16} />
              Call +91 98198 28574
            </div>
            <div className="inline-flex items-center gap-2 bg-[#D6242A] text-white font-semibold text-sm px-6 py-3 rounded-lg">
              <Phone size={16} />
              Call +91 91526 12535
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-neutral-900 font-semibold text-sm px-6 py-3 rounded-lg border border-neutral-300">
              <Mail size={16} className="text-[#D6242A]" />
              ieducare888@gmail.com
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
          <div className="relative bg-[#FBF4E9] border border-neutral-200 rounded-2xl overflow-hidden">
            {/* corner tab */}
            <div
              className="absolute top-0 right-0 w-14 h-14 bg-[#D6242A] hidden sm:block"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 p-6 sm:p-10 items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-white shadow-sm mx-auto sm:mx-0 shrink-0">
                <img
                  src={nileshRaiSir}
                  alt="Nilesh Rai, Founder of Educare"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 text-center sm:text-left">
                <p className="text-[#D6242A] text-xs font-bold tracking-[0.15em] mb-1">
                  FOUNDER & DIRECTOR
                </p>
                <h3 className="text-neutral-900 text-2xl sm:text-3xl font-extrabold mb-3">
                  Nilesh Rai
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  &ldquo;Care, then curriculum. That&rsquo;s been the rule
                  since 2003, and it&rsquo;s still the first thing I tell
                  every new batch.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-[#D6242A]" />
            <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
              VISIT US
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="bg-[#FBF4E9] border border-neutral-200 rounded-xl p-6 sm:p-8 min-w-0 flex flex-col"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#D6242A]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-neutral-900 font-bold text-lg mb-2">
                      {branch.name}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed break-words">
                      {branch.address}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    branch.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D6242A] text-sm font-semibold mt-5 hover:underline"
                >
                  Get directions
                  <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}