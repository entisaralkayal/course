import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LoginForm } from './components/LoginForm';
import { Home } from './pages/Home';
import { CourseDetails } from './pages/CourseDetails';
import { AdminDashboard } from './pages/AdminDashboard';
import { useCourses } from './hooks/useCourses';
import { useAuth } from './hooks/useAuth';
import './styles/globals.css';

type View = 'home' | 'course-details' | 'admin' | 'login';

function App() {
  const { courses, loading, addCourse, updateCourse, deleteCourse, getCourseById } = useCourses();
  const { loggedIn, login, logout } = useAuth();

  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleViewCourse = (id: string) => {
    setSelectedCourseId(id);
    setCurrentView('course-details');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleAdminClick = () => {
    if (loggedIn) {
      setCurrentView('admin');
      window.scrollTo(0, 0);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (password: string): boolean => {
    const success = login(password);
    if (success) {
      setShowLoginModal(false);
      setCurrentView('admin');
      window.scrollTo(0, 0);
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const selectedCourse = selectedCourseId ? getCourseById(selectedCourseId) : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isAdmin={loggedIn}
        onAdminClick={handleAdminClick}
        onHomeClick={handleGoHome}
        onLogout={handleLogout}
      />

      <main className="min-h-[calc(100vh-80px)]">
        {currentView === 'home' && (
          <Home
            courses={courses}
            isLoading={loading}
            onCourseSelect={handleViewCourse}
          />
        )}

        {currentView === 'course-details' && (
          <CourseDetails
            course={selectedCourse}
            onBack={handleGoHome}
          />
        )}

        {currentView === 'admin' && loggedIn && (
          <AdminDashboard
            courses={courses}
            onAddCourse={addCourse}
            onUpdateCourse={updateCourse}
            onDeleteCourse={deleteCourse}
            onBack={handleGoHome}
          />
        )}
      </main>

      {showLoginModal && (
        <LoginForm
          onSubmit={handleLogin}
          onCancel={() => setShowLoginModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container text-center">
          <p>© 2024 مهارات المستقبل - جميع الحقوق محفوظة</p>
          <p className="text-gray-400 text-sm mt-2">منصة الدورات التدريبية الرقمية</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
