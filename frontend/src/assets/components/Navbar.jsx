import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses", dropdown: true },
  { label: "Toppers", href: "#toppers" },
  { label: "Branches", href: "#branches" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="2.4" fill="#D6A94D" />
      <path
        d="M14 10c-4.5 0-8 3.8-8 8.2 0 3 2.2 5.3 5 5.3 4.2 0 5.5-4 5.5-8.6 0-1.7-.3-3.2-2.5-4.9z"
        fill="#D6A94D"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-tight">
            <p className="text-white font-bold text-lg tracking-wide">
              EDUCARE
            </p>
            <p className="text-gold text-[10px] font-medium tracking-[0.15em]">
              CHEMBUR • MATUNGA
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm text-gray-300">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`flex items-center gap-1 hover:text-white transition-colors ${
                  link.label === "Home"
                    ? "text-white border-b-2 border-gold pb-1"
                    : ""
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown size={14} />}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#courses"
          className="hidden lg:inline-block bg-gold hover:bg-gold-dark text-black font-semibold text-sm px-6 py-3 rounded-full transition-colors"
        >
          Explore Courses
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-black">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#courses"
            onClick={() => setOpen(false)}
            className="bg-gold text-black font-semibold text-sm px-6 py-3 rounded-full text-center"
          >
            Explore Courses
          </a>
        </div>
      )}
    </header>
  );
}