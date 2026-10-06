# منصة الدورات التدريبية - مهارات المستقبل

منصة ويب حديثة لعرض وإدارة الدورات التدريبية بدون backend.

## المميزات

✅ عرض شامل للدورات مع تفاصيلها الكاملة
✅ البحث والتصفية حسب المجال والمستوى
✅ لوحة إدارة محمية بكلمة مرور
✅ إضافة وتعديل وحذف الدورات
✅ حفظ البيانات محلياً في localStorage
✅ واجهة بالعربية مع دعم RTL كامل
✅ تصميم مستجيب (Responsive)

## البدء السريع

### المتطلبات
- Node.js 16.0.0 أو أحدث
- npm أو yarn

### التثبيت

```bash
# تثبيت المكتبات
npm install

# تشغيل خادم التطوير
npm run dev

# البناء للإنتاج
npm run build

# معاينة الإصدار النهائي
npm run preview
```

## كلمة المرور الافتراضية

كلمة المرور الافتراضية لدخول لوحة التحكم هي: `admin123`

**⚠️ تحذير: غيّر كلمة المرور الافتراضية قبل النشر على الإنترنت!**

يمكن تغيير كلمة المرور في ملف `src/lib/utils.ts`:

```typescript
export const ADMIN_PASSWORD = 'your_secure_password';
```

## هيكل المشروع

```
src/
├── components/          # مكونات React
│   ├── CourseCard.tsx
│   ├── CourseForm.tsx
│   ├── CourseList.tsx
│   ├── DeleteConfirm.tsx
│   ├── FilterPanel.tsx
│   ├── LoginForm.tsx
│   ├── Navigation.tsx
│   └── SearchBar.tsx
├── hooks/              # React Hooks مخصصة
│   ├── useAuth.ts
│   └── useCourses.ts
├── lib/                # دوال مساعدة وأنواع
│   ├── storage.ts
│   ├── types.ts
│   └── utils.ts
├── pages/              # صفحات التطبيق
│   ├── AdminDashboard.tsx
│   ├── CourseDetails.tsx
│   └── Home.tsx
├── styles/
│   ├── globals.css
│   └── components.module.css
├── App.tsx
├── main.tsx
└── index.css
```

## البيانات

البيانات الأولية موجودة في `public/data.json`. عند تحميل التطبيق للمرة الأولى:

1. يتم قراءة البيانات من `public/data.json`
2. يتم حفظها في `localStorage`
3. في الزيارات اللاحقة، يتم تحميل البيانات من `localStorage`

### تصدير/استيراد البيانات

يمكن تصدير البيانات من متصفح العميل:

```javascript
// في وحدة تحكم المتصفح (DevTools)
JSON.stringify(JSON.parse(localStorage.getItem('courses_data')))
```

## المصادقة

التطبيق يستخدم نموذج مصادقة بسيط:
- كلمة مرور واحدة لجميع المسؤولين
- تخزين حالة المصادقة في localStorage
- session-based (بدون cookies)

## المتصفحات المدعومة

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## الترخيص

© 2024 مهارات المستقبل - جميع الحقوق محفوظة

## الدعم

للمساعدة والدعم، يرجى التواصل مع فريق التطوير.
