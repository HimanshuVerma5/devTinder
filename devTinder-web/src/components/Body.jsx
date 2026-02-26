// Body.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        navigate("/login");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-black to-pink-600 text-white">
  <NavBar />

  {/* Page content scrollable */}
  <main className="flex-1 overflow-auto px-6 md:px-12 py-6">
    <Outlet />
  </main>

  <Footer />
</div>

  );
};

export default Body;

