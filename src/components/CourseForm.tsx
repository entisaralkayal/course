import { useState, useEffect } from 'react';
import { Course } from '../lib/types';

interface CourseFormProps {
  initialData?: Course;
  onSubmit: (data: Omit<Course, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CourseForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading
}: CourseFormProps) {
  const [formData, setFormData] = useState<Omit<Course, 'id'>>({
    name: '',
    category: '',
    instructor: '',
    duration_hours: 0,
    price: 0,
    description: '',
    level: 'beginner',
    image_url: '',
    start_date: '',
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim() || !formData.instructor.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {initialData ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* الصف الأول */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">اسم الدورة *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="أدخل اسم الدورة"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">المجال *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="برمجة، تسويق، إدارة..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* الصف الثاني */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">المدرب *</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => handleChange('instructor', e.target.value)}
                placeholder="اسم المدرب"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">المدة (ساعة)</label>
              <input
                type="number"
                value={formData.duration_hours}
                onChange={(e) => handleChange('duration_hours', parseInt(e.target.value) || 0)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* الصف الثالث */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">السعر</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">المستوى</label>
              <select
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">نشط</option>
                <option value="archived">مؤرشف</option>
                <option value="coming_soon">قريباً</option>
              </select>
            </div>
          </div>

          {/* تاريخ البدء */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">تاريخ البدء</label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* رابط الصورة */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">رابط الصورة (URL)</label>
            <input
              type="url"
              value={formData.image_url || ''}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="أدخل وصف الدورة..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 btn btn-primary disabled:opacity-50"
            >
              {isLoading ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 btn btn-secondary disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
