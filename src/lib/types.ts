export interface Course {
  id: string;
  name: string;
  category: string;
  instructor: string;
  duration_hours: number;
  price: number;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  image_url?: string;
  start_date: string;
  status: 'active' | 'archived' | 'coming_soon';
}

export interface AuthState {
  isLoggedIn: boolean;
  loginTime?: number;
}

export interface CoursesData {
  courses: Course[];
}
