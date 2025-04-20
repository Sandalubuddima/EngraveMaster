import React from "react";
import Dock from "../components/Dock";
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";

export default function Homepage() {
  const items = [
    { icon: <VscHome size={25} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={25} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={25} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={25} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10">Welcome to EngraveMaster</h1>
      
      <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}
