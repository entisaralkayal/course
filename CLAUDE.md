# 📚 منصة الدورات التدريبية - مهارات المستقبل

**ملف مرجعي شامل للمشروع**

---

## 🎯 نظرة عامة

تطبيق ويب حديث لعرض وإدارة الدورات التدريبية لمركز تدريبي باسم "مهارات المستقبل". 

- **بدون backend** - واجهة فقط
- **بدون قاعدة بيانات** - localStorage للحفظ
- **بدون خوادم** - يعمل محلياً ويمكن نشره على أي استضافة ثابتة
- **آمن وبسيط** - كلمة مرور واحدة لدخول الإدارة

---

## 🚀 البدء السريع

```bash
# تثبيت المكتبات
npm install

# تشغيل خادم التطوير
npm run dev

# البناء للإنتاج
npm run build
```

**كلمة المرور الافتراضية:** `admin123` (في `src/lib/utils.ts`)

---

## 📁 هيكل المشروع

```
courses/
├── public/
│   └── data.json                    # البيانات الأولية للدورات
├── src/
│   ├── components/                  # مكونات React
│   │   ├── CourseCard.tsx          # بطاقة الدورة الواحدة
│   │   ├── CourseForm.tsx          # نموذج إضافة/تعديل
│   │   ├── CourseList.tsx          # قائمة الدورات
│   │   ├── DeleteConfirm.tsx       # تأكيد الحذف
│   │   ├── FilterPanel.tsx         # لوحة التصفية
│   │   ├── LoginForm.tsx           # نموذج الدخول
│   │   ├── Navigation.tsx          # شريط الملاحة
│   │   └── SearchBar.tsx           # شريط البحث
│   ├── hooks/                       # React Hooks مخصصة
│   │   ├── useAuth.ts              # إدارة المصادقة
│   │   └── useCourses.ts           # إدارة الدورات (CRUD)
│   ├── lib/                        # مكتبات مساعدة
│   │   ├── storage.ts              # دوال localStorage
│   │   ├── types.ts                # أنواع TypeScript
│   │   └── utils.ts                # دوال مساعدة + كلمة المرور
│   ├── pages/                      # صفحات التطبيق
│   │   ├── AdminDashboard.tsx      # لوحة التحكم
│   │   ├── CourseDetails.tsx       # تفاصيل الدورة
│   │   └── Home.tsx                # الصفحة الرئيسية
│   ├── styles/
│   │   ├── globals.css             # أنماط عامة
│   │   └── components.module.css   # أنماط المكونات
│   ├── App.tsx                     # المكون الرئيسي
│   ├── main.tsx                    # نقطة الدخول
│   └── index.css                   # Tailwind directives
├── .gitignore
├── index.html                      # HTML الرئيسي (RTL)
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── CLAUDE.md                       # هذا الملف
├── README.md                       # توثيق المشروع
├── SETUP.md                        # دليل التثبيت
└── QUICK_START.md                 # البدء السريع
```

---

## 💻 المكونات الرئيسية

### 🏠 الواجهة العامة

| الصفحة | الملف | الوصف |
|--------|------|-------|
| الرئيسية | `pages/Home.tsx` | عرض الدورات مع بحث وتصفية |
| التفاصيل | `pages/CourseDetails.tsx` | تفاصيل دورة واحدة |

### 🔐 لوحة الإدارة

| الصفحة | الملف | الوصف |
|--------|------|-------|
| الدخول | `components/LoginForm.tsx` | نموذج إدخال كلمة المرور |
| لوحة التحكم | `pages/AdminDashboard.tsx` | إدارة الدورات (CRUD) |

---

## 🔑 الملفات الحرجة

### 1️⃣ `src/lib/utils.ts` - كلمة المرور
```typescript
export const ADMIN_PASSWORD = 'admin123'; // ⚠️ غيّرها قبل النشر
```

### 2️⃣ `public/data.json` - البيانات الأولية
```json
{
  "courses": [
    {
      "id": "1",
      "name": "اسم الدورة",
      "category": "المجال",
      "instructor": "اسم المدرب",
      "duration_hours": 20,
      "price": 299,
      "description": "وصف الدورة",
      "level": "beginner",
      "image_url": "رابط الصورة",
      "start_date": "2024-01-15",
      "status": "active"
    }
  ]
}
```

### 3️⃣ `src/App.tsx` - المكون الرئيسي
- يدير التنقل بين الصفحات
- يدير حالة المصادقة
- يدير الدورات

### 4️⃣ `src/hooks/useCourses.ts` - إدارة الدورات
```typescript
const { courses, loading, addCourse, updateCourse, deleteCourse, getCourseById } = useCourses();
```

### 5️⃣ `src/hooks/useAuth.ts` - إدارة المصادقة
```typescript
const { loggedIn, login, logout, loading } = useAuth();
```

---

## 📊 نموذج البيانات

### واجهة `Course`
```typescript
interface Course {
  id: string;                    // معرّف فريد
  name: string;                  // اسم الدورة
  category: string;              // برمجة، تسويق، إدارة
  instructor: string;            // اسم المدرب
  duration_hours: number;        # المدة بالساعات
  price: number;                 # السعر
  description: string;           # وصف الدورة
  level: 'beginner' | 'intermediate' | 'advanced';
  image_url?: string;            # رابط الصورة
  start_date: string;            # تاريخ البدء
  status: 'active' | 'archived' | 'coming_soon';
}
```

---

## 🔌 التخزين المحلي (localStorage)

البيانات تُحفظ في localStorage تحت المفاتيح:

| المفتاح | الوصف | الملف |
|--------|-------|------|
| `courses_data` | قائمة الدورات المحفوظة | `src/lib/storage.ts` |
| `auth_state` | حالة المصادقة | `src/lib/storage.ts` |

**دوال التخزين:**
```typescript
// الدورات
saveCourses(courses)
getCourses()
clearCourses()

// المصادقة
setAuthenticated(value)
isAuthenticated()
clearAuthentication()
```

---

## 🎨 التصميم والأنماط

### Tailwind CSS
- التكوين في `tailwind.config.js`
- فئات مخصصة في `src/styles/globals.css`

### الأزرار
```typescript
.btn-primary      // أزرق - الإجراء الرئيسي
.btn-secondary    // رمادي - إجراء ثانوي
.btn-danger       // أحمر - حذف
.btn-success      # أخضر - تأكيد
```

### البطاقات
```typescript
.card             // صندوق أبيض مع ظل
.badge            // نص بخلفية ملونة
```

---

## 🌍 دعم اللغة العربية والـ RTL

**في `index.html`:**
```html
<html lang="ar" dir="rtl">
```

**في `src/styles/globals.css`:**
```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

---

## 🔐 المصادقة والأمان

- كلمة مرور واحدة تُخزن في الكود
- تخزين حالة الدخول في localStorage
- بدون خوادم أو قواعد بيانات خارجية

⚠️ **تنبيهات الأمان:**
- كلمة المرور **ليست معشّرة** - بدون تشفير
- البيانات محفوظة محلياً فقط
- غيّر كلمة المرور قبل النشر على الإنترنت

---

## 📦 المكتبات المستخدمة

| المكتبة | الإصدار | الاستخدام |
|--------|---------|-----------|
| react | ^18.3.1 | واجهة المستخدم |
| react-dom | ^18.3.1 | عرض DOM |
| lucide-react | ^0.408.0 | أيقونات |
| tailwindcss | ^3.3.6 | تصميم |
| vite | ^5.0.8 | بناء |
| typescript | ^5.2.2 | لغة البرمجة |

---

## ⚙️ البناء والنشر

### للتطوير
```bash
npm run dev          # خادم تطوير على http://localhost:5173
```

### للإنتاج
```bash
npm run build        # بناء في مجلد dist/
npm run preview      # معاينة البناء محلياً
```

### النشر على Vercel
```bash
npm install -g vercel
vercel
```

### النشر على استضافة عادية
انسخ محتوى مجلد `dist/` إلى جذر الموقع

---

## 🔄 تدفق البيانات

```
البيانات الأولية (data.json)
         ↓
useCourses Hook
         ↓
localStorage
         ↓
React Components
         ↓
عرض في المتصفح
```

---

## 🧪 الاختبار اليدوي

### الصفحة الرئيسية
- [ ] البحث يعمل
- [ ] التصفية تعمل
- [ ] عرض الدورات صحيح
- [ ] الهاتف مستجيب

### لوحة الإدارة
- [ ] كلمة المرور الصحيحة تعمل
- [ ] إضافة دورة تعمل
- [ ] تعديل دورة يحفظ التغييرات
- [ ] حذف دورة يعمل
- [ ] البيانات تُحفظ بعد إعادة التحميل

---

## 🐛 استكشاف الأخطاء

| المشكلة | الحل |
|--------|------|
| "Module not found" | `rm -rf node_modules && npm install` |
| الصفحة لا تُحدّث | امسح cache (Ctrl+Shift+Delete) |
| البيانات لا تظهر | تحقق من `localStorage` في DevTools |
| كلمة المرور لا تعمل | تحقق من `src/lib/utils.ts` وأعد التشغيل |

---

## 📝 نصائح التطوير

### إضافة دورة جديدة في الكود
```typescript
// في src/hooks/useCourses.ts
const newCourse = addCourse({
  name: "اسم الدورة",
  category: "برمجة",
  instructor: "الاسم",
  duration_hours: 20,
  price: 299,
  description: "الوصف",
  level: "beginner",
  image_url: "URL",
  start_date: "2024-01-15",
  status: "active"
});
```

### تصحيح أخطاء TypeScript
```bash
tsc --noEmit    # تحقق من الأخطاء بدون بناء
```

### مسح جميع البيانات
```javascript
// في console المتصفح
localStorage.removeItem('courses_data');
localStorage.removeItem('auth_state');
location.reload();
```

---

## 🎯 الميزات المستقبلية

- [ ] نظام تسجيل المستخدمين (Sign-up)
- [ ] نظام الحجز والتسجيل في الدورات
- [ ] نظام الدفع الإلكتروني
- [ ] لوحة إحصائيات متقدمة
- [ ] نظام البريد الإلكتروني (Notifications)
- [ ] نظام التقييمات والمراجعات
- [ ] تطبيق Mobile
- [ ] نظام الشهادات الرقمية

---

## 📞 الملفات المهمة للتعديل

### تخصيص المشروع
1. **تغيير كلمة المرور** → `src/lib/utils.ts`
2. **تحديث البيانات** → `public/data.json`
3. **تعديل الألوان** → `tailwind.config.js`
4. **تغيير العنوان** → `index.html` و `src/App.tsx`

### للمطورين
1. **إضافة مكون جديد** → `src/components/`
2. **إضافة صفحة جديدة** → `src/pages/`
3. **إضافة Hook مخصص** → `src/hooks/`
4. **إضافة دالة مساعدة** → `src/lib/utils.ts`

---

## 🎓 الموارد الإضافية

- [توثيق React](https://react.dev)
- [توثيق Vite](https://vitejs.dev)
- [توثيق Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

## 📄 الملفات التوثيقية

| الملف | الوصف |
|------|-------|
| [QUICK_START.md](QUICK_START.md) | ابدأ في 5 دقائق |
| [SETUP.md](SETUP.md) | دليل التثبيت المفصل |
| [README.md](README.md) | توثيق المشروع |
| [CLAUDE.md](CLAUDE.md) | هذا الملف |

---

## ✅ قائمة التحقق للإطلاق

- [ ] تثبيت Node.js
- [ ] تشغيل `npm install`
- [ ] تغيير كلمة المرور في `src/lib/utils.ts`
- [ ] تحديث البيانات في `public/data.json`
- [ ] اختبار جميع الميزات
- [ ] `npm run build`
- [ ] نشر مجلد `dist/`

---

**آخر تحديث:** 2024
**الحالة:** ✅ جاهز للاستخدام
**الإصدار:** 1.0.0
