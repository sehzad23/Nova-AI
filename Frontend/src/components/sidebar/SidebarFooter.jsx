import { Settings } from "lucide-react";
import {getUser} from "../../api/auth.api"
import UserSettingsModal from "../../Model/UserSettingsModal";
import { useState } from "react";

const SidebarFooter = () => {
  const [open, setOpen] = useState(false);
   
  const [user, setUser] = useState(null);

  // user settings
  const handleSettingsClick = async () => {
    setOpen(true);

    try {
      const response = await getUser();

      setUser(response.user ?? response.data?.user ?? null);
      console.log(response.user ?? response.data?.user);
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
