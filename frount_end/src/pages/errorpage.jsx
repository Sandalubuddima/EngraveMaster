  // src/pages/ErrorPage.jsx
import FuzzyText from "../components/FuzzyText"; // Adjust the path if needed
import { useState } from "react";

export default function ErrorPage() {
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1C1C] to-[#2F2F2F] text-white">
      <div className="mb-4">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
        >
          404
        </FuzzyText>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl shadow-md"
      >
        Go Home
      </a>
    </div>
  );
}
