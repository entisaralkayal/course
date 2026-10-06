import { Course } from '../lib/types';
import { getCourseCategories } from '../lib/utils';

interface FilterPanelProps {
  courses: Course[];
  selectedCategory: string;
  selectedLevel: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
}

const levelLabels: Record<string, string> = {
  'all': 'كل المستويات',
  'beginner': 'مبتدئ',
  'intermediate': 'متوسط',
  'advanced': 'متقدم'
};

export function FilterPanel({
  courses,
  selectedCategory,
  selectedLevel,
  onCategoryChange,
  onLevelChange
}: FilterPanelProps) {
  const categories = getCourseCategories(courses);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">التصفية</h3>

      {/* الفئات */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">المجال</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">كل المجالات</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* المستوى */}
      <div>
        <label className="block text-gray-700 font-medium mb-3">المستوى</label>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(levelLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* عدد الدورات */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-gray-700 text-sm">
          عدد الدورات: <span className="font-bold text-blue-600">{courses.length}</span>
        </p>
      </div>
    </div>
  );
}
