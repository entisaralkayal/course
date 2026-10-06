import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Course } from '../lib/types';
import { CourseForm } from '../components/CourseForm';
import { DeleteConfirm } from '../components/DeleteConfirm';
import { formatPrice } from '../lib/utils';

interface AdminDashboardProps {
  courses: Course[];
  onAddCourse: (course: Omit<Course, 'id'>) => void;
  onUpdateCourse: (id: string, course: Partial<Course>) => void;
  onDeleteCourse: (id: string) => void;
  onBack: () => void;
}

export function AdminDashboard({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onBack
}: AdminDashboardProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  const handleAddCourse = (data: Omit<Course, 'id'>) => {
    onAddCourse(data);
    setShowForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleUpdateCourse = (data: Omit<Course, 'id'>) => {
    if (editingCourse) {
      onUpdateCourse(editingCourse.id, data);
      setEditingCourse(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteCourse = () => {
    if (deletingCourseId) {
      onDeleteCourse(deletingCourseId);
      setDeletingCourseId(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCourse(undefined);
  };

  return (
    <div className="container py-8">
      {/* العنوان والإحصائيات */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
          <button
            onClick={onBack}
            className="btn btn-secondary"
          >
            العودة
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">إجمالي الدورات</p>
            <p className="text-4xl font-bold text-blue-600">{courses.length}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">الدورات النشطة</p>
            <p className="text-4xl font-bold text-green-600">{courses.filter(c => c.status === 'active').length}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm mb-2">إجمالي القيمة</p>
            <p className="text-2xl font-bold text-purple-600">
              {formatPrice(courses.reduce((sum, c) => sum + c.price, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* زر إضافة دورة */}
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingCourse(undefined);
            setShowForm(true);
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          إضافة دورة جديدة
        </button>
      </div>

      {/* جدول الدورات */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-right font-medium text-gray-700">اسم الدورة</th>
              <th className="px-6 py-3 text-right font-medium text-gray-700">المجال</th>
              <th className="px-6 py-3 text-right font-medium text-gray-700">المدرب</th>
              <th className="px-6 py-3 text-right font-medium text-gray-700">السعر</th>
              <th className="px-6 py-3 text-right font-medium text-gray-700">المستوى</th>
              <th className="px-6 py-3 text-right font-medium text-gray-700">الحالة</th>
              <th className="px-6 py-3 text-right font-medium text-gray-700">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-medium">{course.name}</td>
                <td className="px-6 py-4 text-gray-600">{course.category}</td>
                <td className="px-6 py-4 text-gray-600">{course.instructor}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{formatPrice(course.price)}</td>
                <td className="px-6 py-4">
                  <span className={`badge ${
                    course.level === 'beginner' ? 'badge-secondary' :
                    course.level === 'intermediate' ? 'badge-primary' :
                    'badge-success'
                  }`}>
                    {course.level === 'beginner' ? 'مبتدئ' :
                     course.level === 'intermediate' ? 'متوسط' :
                     'متقدم'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`badge ${
                    course.status === 'active' ? 'badge-success' :
                    course.status === 'archived' ? 'badge-secondary' :
                    'badge-primary'
                  }`}>
                    {course.status === 'active' ? 'نشط' :
                     course.status === 'archived' ? 'مؤرشف' :
                     'قريباً'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="تعديل"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => setDeletingCourseId(course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            لا توجد دورات حالياً. ابدأ بإضافة دورة جديدة!
          </div>
        )}
      </div>

      {/* نموذج الإضافة/التعديل */}
      {showForm && (
        <CourseForm
          initialData={editingCourse}
          onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
          onCancel={handleCloseForm}
        />
      )}

      {/* تأكيد الحذف */}
      {deletingCourseId && (
        <DeleteConfirm
          title="حذف الدورة"
          message={`هل أنت متأكد من رغبتك في حذف دورة "${courses.find(c => c.id === deletingCourseId)?.name}"؟`}
          onConfirm={handleDeleteCourse}
          onCancel={() => setDeletingCourseId(null)}
        />
      )}
    </div>
  );
}
