import { useState, useMemo } from 'react';
import { Course } from '../lib/types';
import { CourseList } from '../components/CourseList';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { searchCourses, filterCourses } from '../lib/utils';

interface HomeProps {
  courses: Course[];
  isLoading: boolean;
  onCourseSelect: (id: string) => void;
}

export function Home({ courses, isLoading, onCourseSelect }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = useMemo(() => {
    let result = courses;
    result = searchCourses(searchQuery, result);
    result = filterCourses(result, selectedCategory !== 'all' ? selectedCategory : undefined, selectedLevel !== 'all' ? selectedLevel : undefined);
    return result;
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="space-y-8">
      {/* الرئيسي */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4">اكتشف الدورات التدريبية</h2>
          <p className="text-lg text-blue-100">تطوّر مهاراتك مع مركز مهارات المستقبل</p>
        </div>
      </div>

      {/* البحث والتصفية */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* البحث */}
          <div className="lg:col-span-3">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          {/* عدد النتائج */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <span className="font-bold text-blue-600">{filteredCourses.length}</span>
              <span className="text-gray-600"> دورة</span>
            </p>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* شريط التصفية */}
          <div className="lg:col-span-1">
            <FilterPanel
              courses={courses}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              onCategoryChange={setSelectedCategory}
              onLevelChange={setSelectedLevel}
            />
          </div>

          {/* قائمة الدورات */}
          <div className="lg:col-span-3">
            <CourseList
              courses={filteredCourses}
              onViewDetails={onCourseSelect}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
