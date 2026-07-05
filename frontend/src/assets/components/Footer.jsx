import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const exploreLinks = [
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Toppers", to: "/toppers" },
  { label: "Gallery", to: "/gallery" },
];

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="2.4" fill="#D6242A" />
      <path
        d="M14 10c-4.5 0-8 3.8-8 8.2 0 3 2.2 5.3 5 5.3 4.2 0 5.5-4 5.5-8.6 0-1.7-.3-3.2-2.5-4.9z"
        fill="#D6242A"
      />
    </svg>
  );
}

/* lucide-react v1 removed brand/logo icons, so these are small
   hand-rolled outline SVGs (same visual language: stroke-based,
   currentColor, rounded caps) instead of importing them. */
const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Logo />
            <div className="leading-tight">
              <p className="text-neutral-900 font-bold text-base tracking-wide">
                EDUCARE
              </p>
              <p className="text-[#D6242A] text-[10px] font-semibold tracking-[0.15em]">
                SINCE 2003 · MUMBAI
              </p>
            </div>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
            A quiet, disciplined place to become the student you want to be.
          </p>
          <div className="flex items-center gap-4 mt-5 text-neutral-500">
            <a href="#" aria-label="Instagram" className="hover:text-[#D6242A]">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#D6242A]">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#D6242A]">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <p className="text-[#D6242A] text-xs font-bold tracking-[0.15em] mb-5">
            EXPLORE
          </p>
          <ul className="space-y-3 text-neutral-700 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-[#D6242A]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach us */}
        <div>
          <p className="text-[#D6242A] text-xs font-bold tracking-[0.15em] mb-5">
            REACH US
          </p>
          <ul className="space-y-4 text-neutral-700 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
              <span>+91 98198 28574 / 91526 12535</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
              <span>ieducare888@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
              <span>
                101 Jolitha Complex, Near Ratna store, opposite Shiv Mandir,
                Ghatla village marg, Chembur, Mumbai- 400071
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
              <span>
                2nd floor 36, Vorabhavan Plot No. 467-A, Dr. Ambedkar road,
                above Bank Of Baroda, Mumbai- 400019
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-14 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-3 pb-8 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Educare. All rights reserved.</p>
      </div>
    </footer>
  );
}