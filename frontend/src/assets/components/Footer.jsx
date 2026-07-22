import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { useApi } from "../../utils/useApi";
import { Phone, Mail, MapPin } from "lucide-react";
import logoImg from "../logo.png";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Toppers", to: "/toppers" },
  { label: "Branches", to: "/branches" },
  { label: "Contact", to: "/contact" },
];

function Logo() {
  return (
    <img
      src={logoImg}
      alt="iEduCare Logo"
      className="w-[26px] h-[26px] object-contain"
    />
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

function YoutubeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function Footer() {
  const { data: settings } = useApi("/api/settings/1/", null);
  const { data: branches } = useApi("/api/branches/", []);

  const uniquePhones = Array.from(new Set(branches.map(b => b.phone).filter(Boolean)));
  const whatsappNumber = uniquePhones.length > 0 ? uniquePhones[0].replace(/\D/g, '') : "919819828574";

  return (
    <footer className="bg-[#FAF9F6] border-t border-neutral-200 pt-16">
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
          <div className="mt-6 mb-2">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#1DA851] transition-colors shadow-sm">
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4 mt-5 text-neutral-500">
            {settings?.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#D6242A]">
                <InstagramIcon />
              </a>
            )}
            {settings?.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#D6242A]">
                <FacebookIcon />
              </a>
            )}
            {settings?.youtube_url && (
              <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#D6242A]">
                <YoutubeIcon />
              </a>
            )}
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
            {uniquePhones.length > 0 && (
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
                <span>
                  {uniquePhones.map((phone, idx) => (
                    <span key={phone}>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#D6242A] transition-colors">
                        {phone}
                      </a>
                      {idx < uniquePhones.length - 1 && " / "}
                    </span>
                  ))}
                </span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
              <span>
                <a href="mailto:ieducare888@gmail.com" className="hover:text-[#D6242A] transition-colors">
                  ieducare888@gmail.com
                </a>
              </span>
            </li>
            
            {branches.map(branch => (
              <li key={branch.id} className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D6242A] mt-0.5 shrink-0" />
                <span>{branch.address}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-14 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-3 pb-8 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Educare. All rights reserved.</p>
        <Link to="/admin/login" className="hover:text-[#D6242A] transition-colors font-medium">
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}