import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteConfirm({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading
}: DeleteConfirmProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-600" size={28} />
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 btn btn-danger disabled:opacity-50"
          >
            {isLoading ? 'جاري الحذف...' : 'حذف'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 btn btn-secondary disabled:opacity-50"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
