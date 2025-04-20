import React from "react";
import GlassIcons from "../components/GlassIcons";
import Navbar from "../components/PageNavbar";

import {
    FiFileText,
    FiBook,
    FiHeart,
    FiCloud,
    FiEdit,
    FiBarChart2,
  } from "react-icons/fi";
  
  export default function Home() {
    const glassIcons = [
      { icon: <FiFileText />, color: "blue", label: "Files" },
      { icon: <FiBook />, color: "purple", label: "Books" },
      { icon: <FiHeart />, color: "red", label: "Health" },
      { icon: <FiCloud />, color: "indigo", label: "Weather" },
      { icon: <FiEdit />, color: "orange", label: "Notes" },
      { icon: <FiBarChart2 />, color: "green", label: "Stats" },
    ];
  
    return (
      <>
        {/* Sticky Top Navbar */}
        <Navbar />
  
        {/* Main Page Content */}
        <div className="min-h-screen pt-20 pb-20 px-4 flex flex-col items-center justify-start bg-gradient-to-br from-[#84240c] to-[#d6b2a5] dark:from-[#1C1C1C] dark:to-[#3c2f2f] transition-colors duration-300">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center text-[#FF6F3C] dark:text-[#FF6F3C] mb-8">
            Welcome to EngraveMaster
          </h1>
  
          {/* Glass Icons Section */}
          <div className="w-full max-w-5xl">
            <GlassIcons items={glassIcons} className="z-10" />
          </div>
        </div>
      </>
    );
  }