import { Clock, User, BookMarked } from 'lucide-react';
import { Course } from '../lib/types';
import { formatPrice, formatDate } from '../lib/utils';

interface CourseCardProps {
  course: Course;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  isAdmin?: boolean;
}

const levelLabels: Record<string, string> = {
  'beginner': 'مبتدئ',
  'intermediate': 'متوسط',
  'advanced': 'متقدم'
};

const levelColors: Record<string, string> = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-yellow-100 text-yellow-800',
  'advanced': 'bg-red-100 text-red-800'
};

export function CourseCard({ course, onViewDetails, onEdit, isAdmin }: CourseCardProps) {
  return (
    <div className="card overflow-hidden h-full flex flex-col">
      {/* الصورة */}
      {course.image_url && (
        <img
          src={course.image_url}
          alt={course.name}
          className="w-full h-48 object-cover bg-gray-200"
        />
      )}

      {/* المحتوى */}
      <div className="p-4 flex-1 flex flex-col">
        {/* العنوان والفئة */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {course.name}
          </h3>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-secondary text-sm">{course.category}</span>
            <span className={`badge ${levelColors[course.level]} text-xs`}>
              {levelLabels[course.level]}
            </span>
          </div>
        </div>

        {/* الوصف */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {course.description}
        </p>

        {/* المعلومات */}
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{course.duration_hours} ساعة</span>
          </div>
          <div className="flex items-center gap-2">
            <BookMarked size={16} />
            <span>بدء: {formatDate(course.start_date)}</span>
          </div>
        </div>

        {/* السعر */}
        <div className="text-xl font-bold text-blue-600 mb-3">
          {formatPrice(course.price)}
        </div>

        {/* الأزرار */}
        <div className="flex gap-2 mt-auto">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(course.id)}
              className="flex-1 btn btn-primary text-sm"
            >
              عرض التفاصيل
            </button>
          )}
          {isAdmin && onEdit && (
            <button
              onClick={() => onEdit(course.id)}
              className="flex-1 btn btn-secondary text-sm"
            >
              تعديل
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
