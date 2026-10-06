import { Course } from '../lib/types';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Course[];
  isAdmin?: boolean;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  isLoading?: boolean;
}

export function CourseList({
  courses,
  isAdmin,
  onViewDetails,
  onEdit,
  isLoading
}: CourseListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">جاري تحميل الدورات...</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <p className="text-gray-500 text-lg">لا توجد دورات متطابقة</p>
          <p className="text-gray-400 text-sm">جرّب تغيير معايير البحث والتصفية</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}
