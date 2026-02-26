import React, { useState } from "react";
import { Code, AlertTriangle, User, LogOut, Flame, Users, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogOut = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch {
      setError("Logout failed");
    }
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-900 via-black to-pink-600 border-b border-gray-800 shadow-xl">
      <div className="navbar max-w-7xl mx-auto px-6 min-h-[70px] flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 shadow-[0_6px_20px_rgba(255,105,180,0.5)] hover:scale-110 hover:rotate-3 transition-all cursor-pointer transform-gpu">
            <Code className="text-white" size={20} />
          </div>
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-pink-400 to-pink-600 bg-clip-text text-transparent hover:scale-105 hover:rotate-1 transition-all transform-gpu"
          >
            DevTinder
          </Link>
        </div>

        {/* CENTER */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            {[
              { name: "Feed", icon: <Flame size={16} />, path: "/feed" },
              { name: "Connections", icon: <Users size={16} />, path: "/connections" },
              { name: "Requests", icon: <Bell size={16} />, path: "/requests" },
              { name: "Creator", icon: <User size={16} />, path: "/creator/himanshu-verma" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                    flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all transform-gpu
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-xl scale-105"
                      : "text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 hover:scale-105 hover:rotate-1"
                    }
                  `
                }
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* RIGHT */}
        {user && (
          <div className="dropdown dropdown-end ml-4">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:scale-110 hover:rotate-1 transform-gpu transition-all cursor-pointer"
            >
              <div className="w-12 rounded-full ring ring-pink-400 ring-offset-2 hover:ring-offset-4 transition-all">
                <img src={user.photo} alt="user" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="
                menu dropdown-content bg-black/90 rounded-2xl w-60 p-3 shadow-[0_16px_40px_rgba(255,105,180,0.25)]
                mt-3 backdrop-blur-md border border-pink-500
              "
            >
              <li className="px-2 text-sm font-bold text-blue-400">{user.firstName} {user.lastName}</li>
              <li className="px-2 text-xs opacity-60 text-gray-300">{user.emailId}</li>
              <div className="divider my-2 border-gray-700" />
              <li>
                <Link to="/profile" className="hover:text-pink-400 transition-colors flex items-center gap-2">
                  <User size={16} /> My Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="text-red-500 hover:text-pink-400 hover:scale-105 transition-all flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
