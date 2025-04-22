import CircularGallery from '../components/CircularGallery'
import Navbar from "../components/PageNavbar";
import SplashCursor from "../components/SplashCursor";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-br from-[#e5e1e0] to-[#d6b2a5] dark:from-[#1c1c1c] dark:to-[#563232] text-[#e7cfb4] font-sans">

      <div className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-[#84240c] dark:text-[#ffc18c]">
                About Us
            </h1>

               <p className="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-6 text-[#1c1c1c] dark:text-[#e7cfb4]">
                Welcome to <span className="text-[#84240c] dark:text-[#ffc18c] font-semibold">EngraveMaster</span> — where tradition meets technology.
                We specialize in smart laser engraving solutions for wood, blending artistic precision with AI-powered automation.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-12 text-[#1c1c1c] dark:text-[#e7cfb4]">
                Our mission is to empower creators and industries with intelligent, beautiful, and sustainable engraving.
                Whether you're an artist, hobbyist, or industrial engraver, EngraveMaster is built to elevate your workflow.
                </p>

        {/* Gallery Section */}
        <div className="rounded-2xl shadow-lg overflow-hidden mb-16">
          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.06}
              font="bold 28px DM Sans"
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-[#ffc18c] text-[#563232] p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              To revolutionize the engraving industry with smart technology, ensuring precision, speed, and elegance.
            </p>
          </div>
          <div className="bg-[#da6d42] text-white p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p>
              A world where creative expression meets sustainable tech—one engraved masterpiece at a time.
            </p>
          </div>
          <div className="bg-[#ffc18c] text-[#563232] p-6 rounded-xl shadow-md hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <p>
              Innovation, sustainability, craftsmanship, and user empowerment are the heart of everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
    <SplashCursor />
    <Footer />
    </>
  )
}
