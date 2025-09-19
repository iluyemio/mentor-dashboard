import React, { useState } from "react";
import { FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import { COLORS } from "../components/Color"; // adjust path if needed

const NotificationsPage = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate(); // ✅ hook for navigation

  // Example notifications
  const notifications = [
    { id: 1, type: "info", message: "New mentee assignment submitted.", date: "2025-09-15", details: "Glory submitted Assignment 2 for review in Web Development track." },
    { id: 2, type: "warning", message: "Upcoming session with John tomorrow at 10 AM.", date: "2025-09-16", details: "Scheduled mentorship session with John Doe on frontend basics." },
    { id: 3, type: "success", message: "Your average mentor rating has increased!", date: "2025-09-17", details: "Congrats! Your mentees have rated your recent sessions highly. Average rating is now 4.8 ⭐." },
    { id: 4, type: "info", message: "Admin shared new resources for mentors.", date: "2025-09-18", details: "Check out the new mentorship resources uploaded to the resource center." },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-600" />;
      case "warning":
        return <FaExclamationCircle className="text-red-600" />;
      default:
        return <FaInfoCircle className="text-blue-600" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/")} // ✅ Go back to home/dashboard
          className="flex items-center gap-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaArrowLeft className="text-gray-700" />
          <span className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Back to Dashboard
          </span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.dark }}>
        All Notifications
      </h1>

      <div className="bg-white rounded-lg shadow-md divide-y">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-3 p-4 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            <div className="mt-1">{getIcon(note.type)}</div>
            <div>
              <p className="text-sm text-gray-800">{note.message}</p>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-2" style={{ color: COLORS.dark }}>
              Notification Details
            </h2>
            <div className="flex items-center gap-2 mb-4">
              {getIcon(selectedNote.type)}
              <span className="text-sm text-gray-700">{selectedNote.message}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedNote.details}</p>
            <p className="text-xs text-gray-400">Date: {selectedNote.date}</p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 rounded bg-[#1CA8CB] text-white font-medium hover:bg-[#148da8] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
