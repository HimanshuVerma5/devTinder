import React, { useState } from "react";
import { Code, AlertTriangle, Loader2 } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
  `${BASE_URL}/login`,
  { emailId, password },
  { withCredentials: true }
);

console.log("LOGIN API RESPONSE 👉", res.data);
dispatch(addUser(res.data.data)); // 👈 sirf user object
 navigate("/feed");

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Invalid email or password. Please try again.";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md rounded-2xl bg-base-100 shadow-xl border border-base-300 p-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-md">
            <Code className="text-white" size={26} />
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            Login to DevTinder
          </h2>
          <p className="text-sm opacity-70 text-center">
            Match, connect and build with developers
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 flex items-center gap-3 p-3
                          rounded-xl bg-error/10
                          border border-error/30 text-error text-sm">
            <AlertTriangle size={18} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            value={emailId}
            required
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-center opacity-60">
          Don’t have an account?{" "}
          <span
  className="link link-primary cursor-pointer"
  onClick={() => navigate("/signup")}
>
  Sign up
</span>

        </p>
      </div>
    </div>
  );
};

export default Login;
