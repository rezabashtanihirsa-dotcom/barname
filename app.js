'use strict';

/* =====================================================================
   داده‌ها — برای تغییر برنامه فقط همین آبجکت را ویرایش کن
   ===================================================================== */
const DATA = {
  profile: {
    summary: 'وزن ۹۲ کیلو، قد ۱۸۵، سن ۳۰، کار پشت میز از ساعت ۹ صبح.',
    goal: 'کاهش چربی، شکم نمایان، سرشانه پهن.',
    maintenance: 'کالری نگه‌داری تخمینی ۲۸۰۰.'
  },

  programWeeks: 7,
  progression: [
    { from: 1, to: 2, label: 'هفته ۱ و ۲', short: 'RIR 3', rule: 'هر ست با ۳ تکرار مانده تا ناتوانی (RIR 3)، بدون دراپ‌ست.' },
    { from: 3, to: 6, label: 'هفته ۳ تا ۶', short: 'RIR 1–2', rule: 'RIR 1 تا 2. وقتی همه ست‌ها به سقف تکرار رسید، وزنه ۲.۵ تا ۵ درصد بیشتر شود.' },
    { from: 7, to: 7, label: 'هفته ۷', short: 'دی‌لود', rule: 'دی‌لود: نصف ست‌ها، وزنه سبک‌تر.' }
  ],

  // وعده‌های ثابت روز تمرین؛ ردیف dinner از شام همان روز پر می‌شود
  trainingMeals: [
    { time: '۵:۳۰', text: 'بیداری، ۱ لیوان آب، ۵ گرم کراتین، ۱ موز + ۳ خرما، قهوه بدون شکر', kcal: 175, protein: 1 },
    { time: '۵:۵۰ تا ۷:۲۰', text: 'باشگاه', kind: 'event' },
    { time: '۷:۴۵', text: '۳ تخم‌مرغ کامل + ۲ سفیده، ۸۰ گرم نان سنگک، گوجه و خیار', kcal: 455, protein: 32 },
    { time: '۸:۴۰', text: 'حرکت به سمت محل کار (ناهار و میان‌وعده همراه)', kind: 'event' },
    { time: '۱۱:۰۰', text: '۲۰۰ گرم ماست یونانی یا چکیده + ۱ سیب + ۱۵ گرم گردو', kcal: 320, protein: 20 },
    { time: '۱۳:۳۰', text: '۲۰۰ گرم سینه مرغ (وزن خام)، ۲۰۰ گرم برنج پخته، سالاد + ۱ قاشق چای‌خوری روغن زیتون', kcal: 545, protein: 51 },
    { time: '۱۷:۰۰', text: '۱ اسکوپ وی + ۲۵۰ میلی‌لیتر شیر کم‌چرب + ۱ موز', kcal: 340, protein: 33 },
    { time: '۱۸:۰۰', text: 'پیاده‌روی ۳۰ تا ۴۵ دقیقه (هدف ۸ تا ۱۰ هزار قدم در روز)', kind: 'event' },
    { time: '۲۰:۳۰', kind: 'dinner' },
    { time: '۲۲:۰۰', text: 'خواب (موبایل از ۲۱:۳۰ کنار)، آب کل روز ۳ تا ۳.۵ لیتر', kind: 'event' }
  ],

  days: {
    sat: {
      tab: 'شنبه', title: 'روز ۱، بالاتنه A', type: 'upper',
      macros: { kcal: 2350, protein: 175, carbs: 250, fat: 70 },
      exercises: [
        { kind: 'info', name: 'گرم کردن', text: '۵ دقیقه دوچرخه، حرکات مفصلی شانه، ۲ ست سبک پرس', duration: '۱۰ دقیقه' },
        { id: 'sat-bench', name: 'پرس سینه هالتر', sets: 4, reps: '6–8', rest: 120 },
        { id: 'sat-tbar', name: 'زیربغل تی‌بار', sets: 4, reps: '8–10', rest: 120 },
        { id: 'sat-db-press', name: 'پرس سرشانه دمبل نشسته', sets: 3, reps: '8–10', rest: 90 },
        { id: 'sat-lat-close', name: 'لت سیم‌کش دست جمع', sets: 3, reps: '10–12', rest: 90 },
        { id: 'sat-lateral', name: 'نشر جانب دمبل', drop: true, sets: 4, reps: '12–15', rest: 60 },
        { id: 'sat-arms', name: 'سوپرست: جلو بازو هالتر + پشت بازو سیم‌کش طنابی', superset: true, sets: 3, reps: '10–12', rest: 75 },
        { kind: 'info', name: 'تردمیل', text: 'شیب ۸ تا ۱۰، سرعت ۵', duration: '۱۰ دقیقه' }
      ],
      dinner: { text: '۱۵۰ گرم گوشت گوساله کم‌چرب، ۲۰۰ گرم سیب‌زمینی آب‌پز، سبزیجات بخارپز', kcal: 410, protein: 36 }
    },
    sun: {
      tab: 'یکشنبه', title: 'روز ۲، پایین‌تنه A', type: 'lower',
      macros: { kcal: 2380, protein: 180, carbs: 250, fat: 70 },
      exercises: [
        { kind: 'info', name: 'گرم کردن', text: '۵ دقیقه دوچرخه، باز کردن لگن و مچ پا، ۲ ست سبک اسکوات', duration: '۱۰ دقیقه' },
        { id: 'sun-squat', name: 'اسکوات هالتر', sets: 4, reps: '6–8', rest: 150 },
        { id: 'sun-legpress', name: 'پرس پا', sets: 3, reps: '10–12', rest: 90 },
        { id: 'sun-lying-curl', name: 'پشت پا خوابیده دستگاه', sets: 3, reps: '10–12', rest: 75 },
        { id: 'sun-leg-ext', name: 'جلو پا دستگاه', drop: true, sets: 3, reps: '12–15', rest: 60 },
        { id: 'sun-calf', name: 'ساق ایستاده', note: '۱ ثانیه مکث پایین', sets: 3, reps: '12–15', rest: 45 },
        { id: 'sun-hanging-leg', name: 'بالا آوردن پا در حالت آویزان', sets: 3, reps: '10–15', rest: 60 },
        { kind: 'info', name: 'تردمیل', text: 'شیب ۸ تا ۱۰، سرعت ۵', duration: '۱۰ دقیقه' }
      ],
      dinner: { text: '۱۸۰ گرم ماهی قزل‌آلا (فر یا تابه بدون روغن اضافه)، ۱۵۰ گرم برنج پخته، سبزیجات', kcal: 445, protein: 40 }
    },
    tue: {
      tab: 'سه‌شنبه', title: 'روز ۳، بالاتنه B', type: 'upper',
      macros: { kcal: 2350, protein: 180, carbs: 250, fat: 65 },
      exercises: [
        { kind: 'info', name: 'گرم کردن', text: '۵ دقیقه دوچرخه، چرخش شانه با کش، ۲ ست سبک پرس', duration: '۱۰ دقیقه' },
        { id: 'tue-incline-db', name: 'پرس بالا سینه دمبل', sets: 4, reps: '8–10', rest: 120 },
        { id: 'tue-pullup', name: 'بارفیکس', note: 'یا لت دست باز', sets: 4, reps: '6–10', rest: 120 },
        { id: 'tue-cable-row', name: 'قایقی سیم‌کش', sets: 3, reps: '10–12', rest: 90 },
        { id: 'tue-cable-lateral', name: 'نشر جانب سیم‌کش تک‌دست', sets: 4, reps: '12–15', rest: 60 },
        { id: 'tue-cable-fly', name: 'قفسه سیم‌کش ایستاده', note: 'کشش کامل', sets: 3, reps: '12–15', rest: 60 },
        { id: 'tue-facepull', name: 'فیس‌پول سیم‌کش', sets: 3, reps: '15', rest: 60 },
        { id: 'tue-arms', name: 'سوپرست: جلو بازو چکشی دمبل + دیپ دستگاه', superset: true, sets: 3, reps: '10–12', rest: 75 }
      ],
      dinner: { text: '۱۸۰ گرم سینه مرغ گریل، ۲۰۰ گرم سیب‌زمینی آب‌پز، سالاد بزرگ', kcal: 420, protein: 45 }
    },
    wed: {
      tab: 'چهارشنبه', title: 'روز ۴، پایین‌تنه B', type: 'lower',
      macros: { kcal: 2400, protein: 180, carbs: 260, fat: 70 },
      exercises: [
        { kind: 'info', name: 'گرم کردن', text: '۵ دقیقه دوچرخه، پل باسن، ۲ ست سبک رومانیایی', duration: '۱۰ دقیقه' },
        { id: 'wed-rdl', name: 'ددلیفت رومانیایی', note: 'کمر صاف، تا حس کشش پشت پا، نه تا زمین', sets: 4, reps: '6–8', rest: 150 },
        { id: 'wed-bulgarian', name: 'اسکوات بلغاری دمبل', note: 'هر پا', sets: 3, reps: '8–10', rest: 90 },
        { id: 'wed-hip-thrust', name: 'هیپ تراست هالتر', note: '۱ ثانیه مکث بالا', sets: 3, reps: '10–12', rest: 90 },
        { id: 'wed-seated-curl', name: 'پشت پا نشسته دستگاه', sets: 3, reps: '12–15', rest: 60 },
        { id: 'wed-lateral-light', name: 'نشر جانب دمبل', note: 'سبک، کنترل‌شده', sets: 3, reps: '15–20', rest: 45 },
        { id: 'wed-core', name: 'سوپرست: کرانچ سیم‌کش + پلانک ۴۵ ثانیه', superset: true, sets: 3, reps: '12–15', rest: 45 },
        { kind: 'info', name: 'تردمیل', text: 'شیب ۸ تا ۱۰، سرعت ۵', duration: '۱۰ دقیقه' }
      ],
      dinner: { text: '۱۵۰ گرم گوشت چرخ‌کرده کم‌چرب (کباب تابه‌ای بدون روغن)، ۱۰۰ گرم نان سنگک، سبزی خوردن و گوجه', kcal: 470, protein: 41 }
    }
  },

  rest: {
    tab: 'استراحت', title: 'روز استراحت', subtitle: 'دوشنبه، پنج‌شنبه، جمعه',
    macros: { kcal: 2100, protein: 180, carbs: 180, fat: 70 },
    meals: [
      { time: '۶:۰۰', text: 'آب، ۵ گرم کراتین، قهوه بدون شکر', kind: 'event' },
      { time: '۷:۰۰', text: '۳ تخم‌مرغ کامل + ۲ سفیده، ۸۰ گرم نان سنگک، گوجه و خیار', kcal: 455, protein: 32 },
      { time: '۱۱:۰۰', text: '۲۰۰ گرم ماست یونانی یا چکیده + ۱ سیب + ۱۵ گرم گردو', kcal: 320, protein: 20 },
      { time: '۱۳:۳۰', text: '۲۰۰ گرم سینه مرغ (خام)، ۱۵۰ گرم برنج پخته، سالاد + ۱ قاشق چای‌خوری روغن زیتون', kcal: 480, protein: 50 },
      { time: '۱۷:۰۰', text: '۱ اسکوپ وی + ۲۵۰ میلی‌لیتر شیر کم‌چرب + ۱ موز', kcal: 340, protein: 33 },
      { time: '۱۸:۰۰', text: 'پیاده‌روی ۴۵ تا ۶۰ دقیقه، هدف ۱۰ هزار قدم', kind: 'event' },
      { time: '۲۰:۳۰', text: '۲۰۰ گرم مرغ یا ماهی، سالاد بزرگ + ۱ قاشق غذاخوری روغن زیتون، بدون برنج و نان', kcal: 400, protein: 46 },
      { time: '۲۲:۳۰', text: 'خواب، آب کل روز ۳ لیتر', kind: 'event' }
    ]
  },

  substitutes: [
    { title: 'پروتئین', items: ['۲۰۰ گرم مرغ', '۱۸۰ گرم ماهی', '۱۵۰ گرم گوشت کم‌چرب', '۶ سفیده + ۲ تخم‌مرغ'] },
    { title: 'کربوهیدرات', items: ['۲۰۰ گرم برنج پخته', '۱۰۰ گرم نان سنگک', '۳۰۰ گرم سیب‌زمینی', '۷۰ گرم جو دوسر'] },
    { title: 'آزاد و بدون محدودیت', free: true, items: ['خیار', 'کاهو', 'گوجه', 'کلم', 'سبزی خوردن', 'کدو'] },
    { title: 'بدون وی', items: ['۱ اسکوپ وی', '۴ سفیده + ۱ تخم‌مرغ', '۱۵۰ گرم مرغ'] }
  ],

  supplements: {
    rows: [
      { name: 'کراتین مونوهیدرات', status: 'لازم', level: 'req', amount: '۵ گرم هر روز، حتی روز استراحت، ساعتش مهم نیست' },
      { name: 'پروتئین وی', status: 'اختیاری', level: 'opt', amount: '۱ اسکوپ در روز، قابل جایگزینی با غذا' },
      { name: 'ویتامین D', status: 'فقط بعد از آزمایش خون', level: 'cond', amount: 'طبق نظر پزشک' },
      { name: 'امگا ۳', status: 'اختیاری', level: 'opt', amount: 'اگر هفته‌ای ۲ بار ماهی نمی‌خوری' },
      { name: 'کافئین', status: 'قهوه کافی است', level: 'opt', amount: '۱ فنجان قبل از تمرین' }
    ],
    notNeeded: 'چربی‌سوز، ال‌کارنیتین، BCAA، گلوتامین، گینر.',
    warning: 'فقط از فروشنده معتبر بخر و کد اصالت را چک کن.'
  },

  tracking: {
    startWeight: 92,
    targetWeight: 80,
    targetNote: 'هدف تقریبی برای نمایان شدن شکم: ۷۸ تا ۸۲ کیلو، حدود ۷ تا ۹ ماه کار مداوم.',
    stallThreshold: 0.3,
    stallMessage: '۱۵۰ تا ۲۰۰ کالری کم کن (نصف برنج ناهار)',
    rules: [
      'وزن هر روز صبح ناشتا ثبت شود؛ میانگین هفتگی ملاک است، نه عدد یک روز.',
      'دور کمر هفته‌ای یک بار در سطح ناف.',
      'عکس پیشرفت هر ۴ هفته، با همان نور و همان زاویه.',
      'اگر دو هفته پشت سر هم میانگین وزن کمتر از ۰.۳ کیلو در هفته کم شد: ۱۵۰ تا ۲۰۰ کالری کم کن (نصف برنج ناهار).'
    ]
  }
};

// ترتیب تب‌ها و نگاشت روز هفته (getDay: یکشنبه=۰ ... شنبه=۶)
const TABS = [
  { key: 'sat', label: 'شنبه', accent: 'upper' },
  { key: 'sun', label: 'یکشنبه', accent: 'lower' },
  { key: 'tue', label: 'سه‌شنبه', accent: 'upper' },
  { key: 'wed', label: 'چهارشنبه', accent: 'lower' },
  { key: 'rest', label: 'استراحت', accent: 'neutral' },
  { key: 'supp', label: 'مکمل‌ها', accent: 'neutral' },
  { key: 'track', label: 'پیگیری', accent: 'neutral' }
];
const WEEKDAY_TO_TAB = { 6: 'sat', 0: 'sun', 2: 'tue', 3: 'wed', 1: 'rest', 4: 'rest', 5: 'rest' };
const TYPE_LABEL = { upper: 'بالاتنه', lower: 'پایین‌تنه' };

/* =====================================================================
   ابزارها
   ===================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);

const store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem('plan:' + key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('plan:' + key, JSON.stringify(value)); } catch { /* حالت خصوصی */ }
  }
};

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const fa = (v) => String(v).replace(/\d/g, (d) => FA_DIGITS[d]).replace(/\./g, '٫');
const toEn = (s) => String(s)
  .replace(/[۰-۹]/g, (d) => FA_DIGITS.indexOf(d))
  .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  .replace(/[٫,]/g, '.')
  .trim();
const num = (s) => parseFloat(toEn(s));
const round1 = (n) => Math.round(n * 10) / 10;
const faNum = (n) => fa(round1(n));

const pad = (n) => String(n).padStart(2, '0');
const dateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => dateStr(new Date());
const parseDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const daysBetween = (a, b) => Math.round((parseDate(b) - parseDate(a)) / 864e5);
const addDays = (s, n) => { const d = parseDate(s); d.setDate(d.getDate() + n); return dateStr(d); };
const faDate = (s, opts = { day: 'numeric', month: 'long' }) => parseDate(s).toLocaleDateString('fa-IR', opts);
// شروع هفته = شنبه
const weekStartOf = (s) => { const d = parseDate(s); return addDays(s, -((d.getDay() + 1) % 7)); };

/* =====================================================================
   هفته برنامه و قانون پیشرفت
   ===================================================================== */
function programWeek() {
  const start = store.get('startDate');
  if (!start) return null;
  const diff = daysBetween(start, todayStr());
  return diff < 0 ? 0 : Math.floor(diff / 7) + 1;
}
const phaseOf = (w) => DATA.progression.find((p) => w >= p.from && w <= p.to) || null;

function renderPhaseCard() {
  const start = store.get('startDate') || '';
  $('#phase').innerHTML = `
    <div id="phase-summary"></div>
    <details ${start ? '' : 'open'}>
      <summary>تاریخ شروع و همه قوانین</summary>
      <label class="field">
        <span>تاریخ شروع برنامه</span>
        <input type="date" id="start-date" value="${start}">
      </label>
      <ol id="phase-list">
        ${DATA.progression.map((p) => `<li data-from="${p.from}" data-to="${p.to}"><b>${p.label}:</b> ${p.rule}</li>`).join('')}
      </ol>
      <p class="muted small">${DATA.profile.summary} هدف: ${DATA.profile.goal} ${DATA.profile.maintenance}</p>
    </details>`;
  $('#start-date').addEventListener('change', (e) => {
    store.set('startDate', e.target.value || null);
    updatePhaseSummary();
    renderTrainingPanels();
  });
  updatePhaseSummary();
}

function updatePhaseSummary() {
  const w = programWeek();
  const p = w ? phaseOf(w) : null;
  let html;
  if (w === null) {
    html = `<div class="phase-head"><span class="pill">اصول پیشرفت</span></div>
            <p class="phase-rule">تاریخ شروع برنامه را وارد کن تا شماره هفته و قانون همان هفته نمایش داده شود.</p>`;
  } else if (w === 0) {
    html = `<div class="phase-head"><span class="pill">هنوز شروع نشده</span></div>
            <p class="phase-rule">برنامه از ${faDate(store.get('startDate'), { weekday: 'long', day: 'numeric', month: 'long' })} شروع می‌شود.</p>`;
  } else if (!p) {
    html = `<div class="phase-head"><span class="pill">هفته ${fa(w)}</span><strong>دوره ${fa(DATA.programWeeks)} هفته‌ای تمام شد</strong></div>
            <p class="phase-rule">برای دوره بعد، تاریخ شروع را به‌روز کن و از وزنه‌های جدید (کمی سنگین‌تر از قبل از دی‌لود) شروع کن.</p>`;
  } else {
    html = `<div class="phase-head"><span class="pill">هفته ${fa(w)} از ${fa(DATA.programWeeks)}</span><strong>${p.short}</strong></div>
            <p class="phase-rule">${p.rule}</p>`;
  }
  $('#phase-summary').innerHTML = html;
  document.querySelectorAll('#phase-list li').forEach((li) => {
    li.classList.toggle('now', !!w && w >= +li.dataset.from && w <= +li.dataset.to);
  });
}

/* =====================================================================
   وضعیت ست‌ها (روزانه ریست می‌شود) و ثبت وزنه
   ===================================================================== */
function setState() {
  const s = store.get('sets');
  return s && s.date === todayStr() ? s : { date: todayStr(), done: {} };
}
function effectiveSets(ex) {
  return programWeek() === 7 ? Math.ceil(ex.sets / 2) : ex.sets;
}
function liftHistory(id) { return (store.get('lifts', {})[id]) || []; }

function liftHistHTML(id) {
  const h = liftHistory(id);
  if (!h.length) return 'هنوز وزنه‌ای ثبت نشده';
  const last = h[h.length - 1];
  const prev = h[h.length - 2];
  return `آخرین: <b>${fa(last.w)} کیلو</b> · ${faDate(last.d)}` +
    (prev ? ` <span>(قبلی: ${fa(prev.w)} · ${faDate(prev.d)})</span>` : '');
}

/* =====================================================================
   رندر
   ===================================================================== */
function macrosHTML(m) {
  const card = (label, val, unit, main) =>
    `<div class="macro${main ? ' main' : ''}"><div class="label">${label}</div><div class="val">${fa(val)}<span class="unit">${unit}</span></div></div>`;
  return `<div class="macros">
    ${card('کالری', m.kcal, 'kcal', true)}
    ${card('پروتئین', m.protein, 'گرم')}
    ${card('کربوهیدرات', m.carbs, 'گرم')}
    ${card('چربی', m.fat, 'گرم')}
  </div>`;
}

function mealsHTML(meals, dinner) {
  return `<ul class="meals">${meals.map((m) => {
    const row = m.kind === 'dinner' ? { ...m, ...dinner, kind: 'dinner' } : m;
    const label = row.kind === 'dinner' ? `<b>شام:</b> ${row.text}` : row.text;
    const chips = row.kcal
      ? `<div class="chips"><span class="chip">${fa(row.kcal)} کالری</span><span class="chip">${fa(row.protein)} گرم پروتئین</span></div>`
      : '';
    return `<li class="meal ${row.kind || ''}"><span class="time">${row.time}</span><div><p>${label}</p>${chips}</div></li>`;
  }).join('')}</ul>`;
}

function substitutesHTML() {
  return `<div class="card"><h2>جایگزین‌های هم‌ارز</h2><ul class="subs">
    ${DATA.substitutes.map((s) => `<li><b>${s.title}</b>${s.items.join(s.free ? '، ' : ' ≈ ')}</li>`).join('')}
  </ul></div>`;
}

function exerciseHTML(ex, dayKey, week, done) {
  if (ex.kind === 'info') {
    return `<div class="ex info"><div class="ex-head"><h3>${ex.name}</h3><span class="chip">${ex.duration}</span></div>
      <p class="muted">${ex.text}</p></div>`;
  }
  const sets = effectiveSets(ex);
  const deload = week === 7;
  const dropActive = ex.drop && week >= 3 && week <= 6;
  const doneCount = Array.from({ length: sets }, (_, i) => done[`${ex.id}:${i}`]).filter(Boolean).length;
  const last = liftHistory(ex.id).slice(-1)[0];

  const chips = [
    ex.drop ? `<span class="chip drop${dropActive ? ' active' : ''}">${dropActive ? 'دراپ‌ست ست آخر' : 'دراپ‌ست ست آخر از هفته ۳'}</span>` : '',
    deload ? `<span class="chip deload">دی‌لود: ${fa(sets)} ست به‌جای ${fa(ex.sets)}</span>` : ''
  ].join(' ');

  const setBtns = Array.from({ length: sets }, (_, i) => {
    const on = !!done[`${ex.id}:${i}`];
    return `<button type="button" class="set${on ? ' on' : ''}" data-action="set" data-day="${dayKey}" data-ex="${ex.id}" data-i="${i}" aria-pressed="${on}" aria-label="ست ${fa(i + 1)}">${on ? '✓' : fa(i + 1)}</button>`;
  }).join('');

  return `<div class="ex${doneCount === sets ? ' complete' : ''}" id="ex-${ex.id}">
    <div class="ex-head">
      <div>
        <h3>${ex.name}</h3>
        ${ex.note ? `<div class="ex-note">${ex.note}</div>` : ''}
        <div class="ex-meta">${fa(sets)} ست × ${fa(ex.reps)} تکرار</div>
      </div>
      <button type="button" class="rest" data-action="timer" data-sec="${ex.rest}" data-name="${ex.name}">⏱ استراحت ${fa(ex.rest)} ثانیه</button>
    </div>
    ${chips.trim() ? `<div style="margin-top:6px">${chips}</div>` : ''}
    <div class="sets">${setBtns}</div>
    <div class="lift">
      <label><span>وزنه (کیلو)${ex.superset ? ' — مثلاً ۲۰ / ۱۵' : ''}</span>
        <input data-lift="${ex.id}" inputmode="${ex.superset ? 'text' : 'decimal'}" autocomplete="off" value="${last ? fa(last.w) : ''}" placeholder="—">
      </label>
      <button type="button" class="btn ghost" data-action="lift" data-ex="${ex.id}">ثبت</button>
    </div>
    <p class="lift-hist" id="hist-${ex.id}">${liftHistHTML(ex.id)}</p>
  </div>`;
}

function dayProgress(dayKey) {
  const done = setState().done;
  let total = 0, count = 0;
  DATA.days[dayKey].exercises.filter((e) => e.kind !== 'info').forEach((ex) => {
    const n = effectiveSets(ex);
    total += n;
    for (let i = 0; i < n; i++) if (done[`${ex.id}:${i}`]) count++;
  });
  return { total, count };
}

function renderDay(key) {
  const d = DATA.days[key];
  const week = programWeek();
  const done = setState().done;
  const { total, count } = dayProgress(key);
  return `
    <div class="day-head">
      <div class="kicker">${TYPE_LABEL[d.type]} · ${d.tab}</div>
      <h2>${d.title}</h2>
    </div>
    ${macrosHTML(d.macros)}
    <div class="card no-print">
      <div class="day-progress">
        <div class="bar"><span id="prog-${key}" style="width:${total ? (count / total) * 100 : 0}%"></span></div>
        <b id="progtxt-${key}">${fa(count)} از ${fa(total)} ست</b>
      </div>
    </div>
    <h2 class="section-title">تمرین</h2>
    ${d.exercises.map((ex) => exerciseHTML(ex, key, week, done)).join('')}
    <h2 class="section-title">تغذیه</h2>
    ${mealsHTML(DATA.trainingMeals, d.dinner)}
    <div style="height:12px"></div>
    ${substitutesHTML()}`;
}

function renderRest() {
  const r = DATA.rest;
  return `
    <div class="day-head"><div class="kicker">${r.subtitle}</div><h2>${r.title}</h2></div>
    ${macrosHTML(r.macros)}
    <h2 class="section-title">وعده‌ها</h2>
    ${mealsHTML(r.meals)}
    <div style="height:12px"></div>
    ${substitutesHTML()}`;
}

function renderSupplements() {
  const s = DATA.supplements;
  return `
    <div class="day-head"><div class="kicker">مکمل‌ها</div><h2>چه چیزی لازم است و چه چیزی نه</h2></div>
    <div class="card">
      <table>
        <thead><tr><th>مکمل</th><th>وضعیت</th><th>مقدار</th></tr></thead>
        <tbody>${s.rows.map((r) => `<tr><td><b>${r.name}</b></td><td><span class="tag ${r.level}">${r.status}</span></td><td>${r.amount}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card"><h2>لازم نیست</h2><p>${s.notNeeded}</p></div>
    <div class="alert"><b>هشدار:</b> ${s.warning}</div>`;
}

function renderTrackSkeleton() {
  const t = DATA.tracking;
  const today = todayStr();
  return `
    <div class="day-head"><div class="kicker">پیگیری</div><h2>وزن، دور کمر و روند</h2></div>
    <div class="card">
      <div class="row-between"><h2>مسیر هدف</h2><span class="muted small">${fa(t.startWeight)} ← ${fa(t.targetWeight)} کیلو</span></div>
      <div class="bar big" style="margin-top:8px"><span id="goal-fill"></span></div>
      <div class="goal-nums"><span>${fa(t.startWeight)}</span><span>${fa(t.targetWeight)}</span></div>
      <p class="goal-text" id="goal-text"></p>
      <p class="muted small">${t.targetNote}</p>
    </div>
    <div class="alert" id="stall" hidden></div>

    <div class="card no-print">
      <h2>ثبت وزن روزانه</h2>
      <p class="muted small">صبح، ناشتا، بعد از دستشویی</p>
      <form id="w-form" class="form-row" style="margin-top:8px">
        <label><span>تاریخ</span><input type="date" name="date" value="${today}"></label>
        <label><span>وزن (کیلو)</span><input name="val" inputmode="decimal" autocomplete="off" placeholder="۹۱٫۸"></label>
        <button class="btn" type="submit">ثبت</button>
      </form>
    </div>

    <div class="card">
      <h2>نمودار وزن</h2>
      <canvas id="chart" aria-label="نمودار وزن روزانه"></canvas>
      <div class="legend"><span><i style="background:var(--muted)"></i>وزن روزانه</span><span><i style="background:var(--accent)"></i>میانگین ۷ روزه</span></div>
    </div>

    <div class="card">
      <h2>میانگین هفتگی</h2>
      <div id="weekly"></div>
    </div>

    <div class="card no-print">
      <h2>دور کمر هفتگی</h2>
      <p class="muted small">هفته‌ای یک بار، در سطح ناف</p>
      <form id="waist-form" class="form-row" style="margin-top:8px">
        <label><span>تاریخ</span><input type="date" name="date" value="${today}"></label>
        <label><span>دور کمر (سانتی‌متر)</span><input name="val" inputmode="decimal" autocomplete="off" placeholder="۹۸"></label>
        <button class="btn" type="submit">ثبت</button>
      </form>
      <ul class="entries" id="waist-list" style="margin-top:8px"></ul>
    </div>

    <div class="card no-print">
      <h2>وزن‌های ثبت‌شده</h2>
      <ul class="entries" id="w-list"></ul>
    </div>

    <div class="card">
      <h2>قوانین پیگیری</h2>
      <ul class="rules">${t.rules.map((r) => `<li>${r}</li>`).join('')}</ul>
    </div>`;
}

/* =====================================================================
   پیگیری: محاسبات
   ===================================================================== */
const sortedEntries = (key) => Object.entries(store.get(key, {}))
  .map(([d, v]) => ({ d, v }))
  .sort((a, b) => (a.d < b.d ? -1 : 1));

function weeklyAverages(entries) {
  const groups = {};
  entries.forEach(({ d, v }) => { (groups[weekStartOf(d)] ||= []).push(v); });
  return Object.keys(groups).sort().map((start) => ({
    start,
    n: groups[start].length,
    avg: groups[start].reduce((a, b) => a + b, 0) / groups[start].length
  }));
}

// دو هفته پشت سر هم کاهش کمتر از آستانه (فقط هفته‌هایی با حداقل ۳ ثبت)
function isStalled(weeks) {
  const w = weeks.filter((x) => x.n >= 3);
  if (w.length < 3) return false;
  const [a, b, c] = w.slice(-3);
  if (daysBetween(a.start, b.start) !== 7 || daysBetween(b.start, c.start) !== 7) return false;
  const th = DATA.tracking.stallThreshold;
  return (a.avg - b.avg) < th && (b.avg - c.avg) < th;
}

function updateTracking() {
  const t = DATA.tracking;
  const weights = sortedEntries('weights');
  const weeks = weeklyAverages(weights);

  // نوار هدف: میانگین ۷ روز اخیر
  const fill = $('#goal-fill');
  if (!fill) return;
  if (weights.length) {
    const lastD = weights[weights.length - 1].d;
    const recent = weights.filter((e) => daysBetween(e.d, lastD) < 7);
    const cur = recent.reduce((a, e) => a + e.v, 0) / recent.length;
    const pct = Math.min(1, Math.max(0, (t.startWeight - cur) / (t.startWeight - t.targetWeight)));
    fill.style.width = `${pct * 100}%`;
    const lost = t.startWeight - cur;
    $('#goal-text').textContent =
      `میانگین ۷ روز اخیر: ${faNum(cur)} کیلو · ` +
      (lost >= 0 ? `${faNum(lost)} کیلو کم شده` : `${faNum(-lost)} کیلو بیشتر از شروع`) +
      ` · ${faNum(Math.max(0, cur - t.targetWeight))} کیلو تا ${fa(t.targetWeight)}`;
  } else {
    fill.style.width = '0%';
    $('#goal-text').textContent = 'هنوز وزنی ثبت نشده.';
  }

  // هشدار توقف
  const stall = $('#stall');
  stall.hidden = !isStalled(weeks);
  stall.innerHTML = `<b>هشدار:</b> دو هفته پشت سر هم میانگین وزن کمتر از ${faNum(t.stallThreshold)} کیلو در هفته کم شده. <b>${t.stallMessage}</b>`;

  // جدول هفتگی
  $('#weekly').innerHTML = weeks.length
    ? `<table><thead><tr><th>هفته (از شنبه)</th><th>ثبت</th><th>میانگین</th><th>تغییر</th></tr></thead><tbody>
        ${weeks.slice().reverse().slice(0, 12).map((w, i, arr) => {
          const prev = arr[i + 1];
          let diff = '—';
          if (prev) {
            const dlt = w.avg - prev.avg;
            diff = `<span class="${dlt > 0 ? 'up' : 'down'}">${dlt > 0 ? '+' : '−'}${faNum(Math.abs(dlt))}</span>`;
          }
          return `<tr><td>${faDate(w.start)}</td><td>${fa(w.n)}</td><td><b>${faNum(w.avg)}</b></td><td>${diff}</td></tr>`;
        }).join('')}
      </tbody></table>`
    : '<p class="empty">بعد از ثبت وزن، میانگین هر هفته اینجا می‌آید.</p>';

  // لیست‌ها
  const listHTML = (entries, key, unit) => entries.length
    ? entries.slice().reverse().slice(0, 14).map((e) =>
        `<li><span>${faDate(e.d, { weekday: 'short', day: 'numeric', month: 'long' })}</span><b>${faNum(e.v)} ${unit}</b><button class="del" type="button" data-action="del" data-key="${key}" data-d="${e.d}" aria-label="حذف">×</button></li>`).join('')
    : '<li class="empty">چیزی ثبت نشده</li>';
  $('#w-list').innerHTML = listHTML(weights, 'weights', 'کیلو');
  $('#waist-list').innerHTML = listHTML(sortedEntries('waist'), 'waist', 'سانتی‌متر');

  drawChart(weights);
}

/* =====================================================================
   نمودار (canvas بدون کتابخانه)
   ===================================================================== */
function drawChart(all) {
  const canvas = $('#chart');
  if (!canvas || !canvas.offsetWidth) return; // تب پنهان است
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  const css = getComputedStyle(document.body);
  const col = (v) => css.getPropertyValue(v).trim();
  const font = '12px Vazirmatn, system-ui, sans-serif';
  ctx.font = font;

  const last = all.length ? all[all.length - 1].d : null;
  const pts = last ? all.filter((e) => daysBetween(e.d, last) < 90) : [];
  if (pts.length < 2) {
    ctx.fillStyle = col('--muted');
    ctx.textAlign = 'center';
    ctx.fillText('برای نمودار حداقل ۲ وزن ثبت کن', W / 2, H / 2);
    return;
  }

  // میانگین متحرک ۷ روزه
  const ma = pts.map((p) => {
    const win = pts.filter((q) => { const g = daysBetween(q.d, p.d); return g >= 0 && g < 7; });
    return { d: p.d, v: win.reduce((a, q) => a + q.v, 0) / win.length };
  });

  const vals = pts.map((p) => p.v);
  let lo = Math.floor(Math.min(...vals) - 0.5), hi = Math.ceil(Math.max(...vals) + 0.5);
  if (hi - lo < 2) { lo -= 1; hi += 1; }
  const first = pts[0].d;
  const span = Math.max(1, daysBetween(first, last));
  const padL = 12, padR = 40, padT = 10, padB = 26; // برچسب محور y سمت راست (RTL)
  const x = (d) => W - padR - (daysBetween(first, d) / span) * (W - padR - padL); // زمان از راست به چپ
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);

  // خطوط راهنما
  ctx.strokeStyle = col('--line');
  ctx.fillStyle = col('--muted');
  ctx.lineWidth = 1;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const step = Math.max(1, Math.ceil((hi - lo) / 4));
  for (let v = lo; v <= hi; v += step) {
    ctx.beginPath(); ctx.moveTo(padL, y(v)); ctx.lineTo(W - padR, y(v)); ctx.stroke();
    ctx.fillText(fa(v), W - padR + 6, y(v));
  }
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'right';
  ctx.fillText(faDate(first, { day: 'numeric', month: 'short' }), W - padR, H - 6);
  ctx.textAlign = 'left';
  ctx.fillText(faDate(last, { day: 'numeric', month: 'short' }), padL, H - 6);

  // وزن روزانه
  ctx.strokeStyle = col('--muted');
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(x(p.d), y(p.v)) : ctx.moveTo(x(p.d), y(p.v))));
  ctx.stroke();
  ctx.fillStyle = col('--muted');
  pts.forEach((p) => { ctx.beginPath(); ctx.arc(x(p.d), y(p.v), 2.5, 0, Math.PI * 2); ctx.fill(); });
  ctx.globalAlpha = 1;

  // میانگین ۷ روزه
  ctx.strokeStyle = col('--accent');
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ma.forEach((p, i) => (i ? ctx.lineTo(x(p.d), y(p.v)) : ctx.moveTo(x(p.d), y(p.v))));
  ctx.stroke();
}

/* =====================================================================
   تایمر استراحت
   ===================================================================== */
const timer = { end: 0, total: 0, id: null, hideId: null };
let audioCtx = null;

function unlockAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch { audioCtx = null; }
}
function beep() {
  if (!audioCtx) return;
  [0, 0.35, 0.7].forEach((t) => {
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime + t);
    g.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + t + 0.25);
    o.connect(g).connect(audioCtx.destination);
    o.start(audioCtx.currentTime + t);
    o.stop(audioCtx.currentTime + t + 0.3);
  });
}

function startTimer(sec, name) {
  unlockAudio();
  clearInterval(timer.id); clearTimeout(timer.hideId);
  timer.total = sec * 1000;
  timer.end = Date.now() + timer.total;
  const el = $('#timer');
  el.hidden = false;
  el.classList.remove('done');
  $('#timer-name').textContent = `استراحت · ${name}`;
  tick();
  timer.id = setInterval(tick, 250);
}
function tick() {
  const left = Math.max(0, timer.end - Date.now());
  const s = Math.ceil(left / 1000);
  $('#timer-time').textContent = fa(`${Math.floor(s / 60)}:${pad(s % 60)}`);
  $('#timer-fill').style.width = `${timer.total ? (left / timer.total) * 100 : 0}%`;
  if (left <= 0) finishTimer();
}
function finishTimer() {
  clearInterval(timer.id);
  const el = $('#timer');
  el.classList.add('done');
  $('#timer-time').textContent = 'برو ست بعدی!';
  if (navigator.vibrate) navigator.vibrate([400, 150, 400, 150, 400]);
  beep();
  timer.hideId = setTimeout(stopTimer, 8000);
}
function stopTimer() {
  clearInterval(timer.id); clearTimeout(timer.hideId);
  $('#timer').hidden = true;
}

/* =====================================================================
   تب‌ها و رویدادها
   ===================================================================== */
let activeTab = null;
let renderedDate = todayStr();

function renderTabs(todayTab) {
  $('#tabs').innerHTML = TABS.map((t) =>
    `<button type="button" role="tab" class="tab${t.key === todayTab ? ' today' : ''}" data-action="tab" data-tab="${t.key}" data-accent="${t.accent}" aria-selected="false">${t.label}</button>`
  ).join('');
}

function renderTrainingPanels() {
  Object.keys(DATA.days).forEach((k) => { $(`[data-panel="${k}"]`).innerHTML = renderDay(k); });
}

function renderPanels() {
  $('#panels').innerHTML = TABS.map((t) => `<section class="panel" data-panel="${t.key}" role="tabpanel" hidden></section>`).join('');
  renderTrainingPanels();
  $('[data-panel="rest"]').innerHTML = renderRest();
  $('[data-panel="supp"]').innerHTML = renderSupplements();
  $('[data-panel="track"]').innerHTML = renderTrackSkeleton();
  bindTrackForms();
  updateTracking();
}

function showTab(key) {
  activeTab = key;
  const t = TABS.find((x) => x.key === key);
  document.body.dataset.accent = t.accent;
  document.querySelectorAll('.tab').forEach((b) => {
    const on = b.dataset.tab === key;
    b.setAttribute('aria-selected', on);
    if (on) b.scrollIntoView({ inline: 'center', block: 'nearest' });
  });
  document.querySelectorAll('.panel').forEach((p) => { p.hidden = p.dataset.panel !== key; });
  if (key === 'track') drawChart(sortedEntries('weights'));
}

function toggleSet(btn) {
  const s = setState();
  const k = `${btn.dataset.ex}:${btn.dataset.i}`;
  if (s.done[k]) delete s.done[k]; else s.done[k] = true;
  store.set('sets', s);
  const on = !!s.done[k];
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.textContent = on ? '✓' : fa(+btn.dataset.i + 1);
  if (on && navigator.vibrate) navigator.vibrate(30);

  const card = btn.closest('.ex');
  const all = card.querySelectorAll('.set');
  card.classList.toggle('complete', [...all].every((b) => b.classList.contains('on')));

  const day = btn.dataset.day;
  const { total, count } = dayProgress(day);
  $(`#prog-${day}`).style.width = `${total ? (count / total) * 100 : 0}%`;
  $(`#progtxt-${day}`).textContent = `${fa(count)} از ${fa(total)} ست`;
}

function saveLift(id) {
  const input = document.querySelector(`[data-lift="${id}"]`);
  const raw = toEn(input.value).replace(/\s+/g, ' ');
  if (!raw) { input.focus(); return; }
  if (!/^[\d.]+( ?\/ ?[\d.]+)?$/.test(raw)) { alert('فقط عدد وارد کن (برای سوپرست مثلاً ۲۰ / ۱۵).'); return; }
  const lifts = store.get('lifts', {});
  const h = (lifts[id] || []).filter((e) => e.d !== todayStr());
  h.push({ d: todayStr(), w: raw });
  lifts[id] = h.slice(-40);
  store.set('lifts', lifts);
  input.value = fa(raw);
  input.blur();
  $(`#hist-${id}`).innerHTML = liftHistHTML(id);
}

function bindTrackForms() {
  const bind = (formId, key, min, max, label) => {
    $(formId).addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      const v = num(f.val.value);
      if (!(v >= min && v <= max)) { alert(`${label} معتبر وارد کن.`); return; }
      const m = store.get(key, {});
      m[f.date.value || todayStr()] = round1(v);
      store.set(key, m);
      f.val.value = '';
      f.val.blur();
      updateTracking();
    });
  };
  bind('#w-form', 'weights', 30, 300, 'وزن');
  bind('#waist-form', 'waist', 40, 200, 'دور کمر');
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-action]');
  if (!b) return;
  switch (b.dataset.action) {
    case 'tab': showTab(b.dataset.tab); break;
    case 'set': toggleSet(b); break;
    case 'lift': saveLift(b.dataset.ex); break;
    case 'timer': startTimer(+b.dataset.sec, b.dataset.name); break;
    case 'timer-add':
      if ($('#timer').classList.contains('done')) { startTimer(15, $('#timer-name').textContent.replace('استراحت · ', '')); }
      else { timer.end += 15000; timer.total += 15000; tick(); }
      break;
    case 'timer-stop': stopTimer(); break;
    case 'print': window.print(); break;
    case 'del': {
      if (!confirm('این مورد حذف شود؟')) break;
      const m = store.get(b.dataset.key, {});
      delete m[b.dataset.d];
      store.set(b.dataset.key, m);
      updateTracking();
      break;
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.matches('[data-lift]')) { e.preventDefault(); saveLift(e.target.dataset.lift); }
});

// قبل از چاپ، جزئیات قوانین باز شود
let detailsWasOpen = false;
window.addEventListener('beforeprint', () => { const d = $('#phase details'); detailsWasOpen = d.open; d.open = true; });
window.addEventListener('afterprint', () => { $('#phase details').open = detailsWasOpen; });

// اگر اپ از دیروز باز مانده، با برگشتن به آن روز جدید اعمال شود
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && todayStr() !== renderedDate) init();
});

let resizeId;
window.addEventListener('resize', () => {
  clearTimeout(resizeId);
  resizeId = setTimeout(() => { if (activeTab === 'track') drawChart(sortedEntries('weights')); }, 150);
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
  if (activeTab === 'track') drawChart(sortedEntries('weights'));
});

function init() {
  renderedDate = todayStr();
  const todayTab = WEEKDAY_TO_TAB[new Date().getDay()];
  $('#today-label').textContent = new Date().toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  renderPhaseCard();
  renderTabs(todayTab);
  renderPanels();
  showTab(todayTab);
}

init();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (activeTab === 'track') drawChart(sortedEntries('weights')); });
