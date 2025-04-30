import React, { useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    // Check for dark mode preference in localStorage or system preference
    if (localStorage.theme === "dark" || 
        (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-orange-500 dark:text-orange-400">EngraveMaster</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Home</a>
            <a href="/about" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">About</a>
            <a href="/services" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Services</a>
            <a href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Contact</a>
            <a href="/login" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Login</a>
            <a href="/signup" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Signup</a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 text-gray-700 dark:text-yellow-300 hover:text-orange-500 transition-colors"
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
              className="text-gray-800 dark:text-gray-200 hover:text-orange-500"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 shadow-md bg-gray-100 dark:bg-gray-800 transition-colors">
          <a href="/" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Home</a>
          <a href="/about" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">About</a>
          <a href="/services" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Services</a>
          <a href="/contact" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Contact</a>
          <a href="/login" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Login</a>
          <a href="/signup" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Signup</a>
        </div>
      )}
    </nav>
  );
}