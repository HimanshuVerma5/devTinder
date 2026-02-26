import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeedUser } from "../utils/feedSlice";
import UserCard from "./userCard";
import { X, Heart } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 🔒 HARD LOCK (MOST IMPORTANT)
  const actionLockRef = useRef(false);

  const threshold = 120;

  /* ---------- FETCH FEED ---------- */
  const getFeed = async () => {
    const res = await axios.get(`${BASE_URL}/feed`, {
      withCredentials: true,
    });
    dispatch(addFeed(res.data));
  };

  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);

  /* ---------- ACTION ---------- */
  const handleAction = async (status) => {
  if (actionLockRef.current) return;
  actionLockRef.current = true;

  const user = feed[0];
  if (!user) {
    actionLockRef.current = false;
    return;
  }

  try {
    setLoading(true);

    // Determine endpoint based on action
    const endpoint =
      status === "interested"
        ? "http://localhost:7777/request/send/interested/"
        : "http://localhost:7777/request/send/ignored/";

    await axios.post(endpoint + user._id, {}, { withCredentials: true });

    dispatch(removeFeedUser(user._id));
  } catch (err) {
    if (err.response?.data?.code === "REQUEST_EXISTS") {
      alert("Already done with this profile 🙂");
    }
    dispatch(removeFeedUser(user._id));
  } finally {
    setLoading(false);
    setDragX(0);
    setTimeout(() => {
      actionLockRef.current = false;
    }, 0);
  }
};

  /* ---------- SWIPE ---------- */
  const onMouseDown = () => {
    if (loading || actionLockRef.current) return;
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!isDragging || loading || actionLockRef.current) return;
    setDragX((prev) => prev + e.movementX);
  };

  const onMouseUp = () => {
    if (loading || actionLockRef.current) {
      setDragX(0);
      setIsDragging(false);
      return;
    }

    setIsDragging(false);

    if (dragX > threshold) handleAction("interested");
    else if (dragX < -threshold) handleAction("ignored");
    else setDragX(0);
  };

  /* ---------- EMPTY STATE ---------- */
  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center mt-32 gap-4">
        <h2 className="text-xl font-semibold">No more profiles 👀</h2>
        <p className="opacity-60">Check connections or come back later</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-20 gap-10 select-none">

      {/* CARD */}
      <div
        className={`transition-transform duration-300 cursor-grab ${
          loading ? "pointer-events-none" : ""
        }`}
        style={{
          transform: `translateX(${dragX}px) rotate(${dragX / 14}deg)`,
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <UserCard user={feed[0]} />
      </div>

     {/* BUTTONS */}
<div className="flex gap-12 mt-6 justify-center">
  {/* Ignore Button */}
  <button
    disabled={loading}
    onClick={(e) => {
      e.stopPropagation();
      handleAction("ignored");
    }}
    className={`
      w-16 h-16 rounded-full 
      bg-gradient-to-br from-red-500 to-pink-500
      shadow-[0_4px_15px_rgba(255,0,100,0.5)]
      flex items-center justify-center
      transform-gpu transition-all duration-300
      hover:scale-110 hover:rotate-3
      ${loading ? "opacity-50 pointer-events-none" : ""}
    `}
  >
    <X size={28} className="text-white" />
  </button>

  {/* Interested Button */}
  <button
    disabled={loading}
    onClick={(e) => {
      e.stopPropagation();
      handleAction("interested");
    }}
    className={`
      w-16 h-16 rounded-full 
      bg-gradient-to-br from-blue-500 to-indigo-600
      shadow-[0_4px_15px_rgba(0,200,255,0.5)]
      flex items-center justify-center
      transform-gpu transition-all duration-300
      hover:scale-110 hover:-rotate-3
      ${loading ? "opacity-50 pointer-events-none" : ""}
    `}
  >
    <Heart size={28} className="text-white" />
  </button>
</div>

    </div>
  );
};

export default Feed;