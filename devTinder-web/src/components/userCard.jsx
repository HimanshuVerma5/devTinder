import React from "react";
import { X, Heart, Briefcase, Mail } from "lucide-react";

const DEFAULT_IMAGE = "https://i.pravatar.cc/600";

const UserCard = ({ user }) => {
  return (
    <div
      className="
        w-[340px] h-[460px]
        bg-gradient-to-br from-blue-900 via-black to-pink-600
        rounded-3xl
        shadow-[0_40px_80px_rgba(0,0,0,0.5)]
        overflow-hidden
        cursor-grab
        active:cursor-grabbing
        transform-gpu
        hover:scale-105
        hover:rotate-1
        transition-all
        duration-500
        relative
      "
    >
      {/* Neon Floating Circles */}
      <div className="absolute -top-8 -left-6 w-20 h-20 rounded-full bg-pink-500 opacity-20 blur-3xl animate-spin-slow"></div>
      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-indigo-400 opacity-20 blur-2xl animate-spin-reverse"></div>

      <img
        src={user.photo || DEFAULT_IMAGE}
        alt={user.firstName}
        className="w-full h-[65%] object-cover rounded-t-3xl shadow-inner"
      />

      <div className="p-5 text-white">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-300">
          {user.firstName}, {user.age}
        </h2>

        <p className="opacity-70 mt-2 line-clamp-3 text-sm">
          {user.about}
        </p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {user.skills?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full border-2 border-pink-400 text-pink-400 text-xs font-semibold hover:bg-pink-400 hover:text-black transition-all duration-300 cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      </div>
  );
};

export default UserCard;
