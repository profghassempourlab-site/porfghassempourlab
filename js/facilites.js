const facilitiesSlides = document.querySelector('.facilities-slides');
const facilitiesSlideElements = document.querySelectorAll('.facilities-slide');
const facilitiesCount = facilitiesSlideElements.length;
const facilitiesPrevBtn = document.querySelector('.facilities-prev');
const facilitiesNextBtn = document.querySelector('.facilities-next');
const facilitiesSlideLinesContainer = document.querySelector('.facilities-slide-lines');
let facilitiesIndex = 0;

// بررسی وجود عناصر ضروری
if (!facilitiesSlides || !facilitiesSlideElements.length || !facilitiesSlideLinesContainer) {
  console.error('یکی از عناصر اسلایدر پیدا نشد:', {
    facilitiesSlides: !!facilitiesSlides,
    facilitiesSlideElements: facilitiesSlideElements.length,
    facilitiesSlideLinesContainer: !!facilitiesSlideLinesContainer
  });
}

// ساخت خطوط و اضافه کردن کلیک
function createSlideLines() {
  if (!facilitiesSlideLinesContainer) return;
  facilitiesSlideLinesContainer.innerHTML = '';
  for (let i = 0; i < facilitiesCount; i++) {
    const line = document.createElement('div');
    line.classList.add('facilities-slide-line');
    if (i === facilitiesIndex) line.classList.add('active'); // تنظیم خط فعال
    line.addEventListener('click', () => {
      facilitiesGoToSlide(i);
    });
    facilitiesSlideLinesContainer.appendChild(line);
  }
  // اطمینان از نمایش کانتینر خطوط
  facilitiesSlideLinesContainer.style.display = 'flex';
}

// به‌روزرسانی وضعیت خطوط
function facilitiesUpdateLines() {
  const lines = document.querySelectorAll('.facilities-slide-line');
  lines.forEach(l => l.classList.remove('active'));
  if (lines[facilitiesIndex]) lines[facilitiesIndex].classList.add('active');
}

// آپدیت اسلایدر و نمایش دکمه‌ها و خطوط
function facilitiesUpdateSlider() {
  if (facilitiesSlides) {
    facilitiesSlides.style.transform = `translateX(${-facilitiesIndex * 100}%)`;
  }
  facilitiesUpdateLines();
  // نمایش دکمه‌ها و خطوط
  if (facilitiesPrevBtn) facilitiesPrevBtn.style.display = 'block';
  if (facilitiesNextBtn) facilitiesNextBtn.style.display = 'block';
  if (facilitiesSlideLinesContainer) facilitiesSlideLinesContainer.style.display = 'flex';
}

// رفتن به اسلاید خاص
function facilitiesGoToSlide(i) {
  facilitiesIndex = Math.max(0, Math.min(i, facilitiesCount - 1)); // جلوگیری از شاخص نامعتبر
  facilitiesUpdateSlider();
}

// بررسی hash و رفتن به اسلاید مربوطه
function goToSlideFromHash() {
  createSlideLines(); // ساخت خطوط
  const hash = window.location.hash;
  let index = 0;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const idx = Array.from(facilitiesSlideElements).indexOf(target);
      if (idx !== -1) index = idx;
    }
  }
  facilitiesIndex = index; // تنظیم شاخص
  facilitiesUpdateSlider(); // به‌روزرسانی اسلایدر و خطوط
}

// دکمه‌ها
if (facilitiesNextBtn) {
  facilitiesNextBtn.addEventListener('click', () => {
    facilitiesIndex = (facilitiesIndex + 1) % facilitiesCount;
    facilitiesUpdateSlider();
  });
}
if (facilitiesPrevBtn) {
  facilitiesPrevBtn.addEventListener('click', () => {
    facilitiesIndex = (facilitiesIndex - 1 + facilitiesCount) % facilitiesCount;
    facilitiesUpdateSlider();
  });
}

// حرکت خودکار
setInterval(() => {
  facilitiesIndex = (facilitiesIndex + 1) % facilitiesCount;
  facilitiesUpdateSlider();
}, 10000);

// اجرا هنگام بارگذاری صفحه
window.addEventListener('load', () => {
  goToSlideFromHash();
});

// به‌روزرسانی هنگام تغییر hash
window.addEventListener('hashchange', () => {
  goToSlideFromHash();
});