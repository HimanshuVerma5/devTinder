import { useNavigate } from "react-router-dom";
import { Code2, Users, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-pink-600 text-white flex flex-col">

      {/* NAV */}
      <div className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2 transform-gpu hover:scale-105 hover:rotate-3 transition-all duration-500">
          <Code2 className="text-pink-400 animate-pulse" />
          DevTinder
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-transform hover:scale-105 hover:rotate-1 transform-gpu"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:scale-105 hover:rotate-1 transform-gpu transition-all"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 relative">
        {/* Floating circles */}
        <div className="absolute -top-20 -left-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute -bottom-16 right-10 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-2xl animate-spin-reverse"></div>

        <h2 className="text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-pink-600 animate-textGlow">
          Match. Connect. <br /> Build with Developers 
        </h2>

        <p className="max-w-xl text-lg opacity-90 mb-8 animate-fadeIn">
          DevTinder helps developers find like-minded people to collaborate,
          learn, and build amazing products together.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-lg hover:scale-110 hover:-translate-y-1 transform-gpu transition-all duration-500"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl border border-white text-lg shadow-lg hover:bg-pink-500 hover:text-white hover:scale-110 hover:-translate-y-1 transform-gpu transition-all duration-500"
          >
            I already have an account
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-14">
        <Feature
          icon={<Users size={28} className="text-blue-400" />}
          title="Developer Network"
          desc="Connect with developers across the globe"
        />
        <Feature
          icon={<Zap size={28} className="text-pink-400" />}
          title="Fast Matching"
          desc="Swipe and match with similar interests"
        />
        <Feature
          icon={<Code2 size={28} className="text-indigo-400" />}
          title="Build Together"
          desc="Collaborate on real-world projects"
        />
      </div>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur shadow-xl transform-gpu hover:scale-105 hover:-rotate-2 transition-all duration-500">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">{desc}</p>
  </div>
);

export default Landing;
