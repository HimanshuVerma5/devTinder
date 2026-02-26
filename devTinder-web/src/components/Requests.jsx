import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get(`${BASE_URL}/user/requests/received`, {
      withCredentials: true,
    });
    setRequests(res.data.data);
  };

  const reviewRequest = async (status, requestId) => {
    await axios.post(
      `${BASE_URL}/request/review/${status}/${requestId}`,
      {},
      { withCredentials: true }
    );
    fetchRequests();
  };

  if (requests.length === 0) {
    return (
      <p className="text-center mt-16 text-gray-300 text-lg">
        No pending requests
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 px-4">
      {requests.map((r) => (
        <div
          key={r._id}
          className="p-5 bg-gray-900 rounded-2xl flex justify-between items-center shadow-lg backdrop-blur-md border border-gray-700"
        >
          {/* User Info */}
          <div>
            <h3 className="font-bold text-white text-lg">{r.fromUserId.firstName}</h3>
            <p className="text-sm opacity-70 text-gray-300">{r.fromUserId.about}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => reviewRequest("accepted", r._id)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold hover:scale-105 transform transition-all shadow-md"
            >
              Accept
            </button>

            <button
              onClick={() => reviewRequest("rejected", r._id)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold hover:scale-105 transform transition-all shadow-md"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
