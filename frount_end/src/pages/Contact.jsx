import Navbar from "../components/PageNavbar";
import SplashCursor from "../components/SplashCursor";
import Footer from "../components/Footer";

// src/pages/Contact.jsx
export default function Contact() {
    return (
        <>
<Navbar />
      <div className="min-h-screen px-6 py-16 bg-[#e7cfb4] dark:bg-[#1C1C1C] text-[#563232] dark:text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Contact Us</h1>
  
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#ffc18c] dark:bg-[#84240c] p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p>support@engraveMaster.com</p>
          </div>
          <div className="bg-[#ffc18c] dark:bg-[#84240c] p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p>+94 77 123 4567</p>
          </div>
          <div className="bg-[#ffc18c] dark:bg-[#84240c] p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>No. 25, Main Street, Colombo, Sri Lanka</p>
          </div>
        </div>
  
        {/* Contact Form */}
        <form className="max-w-2xl mx-auto bg-white dark:bg-[#2e2e2e] p-8 rounded-2xl shadow-xl">
          <div className="mb-6">
            <label className="block mb-2 font-medium">Your Name</label>
            <input type="text" placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-[#fdf6f0] dark:bg-[#444] text-black dark:text-white" />
          </div>
  
          <div className="mb-6">
            <label className="block mb-2 font-medium">Email Address</label>
            <input type="email" placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-[#fdf6f0] dark:bg-[#444] text-black dark:text-white" />
          </div>
  
          <div className="mb-6">
            <label className="block mb-2 font-medium">Message</label>
            <textarea rows="5" placeholder="Write your message here..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-[#fdf6f0] dark:bg-[#444] text-black dark:text-white"></textarea>
          </div>
  
          <button
            type="submit"
            className="bg-[#da6d42] hover:bg-[#84240c] text-white font-semibold py-3 px-6 rounded-xl transition duration-300 w-full">
            Send Message
          </button>
        </form>
      </div>
      <SplashCursor />
      <Footer />
      </>
    );
  }
  