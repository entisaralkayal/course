import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (password: string) => boolean;
  onCancel: () => void;
}

export function LoginForm({ onSubmit, onCancel }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      setLoading(false);
      return;
    }

    const success = onSubmit(password);
    if (!success) {
      setError('كلمة المرور غير صحيحة');
    }
    setPassword('');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">دخول الإدارة</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-primary disabled:opacity-50"
            >
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 btn btn-secondary disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          منصة إدارة الدورات التدريبية
        </p>
      </div>
    </div>
  );
}
