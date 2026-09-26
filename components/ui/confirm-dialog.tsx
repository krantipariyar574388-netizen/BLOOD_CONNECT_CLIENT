interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="font-serif text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-[#6b5f58] mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#A8201A] hover:bg-[#7A1712] text-white disabled:opacity-60"
          >
            {isLoading ? "Logging out..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;