import React from "react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#e7cfb4] dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-200 py-10 mt-10 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo and Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="EngraveMaster Logo" className="h-12 w-12 mb-2" />
          <h2 className="text-lg font-semibold text-[#FF6F3C]">EngraveMaster</h2>
          <p className="text-sm text-center md:text-left mt-2">
            Elevating precision in laser engraving.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#FF6F3C] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#FF6F3C] transition">About</a></li>
            <li><a href="#" className="hover:text-[#FF6F3C] transition">Docs</a></li>
            <li><a href="#" className="hover:text-[#FF6F3C] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <p className="text-sm">📧 support@engravemaster.com</p>
          <p className="text-sm">📞 +94 77 123 4567</p>
          <p className="text-sm">🏠 Colombo, Sri Lanka</p>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} EngraveMaster. All rights reserved.
      </div>
    </footer>
  );
}
