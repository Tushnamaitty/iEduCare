import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Phone, Mail, MapPin, Send } from "lucide-react";
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
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

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
            Write to us, call either branch, or send a message below. We
            reply to every parent and student personally, usually the same
            day.
          </p>
        </div>
      </section>

      {/* Founder + form */}
      <section className="bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* Founder card */}
            <div className="lg:col-span-2 min-w-0">
              <div className="relative bg-[#FBF4E9] border border-neutral-200 rounded-2xl p-6 sm:p-8 overflow-hidden">
                {/* corner tab */}
                <div className="absolute top-0 right-0 w-14 h-14 bg-[#D6242A]" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

                <span className="pointer-events-none select-none absolute -bottom-6 -left-2 text-[9rem] leading-none font-serif text-neutral-900/[0.05]">
                  &rdquo;
                </span>

                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-sm mb-6">
                  <img
                    src={nileshRaiSir}
                    alt="Nilesh Rai, Founder of Educare"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-[#D6242A] text-xs font-bold tracking-[0.15em] mb-1">
                  FOUNDER & DIRECTOR
                </p>
                <h3 className="text-neutral-900 text-2xl font-extrabold mb-4">
                  Nilesh Rai
                </h3>
                <p className="relative text-neutral-600 text-sm leading-relaxed mb-6">
                  Care, then curriculum. That&rsquo;s been the rule since
                  2003, and it&rsquo;s still the first thing I tell every
                  new batch.
                </p>

                <div className="space-y-3 text-sm text-neutral-700 border-t border-neutral-200 pt-5">
                  <a
                    href="tel:+919819828574"
                    className="flex items-center gap-3 hover:text-[#D6242A] min-w-0"
                  >
                    <Phone size={16} className="text-[#D6242A] shrink-0" />
                    <span className="break-words">+91 98198 28574</span>
                  </a>
                  <a
                    href="mailto:ieducare888@gmail.com"
                    className="flex items-center gap-3 hover:text-[#D6242A] min-w-0"
                  >
                    <Mail size={16} className="text-[#D6242A] shrink-0" />
                    <span className="break-words">ieducare888@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#D6242A]" />
                <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
                  SEND A MESSAGE
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-8">
                Tell us what you need.
              </h2>

              {sent ? (
                <div className="border border-[#D6242A]/30 bg-[#FBF4E9] rounded-xl p-8 text-center">
                  <p className="text-neutral-900 font-bold text-lg mb-1">
                    Message sent.
                  </p>
                  <p className="text-neutral-600 text-sm">
                    We&rsquo;ll get back to you within a day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold tracking-wide text-neutral-700 mb-2">
                        NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D6242A]/40 focus:border-[#D6242A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wide text-neutral-700 mb-2">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D6242A]/40 focus:border-[#D6242A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wide text-neutral-700 mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D6242A]/40 focus:border-[#D6242A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wide text-neutral-700 mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Which class or course are you asking about?"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D6242A]/40 focus:border-[#D6242A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D6242A] hover:bg-[#B81E23] text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors"
                  >
                    Send message
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="bg-[#FBF4E9] overflow-x-hidden">
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
                className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 min-w-0"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#FBF4E9] flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#D6242A]" />
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}