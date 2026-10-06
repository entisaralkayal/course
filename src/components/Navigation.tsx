import { BookOpen, LogOut, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  isAdmin: boolean;
  onAdminClick: () => void;
  onHomeClick: () => void;
  onLogout?: () => void;
}

export function Navigation({ isAdmin, onAdminClick, onHomeClick, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
          <BookOpen className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">مهارات المستقبل</h1>
        </div>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <>
              <button
                onClick={onAdminClick}
                className="btn btn-secondary flex items-center gap-2"
              >
                <LayoutDashboard size={20} />
                لوحة التحكم
              </button>
              <button
                onClick={onLogout}
                className="btn btn-secondary flex items-center gap-2"
              >
                <LogOut size={20} />
                تسجيل خروج
              </button>
            </>
          )}
          {!isAdmin && (
            <button
              onClick={onAdminClick}
              className="btn btn-primary"
            >
              دخول الإدارة
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
