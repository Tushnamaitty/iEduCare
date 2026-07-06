import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Toppers", to: "/toppers" },
  { label: "Branches", to: "/branches" },
  { label: "Contact", to: "/contact" },
];

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="2.6" fill="#D6242A" />
      <path
        d="M14 10c-4.5 0-8 3.8-8 8.2 0 3 2.2 5.3 5 5.3 4.2 0 5.5-4 5.5-8.6 0-1.7-.3-3.2-2.5-4.9z"
        fill="#D6242A"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FBF4E9]/95 backdrop-blur border-b border-black/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-tight">
            <p className="text-neutral-900 font-extrabold text-lg tracking-wide">
              EDUCARE
            </p>
            <p className="text-[#D6242A] text-[10px] font-bold tracking-[0.15em]">
              CHEMBUR • MATUNGA
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-neutral-800">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1 hover:text-[#D6242A] transition-colors ${
                    isActive
                      ? "text-[#D6242A] border-b-2 border-[#D6242A] pb-1 font-semibold"
                      : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/courses"
          className="hidden lg:inline-flex items-center gap-2 bg-[#D6242A] hover:bg-[#B81E23] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          Explore Courses
          <ArrowRight size={16} />
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-neutral-900"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-[#FBF4E9]">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm ${
                  isActive ? "text-[#D6242A] font-semibold" : "text-neutral-800"
                } hover:text-[#D6242A]`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/courses"
            onClick={() => setOpen(false)}
            className="bg-[#D6242A] text-white font-semibold text-sm px-6 py-3 rounded-lg text-center"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </header>
  );
}