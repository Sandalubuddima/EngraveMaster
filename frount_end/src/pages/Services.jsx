import { motion } from "framer-motion";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

const services = [
    {
      title: "Smart Laser Optimization",
      desc: "AI-powered adjustment of laser speed, intensity, and interval based on wood type.",
    },
    {
      title: "Material Analysis",
      desc: "Get automatic wood type recognition and tailored engraving profiles.",
    },
    {
      title: "Live Simulation",
      desc: "Preview your design in real-time before engraving begins.",
    },
    {
      title: "Error Detection",
      desc: "Warn users about risky settings that could damage material or the machine.",
    },
    {
      title: "Cloud Sync Projects",
      desc: "Access your saved templates from anywhere with our secure cloud system.",
    },
    {
      title: "User-Friendly Interface",
      desc: "Built for all skill levels, from beginners to pros.",
    },
  ];

export default function Services() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#f9f5f2] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-white py-16 px-4 transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#84240c] dark:text-[#ffc18c]">
        Our Services
      </h1>
      <p className="text-lg md:text-xl text-center text-[#563232] dark:text-[#e7cfb4] mb-12 max-w-3xl mx-auto">
        At <span className="text-[#da6d42] font-semibold dark:text-[#ffc18c]">EngraveMaster</span>, we blend tradition with technology, offering powerful tools that make laser engraving smarter, safer, and easier.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-[#fff] dark:bg-[#563232] p-6 rounded-2xl shadow-lg dark:shadow-[#ffc18c] hover:shadow-md"
          >
            <h3 className="text-2xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">
              {service.title}
            </h3>
            <p className="text-[#563232] dark:text-[#e7cfb4]">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    <Footer />
    </>
  );
}
