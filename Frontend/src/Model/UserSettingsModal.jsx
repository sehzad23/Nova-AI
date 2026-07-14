import { logoutUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserSettingsModal = ({ open, onClose, user }) => {
  const navigate = useNavigate();
  // Function to handle logout

  const handleLogout = async () => {
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/auth/logout",
      //   {},
      //   { withCredentials: true },
      // );
      const response = await logoutUser()
      console.log("Logout successful", response);
      onClose(); // Close the modal after logout
      toast.success("Signed out", {
        description: "See you again soon!",
      });
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed", err.response?.data || err.message);
    }
  };

  return (
    // Overlay
    <div
      className={`fixed inset-0 flex items-end justify-center z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />

      {/* Panel */}
      <div
        className={`w-full max-w-md rounded-t-xl bg-[#202123] p-6 transform transition-transform duration-300 ease-out z-50 ${open ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-600" />

        <h2 className="text-xl font-semibold text-white">Nova AI</h2>

        <p className="mt-4 text-gray-300">
          {user
            ? `${user?.fullName?.firstName} ${user?.fullName?.lastName}`
            : "User not available"}
        </p>

        <p className="text-gray-400">
          {user ? user.email : "Email not available"}
        </p>

        <button
          className="mt-6 cursor-pointer rounded-lg bg-red-500 px-4 py-1 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSettingsModal;
