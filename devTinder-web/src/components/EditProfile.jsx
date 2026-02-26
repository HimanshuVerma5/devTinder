import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./userCard";

const EditProfile = () => {
  const reduxUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD USER (Redux OR Backend)
  useEffect(() => {
    const loadUser = async () => {
      try {
        let user = reduxUser;

        if (!user) {
          const res = await axios.get(
            `${BASE_URL}/profile/view`,
            { withCredentials: true }
          );
          user = res.data;
          dispatch(addUser(user));
        }

        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          age: user.age || "",
          gender: user.gender || "",
          about: user.about || "",
          photo: user.photo || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadUser();
  }, []);

  if (!formData) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        formData,
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error("Update failed", err);
      alert("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Edit Profile
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-base-100 p-6 rounded-xl shadow-xl border">
          <div className="flex flex-col gap-3">
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="input input-bordered" />
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="input input-bordered" />
            <input name="age" type="number" value={formData.age} onChange={handleChange} className="input input-bordered" />
            <select name="gender" value={formData.gender} onChange={handleChange} className="select select-bordered">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <textarea name="about" value={formData.about} onChange={handleChange} className="textarea textarea-bordered" />
            <input name="photo" value={formData.photo} onChange={handleChange} className="input input-bordered" />

            <button onClick={handleSave} disabled={loading} className="btn btn-primary">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <UserCard user={formData} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
