# ⚡ أوامر سريعة (Copy-Paste)

انسخ والصق الأوامر مباشرة في Terminal/PowerShell

---

## 🚀 الخطوة 1: الذهاب للمشروع

```powershell
cd "C:\Users\entis\OneDrive\Documents\myfirstproject\courses"
```

---

## ⚙️ الخطوة 2: تثبيت المكتبات (أول مرة فقط)

```powershell
npm install
```

---

## 🏃 الخطوة 3: تشغيل التطبيق

```powershell
npm run dev
```

**ستظهر رسالة:**
```
  ➜  Local:   http://localhost:5173/
```

**افتح المتصفح على هذا الرابط ↑**

---

## 🛑 إيقاف الخادم

```powershell
Ctrl + C
```

---

## 🔨 أوامر إضافية

### بناء للإنتاج
```powershell
npm run build
```

### معاينة البناء
```powershell
npm run preview
```

### مسح node_modules (عند المشاكل)
```powershell
Remove-Item node_modules -Recurse -Force
npm install
```

---

## 📄 فتح الملفات المهمة

### قائمة الاختبار
```powershell
code TEST_CHECKLIST.md
```

### دليل الاختبار السريع
```powershell
code START_TESTING_NOW.md
```

### ملف المشروع الشامل
```powershell
code CLAUDE.md
```

---

## 🌍 الوصول من هاتفك

1. **افتح PowerShell وشغّل:**
```powershell
ipconfig
```

2. **ابحث عن:** `IPv4 Address` (مثل: 192.168.1.100)

3. **في هاتفك، افتح:**
```
http://192.168.1.100:5173
```

---

## 💾 حفظ البيانات/تصديرها

### عرض البيانات المحفوظة
```javascript
// في console المتصفح (F12)
console.log(JSON.parse(localStorage.getItem('courses_data')))
```

### تصدير البيانات
```javascript
// في console
copy(JSON.stringify(JSON.parse(localStorage.getItem('courses_data')), null, 2))
// الآن يمكنك Paste في ملف
```

### حذف جميع البيانات
```javascript
// في console
localStorage.removeItem('courses_data')
localStorage.removeItem('auth_state')
location.reload()
```

---

## 🔑 كلمة المرور الافتراضية

```
admin123
```

**لتغييرها:**
```powershell
code src/lib/utils.ts
# ثم غيّر: export const ADMIN_PASSWORD = 'admin123';
```

---

## 🐛 أوامر Debugging

### فتح DevTools
```
F12  أو  Ctrl+Shift+I
```

### عرض Errors في Console
```
F12 → Console tab
```

### مسح Cache
```
Ctrl + Shift + Delete
```

### إعادة تحميل قوية
```
Ctrl + Shift + R
```

---

## 📚 الملفات المهمة

```
QUICK_START.md         ← ابدأ من هنا (5 دقائق)
START_TESTING_NOW.md   ← للاختبار الفوري
TEST_CHECKLIST.md      ← قائمة الاختبار الكاملة
CLAUDE.md              ← معلومات شاملة عن المشروع
TESTING_OPTIONS.md     ← خيارات الاختبار الآلي
README.md              ← توثيق المشروع
SETUP.md               ← دليل التثبيت المفصل
```

---

## ✅ Check List سريع

```
[ ] Node.js مثبت (تحقق: node --version)
[ ] المشروع موجود في المكان الصحيح
[ ] لا توجد مسافات غريبة في المسار
[ ] المكتبات مثبتة (npm install)
[ ] الخادم يعمل (npm run dev)
[ ] المتصفح يفتح على http://localhost:5173
```

---

## 💬 أسئلة شائعة

**س: الخادم لم يبدأ؟**
```powershell
# جرّب هذا:
npm install
npm run dev
```

**س: Port 5173 مستخدم بالفعل؟**
```powershell
# الخادم سيستخدم port آخر تلقائياً
# فقط تابع الرابط الذي يظهر في Terminal
```

**س: أين بيانات الدورات؟**
```
public/data.json  ← البيانات الأولية
localStorage      ← البيانات المحفوظة
```

**س: كيف أغيّر كلمة المرور؟**
```powershell
code src/lib/utils.ts
# غيّر السطر: export const ADMIN_PASSWORD = 'admin123';
```

---

**التحضير للاختبار:**
```powershell
cd "C:\Users\entis\OneDrive\Documents\myfirstproject\courses"
npm run dev
# ثم افتح: http://localhost:5173
# ثم اقرأ: START_TESTING_NOW.md
```

✅ **جاهز للاختبار الآن!**
