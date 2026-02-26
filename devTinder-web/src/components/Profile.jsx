import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Mail, Calendar, User } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      axios
        .get(`${BASE_URL}/profile/view`, { withCredentials: true })
        .then((res) => dispatch(addUser(res.data)))
        .catch(() => navigate("/login"));
    }
  }, [user, dispatch, navigate]);

  if (!user) {
    return (
      <p className="mt-20 text-center text-sm opacity-70">
        Loading your profile...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-16 px-4">
      <div
        className="
          max-w-5xl mx-auto
          bg-base-100/80 backdrop-blur-xl
          rounded-[2.5rem]
          shadow-[0_40px_80px_rgba(0,0,0,0.25)]
          p-10
          transition-transform duration-500
          hover:scale-[1.01]
        "
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={user.photo}
              alt="profile"
              className="
                w-40 h-40 rounded-full object-cover
                ring-4 ring-primary ring-offset-4 ring-offset-base-100
                shadow-xl
              "
            />
            <span className="absolute -bottom-2 -right-2 badge badge-primary">
              PRO
            </span>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="opacity-70 mt-1">
              Full Stack Developer
            </p>

            <Link
              to="/profile/edit"
              className="btn btn-primary btn-sm mt-5"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="divider my-10" />

        {/* ABOUT */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="opacity-80 leading-relaxed">
            {user.about || "No description added yet."}
          </p>
        </section>

        {/* INFO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-primary" />
              <h3 className="font-semibold">Email</h3>
            </div>
            <p className="text-sm opacity-80">
              {user.emailId}
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-2">
              <User size={18} className="text-primary" />
              <h3 className="font-semibold">Age</h3>
            </div>
            <p className="text-sm opacity-80">
              {user.age || "Not specified"}
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={18} className="text-primary" />
              <h3 className="font-semibold">Joined</h3>
            </div>
            <p className="text-sm opacity-80">
              {new Date(user.createdAt).toDateString()}
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="font-semibold mb-2">Skills</h3>
            {user.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="badge badge-outline badge-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm opacity-60">
                No skills added yet
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;