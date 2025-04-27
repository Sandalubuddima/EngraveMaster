import React from "react";
import GlassIcons from "../components/GlassIcons";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

import {
  FiPlusCircle,
  FiFolder,
  FiFileText,
  FiMessageCircle,
  FiEdit,
  FiAlertCircle,
} from "react-icons/fi";
import { href } from "react-router-dom";

export default function Home() {
  const glassIcons = [
    { icon: <FiPlusCircle />, color: "blue", label: "Create", href: "/create" },
    { icon: <FiFolder />, color: "purple", label: "Your Projects" },
    { icon: <FiFileText />, color: "red", label: "Docs", href: "/docs" }, // 👈 Add href here
    { icon: <FiMessageCircle />, color: "indigo", label: "Ask AI", href: "/askai" },
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


      <Footer />
    </>
  );
}
