import React from "react";

const skills = [
  { name: "React", info: "UI library for building interactive interfaces" },
  { name: "Redux", info: "State management for React applications" },
  { name: "Node.js", info: "Backend runtime environment" },
  { name: "Express", info: "Fast Node.js framework" },
  { name: "MongoDB", info: "NoSQL database" },
  { name: "Tailwind", info: "Utility-first CSS framework" },
];

const CreatorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-pink-600 p-6">
      <div className="perspective-1000">
        <div className="max-w-4xl mx-auto transform-style-preserve-3d transition-transform duration-500 hover:rotate-y-3 hover:rotate-x-3">
          <div className="bg-gradient-to-br from-black/80 via-blue-900 to-pink-800 shadow-2xl rounded-3xl p-10 transform-gpu hover:scale-105 transition-transform duration-500 relative">

            {/* PROFILE IMAGE */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full ring-4 ring-pink-400 shadow-xl">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQHxiVaCPwIR3Q/profile-displayphoto-crop_800_800/B56ZjMJKPPHQAM-/0/1755771611930?e=1772668800&v=beta&t=vKdYar6oXa67JcECgV7OSw4R1s1hoGbgijgmKYPJSvU"
                alt="Himanshu Verma"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full shadow-[0_0_25px_5px_rgba(255,105,180,0.5)] animate-pulse"></div>
            </div>

            {/* NAME */}
            <h1 className="mt-24 text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-pink-600 text-center animate-textGlow">
              Himanshu Verma
            </h1>
            <p className="opacity-70 mb-6 text-lg text-center animate-pulse">
              Full Stack Developer • Creator of DevTinder
            </p>

            {/* ABOUT */}
            <section className="mb-6 group relative">
              <h2 className="text-2xl font-semibold mb-2 text-blue-400 cursor-pointer">
                About
              </h2>
              <p className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Full Stack Developer with strong experience in React, Node.js,
                MongoDB, and scalable system design. Passionate about clean UI,
                secure authentication, and building real-world products.
              </p>
            </section>

            {/* SKILLS */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-blue-400">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="relative group">
                    <span
                      className="px-3 py-1 rounded-full border-2 border-blue-400 text-blue-400 hover:bg-pink-400 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      {skill.name}
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-50">
                      {skill.info}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* LINKS */}
            <section className="mt-4">
              <h2 className="text-2xl font-semibold mb-2 text-blue-400">
                Links
              </h2>
              <div className="flex gap-6 text-lg justify-center">
                <a
                  href="https://github.com/HimanshuVerma5"
                  target="_blank"
                  className="link hover:text-pink-400 transition-colors hover:scale-110"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/himanshu-verma-bu/"
                  target="_blank"
                  className="link hover:text-pink-400 transition-colors hover:scale-110"
                >
                  LinkedIn
                </a>
              </div>
            </section>

            {/* FUN 3D SPHERE ANIMATION */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-pink-500 opacity-30 blur-3xl animate-spin-slow"></div>
            <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-400 opacity-20 blur-2xl animate-spin-reverse"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
