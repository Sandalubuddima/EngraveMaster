import React, { useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    const root = document.documentElement;

    if (localStorage.theme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else if (localStorage.theme === "light") {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", systemPrefersDark);
      setIsDark(systemPrefersDark);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#e7cfb4] dark:bg-[#1C1C1C] shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-[#FF6F3C] dark:text-[#FF6F3C]">EngraveMaster</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C] font-medium">Home</a>
            <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C] font-medium">About</a>
            <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C] font-medium">Services</a>
            <a href="#" className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C] font-medium">Contact</a>
            <a href="/login" className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C] font-medium">Login</a>
            <a href="/signup" className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C] font-medium">Signup</a>


            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 text-gray-700 dark:text-yellow-300 hover:text-[#FF6F3C] transition"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-3 text-gray-800 dark:text-yellow-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 shadow-md bg-[#e7cfb4] dark:bg-[#1C1C1C] transition-colors">
          <a href="#" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]">Home</a>
          <a href="#" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]">About</a>
          <a href="#" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]">Services</a>
          <a href="#" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]">Contact</a>
          <a href="#" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]">Login</a>
          <a href="#" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-[#FF6F3C]">Signup</a>
          
        </div>
      )}
    </nav>
  );
}
