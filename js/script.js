// ======================
// 1. Mobile Menu
// ======================
document.getElementById('hamburger')?.addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('show');
});

// ======================
// 2. Smooth Scrolling
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
      document.getElementById('menu')?.classList.remove('show');
    }
  });
});


const links = document.querySelectorAll(".menu a");

links.forEach(link => {
  link.addEventListener("click", function () {
    links.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// ======================
// 3. Header scroll effect
// ======================
window.addEventListener('scroll', function () {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

// ======================
// 4. اسلایدشو
// ======================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

// تغییر اسلاید با کلیک روی نقاط
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    currentSlide = slideIndex;
    showSlide(slideIndex);
  });
});

// اسلاید خودکار هر 5 ثانیه

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 10000);





// ----------------------------------------------

  window.addEventListener("load", function(){
    let preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";       // کم‌کم محو میشه
    setTimeout(() => {
      preloader.style.display = "none";  // کامل حذف میشه
    }, 500); // نیم‌ثانیه بعد
  });

