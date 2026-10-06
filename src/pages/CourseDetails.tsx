import { ArrowRight, Clock, User, BookMarked, DollarSign } from 'lucide-react';
import { Course } from '../lib/types';
import { formatPrice, formatDate, levelLabels } from '../lib/utils';

interface CourseDetailsProps {
  course: Course | undefined;
  onBack: () => void;
}

const levelLabels_: Record<string, string> = {
  'beginner': 'مبتدئ',
  'intermediate': 'متوسط',
  'advanced': 'متقدم'
};

export function CourseDetails({ course, onBack }: CourseDetailsProps) {
  if (!course) {
    return (
      <div className="container py-12 text-center">
        <p className="text-gray-500 text-lg">الدورة غير موجودة</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* زر العودة */}
      <div className="container py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowRight size={20} />
          العودة إلى الدورات
        </button>
      </div>

      {/* الصورة */}
      {course.image_url && (
        <div className="w-full h-96 bg-gray-200">
          <img
            src={course.image_url}
            alt={course.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* المحتوى */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* العمود الرئيسي */}
          <div className="lg:col-span-2 space-y-8">
            {/* العنوان والفئة */}
            <div>
              <div className="flex gap-3 mb-4">
                <span className="badge badge-secondary">{course.category}</span>
                <span className="badge badge-primary">{levelLabels_[course.level]}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.name}</h1>
              <p className="text-lg text-gray-600">{course.description}</p>
            </div>

            {/* معلومات المدرب */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">المدرب</h2>
              <div className="flex items-center gap-3">
                <User size={24} className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">{course.instructor}</p>
                  <p className="text-gray-500 text-sm">مدرب متخصص في المركز</p>
                </div>
              </div>
            </div>

            {/* محتوى إضافي */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">معلومات الدورة</h2>
              <div className="space-y-3">
                <p className="text-gray-700">
                  هذه دورة متخصصة وشاملة تغطي جميع جوانب الموضوع بشكل عملي وتطبيقي.
                  ستتعلم من خلالها المهارات الأساسية والمتقدمة اللازمة للنجاح في هذا المجال.
                </p>
              </div>
            </div>
          </div>

          {/* الجانب الأيمن - كارت معلومات الدورة */}
          <div>
            <div className="card p-6 space-y-6 sticky top-20">
              {/* السعر */}
              <div className="border-b pb-6">
                <p className="text-gray-600 mb-2">السعر</p>
                <p className="text-3xl font-bold text-blue-600">{formatPrice(course.price)}</p>
              </div>

              {/* المعلومات الأساسية */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <p className="text-gray-600 text-sm">المدة</p>
                    <p className="font-medium text-gray-800">{course.duration_hours} ساعة</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookMarked size={20} className="text-gray-500" />
                  <div>
                    <p className="text-gray-600 text-sm">تاريخ البدء</p>
                    <p className="font-medium text-gray-800">{formatDate(course.start_date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-gray-500" />
                  <div>
                    <p className="text-gray-600 text-sm">المستوى</p>
                    <p className="font-medium text-gray-800">{levelLabels_[course.level]}</p>
                  </div>
                </div>
              </div>

              {/* زر التسجيل */}
              <button className="w-full btn btn-primary">
                اطلب الدورة
              </button>

              {/* ملاحظة */}
              <p className="text-gray-500 text-sm text-center">
                قريباً: نظام التسجيل والحجز سيكون متاحاً قريباً
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
