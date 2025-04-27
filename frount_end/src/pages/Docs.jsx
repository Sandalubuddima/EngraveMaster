// src/pages/Docs.jsx
import React from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function Docs() {
  return (
        <>
        <Navbar /><br /><br />
    <div className="min-h-screen px-6 py-12 bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">EngraveMaster Documentation</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🧠 Getting Started</h2>
          <p className="text-base leading-relaxed">
            Welcome to EngraveMaster! This documentation will guide you through setting up and using the software.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">⚙️ Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>AI-powered laser settings</li>
            <li>Wood-type detection and optimization</li>
            <li>Real-time preview before engraving</li>
            <li>Smart job history management</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🚀 How to Use</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Upload or select your wood type.</li>
            <li>Adjust or accept suggested laser settings.</li>
            <li>Preview your engraving job.</li>
            <li>Click "Start Engraving" to begin.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📂 File Support</h2>
          <p>Supported file formats include: <code>.svg</code>, <code>.png</code>, <code>.dxf</code></p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">💬 Need Help?</h2>
          <p>Use the “Ask AI” button in the sidebar or contact our support team.</p>
        </section>

        <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎥 Watch EngraveMaster Tutorial</h2>
            <div className="w-full md:w-[800px] h-[450px] mx-auto rounded-xl overflow-hidden shadow-lg">
                <iframe
                src="https://www.youtube.com/embed/SVGuBIJqkQY"
                title="EngraveMaster Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                ></iframe>
            </div>
        </section>


      </div>
    </div>
        <Footer />
        </>
  );
}
