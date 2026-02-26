import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { X, Ban } from "lucide-react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setConnections(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (connectionId, status) => {
    try {
      setProcessingId(connectionId);
      await axios.patch(
        `${BASE_URL}/request/connection/${connectionId}/${status}`,
        {},
        { withCredentials: true }
      );

      // 🔥 remove from UI instantly
      setConnections((prev) =>
        prev.filter((c) => c._id !== connectionId)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-32 opacity-60 text-lg">
        Loading connections...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-extrabold mb-8 tracking-wide">
        ❤️ Your Connections
      </h1>

      {connections.length === 0 ? (
        <p className="opacity-60 text-center text-lg">
          No connections yet 😴
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((c) => {
            const user = c.user || c; // safety

            return (
              <div
                key={c._id}
                className="
                  relative group
                  bg-base-100/70 backdrop-blur-xl
                  rounded-2xl p-5
                  shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                  transition-all duration-300
                  hover:-translate-y-2 hover:rotate-[0.4deg]
                "
              >
                {/* glow */}
                <div className="
                  absolute inset-0 rounded-2xl
                  bg-gradient-to-br from-indigo-500/20 to-purple-600/20
                  opacity-0 group-hover:opacity-100
                  blur-xl transition
                " />

                <div className="relative flex items-center gap-4">
                  <img
                    src={user.photo}
                    alt="profile"
                    className="
                      w-16 h-16 rounded-full object-cover
                      ring ring-primary ring-offset-2
                    "
                  />

                  <div className="flex-1">
                    <h2 className="font-bold text-lg">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm opacity-60">
                      Connected 🎉
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="relative flex justify-end gap-3 mt-5">
                  <button
                    disabled={processingId === c._id}
                    onClick={() => changeStatus(c._id, "removed")}
                    className="
                      btn btn-sm btn-outline btn-error
                      hover:scale-105 transition
                    "
                  >
                    <X size={16} /> Remove
                  </button>

                  <button
                    disabled={processingId === c._id}
                    onClick={() => changeStatus(c._id, "blocked")}
                    className="
                      btn btn-sm btn-outline btn-warning
                      hover:scale-105 transition
                    "
                  >
                    <Ban size={16} /> Block
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;