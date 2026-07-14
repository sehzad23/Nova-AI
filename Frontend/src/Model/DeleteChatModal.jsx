import { Trash2 } from "lucide-react";

const DeleteChatModal = ({
  isOpen,
  onClose,
  onConfirm,
  chatTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 md:p-[20px]">
      <div className="w-full max-w-md rounded-xl bg-[#2f2f2f] p-6 shadow-xl">

        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-red-500/10 p-2">
            <Trash2 size={20} className="text-red-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Delete Chat
            </h2>

            <p className="mt-1 text-sm text-[#b4b4b4]">
              Are you sure you want to delete
              <span className="font-medium text-white">
                {" "}{chatTitle}
              </span>
              ?
            </p>
          </div>
        </div>

        <p className="mb-6 text-sm text-[#8b8b8b]">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#3a3a3a] px-4 py-2 text-sm text-white hover:bg-[#4a4a4a]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteChatModal;