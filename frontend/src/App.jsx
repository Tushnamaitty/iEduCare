import Navbar from "./assets/components/Navbar";
import Hero from "./assets/components/Hero";
import StatsBar from "./assets/components/StatsBar";
import Footer from "./assets/components/Footer";
import "./App.css";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <Footer />
    </div>
  );
}

export default App;