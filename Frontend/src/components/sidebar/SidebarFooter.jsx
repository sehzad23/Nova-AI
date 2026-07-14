import { Settings } from "lucide-react";
import axios from "axios";
import UserSettingsModal from "../../Model/UserSettingsModal";
import { useState } from "react";

const SidebarFooter = () => {
  const [open, setOpen] = useState(false);
   
  const [user, setUser] = useState(null);

  // user settings
  const handleSettingsClick = async () => {
  setOpen(true);

  try {
    setOpen(true);
    const response = await axios.get(
      "http://localhost:3000/api/auth/user",
      {
        withCredentials: true,
      }
    );

    setUser(response.data.user);
    console.log(response.data.user);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <button
         onClick={handleSettingsClick}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-6 text-[#d7d7d7] border-t border-white/30 transition hover:bg-[#242424] hover:text-white"
      >
        <Settings size={18} />
        Settings
      </button>

      <UserSettingsModal open={open} onClose={() => setOpen(false)} user={user} />
    </>
  );
};

export default SidebarFooter;
