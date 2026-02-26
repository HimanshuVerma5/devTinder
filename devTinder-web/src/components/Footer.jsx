// Footer.jsx
import React from "react";
import { Github, Linkedin, Mail, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full flex-shrink-0 relative">
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 
                  backdrop-blur-xl bg-black/70 rounded-t-3xl border-t border-pink-500 shadow-lg">
    {/* Left */}
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 shadow-lg">
        <Code className="text-white" size={22} />
      </div>
      <div>
        <p className="font-semibold text-sm">DevTinder © {new Date().getFullYear()}</p>
        <p className="text-xs opacity-70">Match • Connect • Build</p>
      </div>
    </div>

    {/* Center */}
    <div className="text-center text-xs font-mono tracking-wider opacity-60">
      Created by <span className="font-semibold opacity-90">Himanshu Verma</span>
    </div>

    {/* Right */}
    <nav className="flex gap-3">
      <a href="https://github.com/HimanshuVerma5" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-black/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-pink-500 hover:text-white transition-all duration-300 hover:scale-110">
        <Github size={18} />
      </a>
      <a href="https://linkedin.com/in/himanshu-verma-bu/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-black/50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-700 hover:text-white transition-all duration-300 hover:scale-110">
        <Linkedin size={18} />
      </a>
      <a href="https://leetcode.com/Radhe_Coder/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-black/50 hover:bg-gradient-to-br hover:from-orange-500 hover:to-yellow-500 hover:text-white transition-all duration-300 hover:scale-110">
        <Code size={18} />
      </a>
      <a href="mailto:himanshuverma57251@gmail.com" className="p-3 rounded-full bg-black/50 hover:bg-gradient-to-br hover:from-red-500 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110">
        <Mail size={18} />
      </a>
    </nav>
  </div>
</footer>

  );
};

export default Footer;
