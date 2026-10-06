import { Course, AuthState } from './types';

const COURSES_KEY = 'courses_data';
const AUTH_KEY = 'auth_state';

export function saveCourses(courses: Course[]): void {
  try {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error('خطأ في حفظ الدورات:', error);
  }
}

export function getCourses(): Course[] | null {
  try {
    const data = localStorage.getItem(COURSES_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('خطأ في قراءة الدورات:', error);
    return null;
  }
}

export function clearCourses(): void {
  try {
    localStorage.removeItem(COURSES_KEY);
  } catch (error) {
    console.error('خطأ في مسح الدورات:', error);
  }
}

export function setAuthenticated(value: boolean): void {
  try {
    const authState: AuthState = {
      isLoggedIn: value,
      loginTime: value ? Date.now() : undefined
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  } catch (error) {
    console.error('خطأ في حفظ حالة المصادقة:', error);
  }
}

export function isAuthenticated(): boolean {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return false;
    const authState: AuthState = JSON.parse(data);
    return authState.isLoggedIn || false;
  } catch (error) {
    console.error('خطأ في قراءة حالة المصادقة:', error);
    return false;
  }
}

export function clearAuthentication(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('خطأ في مسح حالة المصادقة:', error);
  }
}
