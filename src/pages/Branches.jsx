import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { ChevronRight, MapPin, Phone, Clock } from "lucide-react";
import chemburImg from "../assets/chembur-campus.jpg";
import matungaImg from "../assets/matunga-campus.jpg";

const imageMap = {
  "Chembur": chemburImg,
  "Matunga": matungaImg,
};

const defaultCampuses = [
  {
    name: "Chembur",
    address:
      "101 Jolitha Complex, Near Ratna store, opposite Shiv Mandir, Ghatla village marg, Chembur, Mumbai- 400071",
    phone: "+91 98198 28574",
    hours: "Mon–Sun : 1:00 PM – 8:30 PM",
  },
  {
    name: "Matunga",
    address:
      "2nd floor 36, Vorabhavan Plot No. 467-A, Dr. Ambedkar road, above Bank Of Baroda, Mumbai- 400019",
    phone: "+91 91526 12535",
    hours: "Mon–Sun : 1:00 PM – 8:30 PM",
  },
];

function CampusCard({ campus }) {
  const imageSrc = campus.image 
    ? (campus.image.startsWith('http') ? campus.image : API_BASE_URL + campus.image) 
    : (imageMap[campus.name] || chemburImg);
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <img
          src={imageSrc}
          alt={`${campus.name} campus`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[#D6242A] text-xs font-bold tracking-widest mb-2">
          CAMPUS
        </p>
        <h3 className="text-black font-extrabold text-2xl sm:text-3xl mb-5">
          {campus.name}
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin
              size={18}
              className="text-[#F3B70E] shrink-0 mt-0.5"
              strokeWidth={2.25}
            />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {campus.address}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone
              size={18}
              className="text-[#F3B70E] shrink-0"
              strokeWidth={2.25}
            />
            <a
              href={`tel:${campus.phone.replace(/\s+/g, "")}`}
              className="text-neutral-600 text-sm sm:text-base hover:text-[#D6242A] transition-colors"
            >
              {campus.phone}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Clock
              size={18}
              className="text-[#F3B70E] shrink-0"
              strokeWidth={2.25}
            />
            <p className="text-neutral-600 text-sm sm:text-base">
              {campus.hours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Branches() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/branches/`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Failed to load branches from API:", err);
      });
  }, []);

  const displayCampuses = data.length > 0 ? data : defaultCampuses;

  return (
    <>
      {/* Hero section */}
      <section className="bg-[#FBF4E9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-10 sm:pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <Link to="/" className="hover:text-[#D6242A]">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#D6242A]">Branches</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#D6242A]" />
            <p className="text-[#D6242A] text-xs font-bold tracking-[0.2em]">
              BRANCHES
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-[1.15] max-w-2xl">
            Two campuses.
            <br />
            <span className="italic text-[#F3B70E]">One method.</span>
          </h1>

          <p className="mt-4 text-neutral-600 text-base leading-relaxed max-w-lg">
            Chembur and Matunga run the same curriculum pool, the same batch
            size, the same weekly diagnostics.
          </p>
        </div>
      </section>

      {/* Campus cards */}
      <section className="bg-[#FBF4E9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {displayCampuses.map((campus) => (
              <CampusCard key={campus.name} campus={campus} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}