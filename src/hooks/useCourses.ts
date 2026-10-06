import { useState, useEffect } from 'react';
import { Course, CoursesData } from '../lib/types';
import { saveCourses, getCourses } from '../lib/storage';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // تحميل البيانات الأولية من public/data.json
  useEffect(() => {
    const initializeCourses = async () => {
      setLoading(true);
      try {
        // محاولة الحصول على البيانات من localStorage أولاً
        const savedCourses = getCourses();
        if (savedCourses && savedCourses.length > 0) {
          setCourses(savedCourses);
          setLoading(false);
          return;
        }

        // إذا لم توجد بيانات محفوظة، حمّل من الملف الأولي
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('فشل تحميل البيانات');

        const data: CoursesData = await response.json();
        setCourses(data.courses);
        saveCourses(data.courses);
      } catch (error) {
        console.error('خطأ في تحميل الدورات:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeCourses();
  }, []);

  const addCourse = (newCourse: Omit<Course, 'id'>): Course => {
    const id = Date.now().toString();
    const course: Course = { ...newCourse, id };
    const updated = [...courses, course];
    setCourses(updated);
    saveCourses(updated);
    return course;
  };

  const updateCourse = (id: string, updatedData: Partial<Course>): void => {
    const updated = courses.map(c =>
      c.id === id ? { ...c, ...updatedData } : c
    );
    setCourses(updated);
    saveCourses(updated);
  };

  const deleteCourse = (id: string): void => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    saveCourses(updated);
  };

  const getCourseById = (id: string): Course | undefined => {
    return courses.find(c => c.id === id);
  };

  return {
    courses,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById
  };
}
