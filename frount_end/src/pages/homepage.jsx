import React from "react";
import GlassIcons from "../components/GlassIcons";
import Navbar from "../components/PageNavbar";
import SplashCursor from "../components/SplashCursor";
import Footer from "../components/Footer";

import {
  FiPlusCircle,
  FiFolder,
  FiFileText,
  FiMessageCircle,
  FiEdit,
  FiAlertCircle,
} from "react-icons/fi";

export default function Home() {
  const glassIcons = [
    { icon: <FiPlusCircle />, color: "blue", label: "Create" },
    { icon: <FiFolder />, color: "purple", label: "Your Projects" },
    { icon: <FiFileText />, color: "red", label: "Docs" },
    { icon: <FiMessageCircle />, color: "indigo", label: "Ask AI" },
    { icon: <FiEdit />, color: "orange", label: "Notes" },
    { icon: <FiAlertCircle />, color: "green", label: "Inform Us" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20 px-4 flex flex-col items-center justify-start bg-gradient-to-br from-[#e5e1e0] to-[#d6b2a5] dark:from-[#1C1C1C] dark:to-[#3c2f2f] transition-colors duration-300">
        {/* 🌀 Animated Welcome Text */}

        {/* 🔮 Icon Section */}
        <section className="text-center">
          <div className="flex justify-center">
            <GlassIcons items={glassIcons} className="z-10" />
          </div>
        </section>
      </div>

      {/* 🎨 Cursor Fluid Effect */}
      <SplashCursor />
      <Footer />
    </>
  );
}
