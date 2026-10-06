# 🧪 خيارات الاختبار الآلي

هذا الملف يشرح الخيارات المختلفة للاختبار الآلي وفوائد كل منها.

**⚠️ ملاحظة:** لم يتم تثبيت أي من هذه الأدوات بعد. هذا شرح توضيحي فقط.

---

## مستويات الاختبار

```
┌─────────────────────────────────────────────┐
│   Unit Tests                                 │
│   (اختبار دوال منفردة)                      │
│   سريع ✓ سهل ✓                              │
└─────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────┐
│   Integration Tests                          │
│   (اختبار مكونات معاً)                      │
│   متوسط السرعة متوسط الصعوبة                 │
└─────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────┐
│   E2E Tests                                  │
│   (اختبار التطبيق كاملاً)                   │
│   بطيء ✗ معقد                               │
└─────────────────────────────────────────────┘
```

---

## الخيار 1: اختبارات الوحدة (Unit Tests)

### 🎯 الفائدة
اختبار **دوال منفردة** (functions) بمعزل عن باقي التطبيق.

### ✅ الفوائد
- **سريعة جداً** (ملايين الاختبارات في ثوان)
- **سهلة الكتابة** (لا تحتاج متصفح)
- **تكتشف الأخطاء مبكراً**
- **تساعد في الإعادة** (refactoring)

### ❌ العيوب
- لا تختبر التفاعل بين الأشياء
- لا تختبر الواجهة الفعلية

### 📦 الأدوات المناسبة

#### ✅ Vitest (الأفضل للمشروع)
```bash
npm install -D vitest @vitest/ui

# ملف الاختبار: src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { searchCourses, filterCourses } from './utils';

describe('searchCourses', () => {
  const mockCourses = [
    {
      id: '1',
      name: 'JavaScript',
      category: 'برمجة',
      instructor: 'أحمد',
      duration_hours: 20,
      price: 299,
      description: 'دورة JavaScript',
      level: 'beginner',
      start_date: '2024-01-15',
      status: 'active'
    }
  ];

  it('يجد دورات تتطابق مع البحث', () => {
    const result = searchCourses('JavaScript', mockCourses);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('JavaScript');
  });

  it('يرجع مصفوفة فارغة عند عدم وجود نتائج', () => {
    const result = searchCourses('Python', mockCourses);
    expect(result).toHaveLength(0);
  });

  it('يبحث بدون حساسية الحالة', () => {
    const result = searchCourses('javascript', mockCourses);
    expect(result).toHaveLength(1);
  });
});
```

**الفوائد:**
- توافق كامل مع Vite ✓
- سريع جداً ⚡
- سهل المزامنة مع المشروع

#### Jest (خيار بديل)
```bash
npm install -D jest @testing-library/react
```
**الفوائد:** معروف وموثّق
**العيوب:** أبطأ قليلاً من Vitest

---

## الخيار 2: اختبارات المكونات (Component Tests)

### 🎯 الفائدة
اختبار **مكونات React** (Components) بشكل منفصل.

### ✅ الفوائد
- تختبر المنطق والواجهة معاً
- تكتشف مشاكل التفاعل
- أسرع من اختبارات E2E

### ❌ العيوب
- أبطأ من Unit Tests
- تحتاج متصفح افتراضي

### 📦 الأدوات المناسبة

#### ✅ React Testing Library + Vitest (الأفضل)
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/user-event happy-dom

# ملف الاختبار: src/components/LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('يتعطل عند الضغط على زر الدخول بدون كلمة مرور', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();
    
    render(<LoginForm onSubmit={handleSubmit} onCancel={handleCancel} />);
    
    const submitButton = screen.getByText('دخول');
    fireEvent.click(submitButton);
    
    expect(screen.getByText('يرجى إدخال كلمة المرور')).toBeInTheDocument();
  });

  it('يستدعي onSubmit عند إدخال كلمة صحيحة', async () => {
    const handleSubmit = vi.fn(() => true);
    const handleCancel = vi.fn();
    
    render(<LoginForm onSubmit={handleSubmit} onCancel={handleCancel} />);
    
    const input = screen.getByPlaceholderText('أدخل كلمة المرور');
    await userEvent.type(input, 'admin123');
    
    const submitButton = screen.getByText('دخول');
    fireEvent.click(submitButton);
    
    expect(handleSubmit).toHaveBeenCalledWith('admin123');
  });

  it('يغلق النموذج عند الضغط على إلغاء', () => {
    const handleCancel = vi.fn();
    render(<LoginForm onSubmit={() => false} onCancel={handleCancel} />);
    
    const cancelButton = screen.getByText('إلغاء');
    fireEvent.click(cancelButton);
    
    expect(handleCancel).toHaveBeenCalled();
  });
});
```

**الفوائد:**
- توافق كامل مع Vite
- سهل الكتابة والفهم
- معروف في مجتمع React

---

## الخيار 3: اختبارات النهاية إلى النهاية (E2E Tests)

### 🎯 الفائدة
اختبار **التطبيق كاملاً** من منظور المستخدم.

### ✅ الفوائد
- تختبر التطبيق الفعلي
- تكتشف مشاكل التكامل
- تحاكي تصرفات المستخدم الحقيقي

### ❌ العيوب
- **بطيئة جداً** (دقائق لعشرات الاختبارات)
- **معقدة** في الكتابة والصيانة
- تحتاج متصفح حقيقي

### 📦 الأدوات المناسبة

#### ✅ Playwright (الأفضل للمشروع)
```bash
npm install -D @playwright/test

# ملف الاختبار: tests/courses.spec.ts
import { test, expect } from '@playwright/test';

test.describe('منصة الدورات', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('عرض الدورات الأولية', async ({ page }) => {
    const cards = page.locator('.card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('البحث عن دورة', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="ابحث"]');
    await searchInput.fill('JavaScript');
    
    const cards = page.locator('.card');
    const count = await cards.count();
    expect(count).toBeLessThanOrEqual(5);
  });

  test('دخول لوحة الإدارة', async ({ page }) => {
    await page.click('text=دخول الإدارة');
    
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('admin123');
    await page.click('text=دخول');
    
    await expect(page.locator('text=لوحة التحكم')).toBeVisible();
  });

  test('إضافة دورة جديدة', async ({ page }) => {
    // دخول
    await page.click('text=دخول الإدارة');
    await page.locator('input[type="password"]').fill('admin123');
    await page.click('text=دخول');
    
    // إضافة
    await page.click('text=إضافة دورة جديدة');
    
    // ملء النموذج
    await page.fill('input[placeholder*="اسم الدورة"]', 'دورة تجريبية');
    await page.fill('input[placeholder*="البرمجة"]', 'برمجة');
    await page.fill('input[placeholder*="المدرب"]', 'محمد');
    
    // الحفظ
    await page.click('text=حفظ');
    
    // التحقق
    await expect(page.locator('text=دورة تجريبية')).toBeVisible();
  });
});
```

**الفوائد:**
- حديثة وموثوقة ⚡
- تدعم عدة متصفحات
- سهلة الـ debugging

#### Cypress (خيار بديل)
```bash
npm install -D cypress
npm run cypress open
```
**الفوائد:** واجهة بصرية جميلة
**العيوب:** أبطأ من Playwright

---

## 📊 مقارنة الخيارات

| الميزة | Unit Tests | Component Tests | E2E Tests |
|--------|-----------|-----------------|-----------|
| **السرعة** | ⚡⚡⚡ سريع جداً | ⚡⚡ متوسط | ⏱️ بطيء |
| **سهولة الكتابة** | ✅ سهل | ✅ سهل | ⚠️ معقد |
| **اختبار الواجهة** | ❌ لا | ✅ نعم | ✅ نعم |
| **اختبار التفاعل** | ❌ لا | ✅ نعم | ✅ نعم |
| **الثقة** | 🔶 متوسطة | 🟡 عالية | 🟢 جداً عالية |
| **التكلفة** | 💰 قليلة | 💰💰 متوسطة | 💰💰💰 عالية |

---

## 🎯 التوصية للمشروع

### المرحلة الحالية (الإطلاق الأول)
**الاختبار اليدوي فقط** ✅
- استخدم `TEST_CHECKLIST.md`
- كافٍ لمشروع صغير
- لا حاجة لأدوات إضافية

### المرحلة المستقبلية (بعد الإطلاق)
**إذا أردت اختبارات آلية:**

**الخطوة 1: أضف Unit Tests**
```bash
npm install -D vitest @vitest/ui
```
- اختبر الدوال المساعدة
- اختبر hooks

**الخطوة 2: أضف Component Tests**
```bash
npm install -D @testing-library/react @testing-library/user-event happy-dom
```
- اختبر مكونات مهمة
- اختبر الواجهة الأساسية

**الخطوة 3: أضف E2E Tests** (اختياري)
```bash
npm install -D @playwright/test
```
- اختبر سيناريوهات المستخدم الكاملة
- اختبر قبل النشر الحرج

---

## 🚀 كيفية البدء (عند الحاجة)

### 1. إضافة Vitest
```bash
npm install -D vitest @vitest/ui

# أضف في package.json:
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui"
}
```

### 2. أنشئ أول اختبار
```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { searchCourses } from './utils';

describe('searchCourses', () => {
  it('يعمل', () => {
    expect(true).toBe(true);
  });
});
```

### 3. شغّل الاختبار
```bash
npm run test
# أو
npm run test:ui  # واجهة رسومية
```

---

## 💡 نصائح مهمة

### ✅ أفضل الممارسات
1. **اختبر السلوك، لا التفاصيل** - اختبر "إضافة دورة تعمل" وليس "DOM يحتوي class xyz"
2. **اختبر حالات الفشل** - ما يحدث عند إدخال بيانات خاطئة؟
3. **احتفظ بالاختبارات بسيطة** - كل اختبار يفعل شيء واحد فقط
4. **استخدم بيانات واقعية** - اختبر بـ mock data قريبة من البيانات الحقيقية

### ❌ تجنب
- اختبار تفاصيل التنفيذ
- اختبارات طويلة ومعقدة
- اختبار أكثر من شيء في اختبار واحد
- نسيان اختبار حالات الفشل

---

## 📚 موارد إضافية

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ خلاصة

| المرحلة | المقترح | الحالة |
|--------|---------|--------|
| **الآن** | اختبار يدوي (TEST_CHECKLIST.md) | ✅ جاهز للاستخدام |
| **لاحقاً** | Unit Tests مع Vitest | 📋 جاهز للتثبيت |
| **ندرة** | Component Tests مع React Testing Library | 📋 جاهز للتثبيت |
| **قبل الإطلاق الكبير** | E2E Tests مع Playwright | 📋 جاهز للتثبيت |
