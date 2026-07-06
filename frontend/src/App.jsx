import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import ScrollToTop from "./assets/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Toppers from "./pages/Toppers";
import Branches from "./pages/Branches";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-[#FBF4E9] min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/toppers" element={<Toppers />} />
          <Route path="/branches" element={<Branches />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;