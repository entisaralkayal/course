import { Course } from './types';

export const ADMIN_PASSWORD = 'admin123'; // غيّر هذا قبل النشر

export function searchCourses(query: string, courses: Course[]): Course[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return courses;

  return courses.filter(course =>
    course.name.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.instructor.toLowerCase().includes(lowerQuery)
  );
}

export function filterCourses(
  courses: Course[],
  category?: string,
  level?: string
): Course[] {
  return courses.filter(course => {
    if (category && category !== 'all' && course.category !== category) {
      return false;
    }
    if (level && level !== 'all' && course.level !== level) {
      return false;
    }
    return true;
  });
}

export function getCourseCategories(courses: Course[]): string[] {
  const categories = new Set(courses.map(c => c.category));
  return Array.from(categories).sort();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ar-SA') + ' ر.س';
}
