const newsData = [
  { id: 20260108,
    title: "Happy birthday",
    content: "Happy birthday, Professor. We are very happy to learn new knowledge with you every year. May you always be happy and healthy.",    
    images: ["img/News/birthday1.png"]
  },
  { id: 20260107,
    title: "The fifth Pharmex Festival",
    content: "The fifth Pharmex Festival was held on August 23-25, 2023 in Tehran. Attending this Festival as the only academic booth from Prof. Gassempour's group is one of the best and most enjoyable experiences that we have every year.",    
    images: ["img/News/fifth pharmex1.jfif", "img/News/fifth pharmex2.jpg"]
  },
  { id: 20260106,
    title: "The luncheon ceremony",
    content: "The luncheon ceremony at the Medicinal Plants and Raw Materials Research Institute's farm, which is held with professors, is a time for students and professors to relax mentally and get away from the hard work environment for a while.",    
    images: ["img/News/lunch1.jpg"]
  },
  { id: 20260105,
    title: "Teacher's Day",
    content: "Teacher's Day is an annual event held to commemorate the martyred teacher Motahari. This day is celebrated by students to appreciate the efforts of teachers.",
    images: ["img/News/teacher day1.jpg"]
  },
  { id: 20260104, 
    title: "The Iftar ceremony of the Institute",
    content: "The Iftar ceremony of the Institute of Medicinal Plants and Raw Materials, held every year with professors and students, becomes a memorable day in the history of the institute.",
    images: ["img/News/iftar1.jpg", "img/News/iftar2.jpg", "img/News/iftar3.jpg"]
  },
  { id: 20260103, 
    title: "Students travel to Italy",
    content: "Students travel to Italy to learn up-to-date science to strengthen the group's knowledge and connect with the world.",
    images: ["img/News/jafar1.jpg", "img/News/jafar2.jpg"]
  },
  { id: 20260102, 
    title: "Amir attended on International Conference Microbiology",
    content: "On November 2023 Amir attended on International Conference Microbiology and Immunology at United Arab Emirates,where he presented his research on (Affinity -MALDI-TOF MS Technique for rapid and sensetive screening of Brucellosis in Biological sample). !Congratulation Amir",
    images: ["img/News/amirreza1.png", "img/News/amirreza2.jpeg"]
  },
  { id: 20260101, 
    title: "​Amin win the best poster",
    content: "The Iftar ceremony of the Institute of Medicinal Plants and Raw Materials, held every year with professors and students, becomes a memorable day in the history of the institute.",
    images: ["img/News/amin1.jpg", "img/News/amin2.jpg"]
  }
];

// رندر لیست خبرها
function renderNewsList() {
  const list = document.getElementById("news-list");
  newsData.forEach(news => {
    const li = document.createElement("li");
    li.className = "news-card";

    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content");

    // شرط برای اسلایدشو یا عکس تکی
    if (news.images.length > 1) {
      const slideshow = createNewsSlideshow(news.images);
      mainContent.appendChild(slideshow);
    } else {
      const img = document.createElement("img");
      img.src = news.images[0];
      img.alt = news.title;
      mainContent.appendChild(img);
    }

    const overlay = document.createElement("div");
    overlay.classList.add("news-overlay");
    overlay.innerHTML = `
      <h2>${news.title}</h2>
      <p>${news.content.substring(0, 40)}...</p>
      <a href="single-news.html?id=${news.id}#news-container">View news</a>
    `;

    mainContent.appendChild(overlay);
    li.appendChild(mainContent);
    list.appendChild(li);
  });
}

// رندر صفحه تک‌خبر
function renderSingleNews() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const news = newsData.find(n => n.id === id);

  const container = document.getElementById("news-container");
  if (news) {
    const newsBox = document.createElement("div");
    newsBox.classList.add("news-container");

    const h1 = document.createElement("h1");
    h1.textContent = news.title;
    newsBox.appendChild(h1);

    if (news.images.length > 1) {
      const slideshow = createNewsSlideshow(news.images);
      slideshow.classList.add("single-news-slideshow"); // 👉 استایل مخصوص خبر تکی
      newsBox.appendChild(slideshow);
    } else {
      const img = document.createElement("img");
      img.src = news.images[0];
      img.alt = news.title;
      img.classList.add("single-news-img"); // 👉 استایل مخصوص خبر تکی
      newsBox.appendChild(img);
    }

    const p = document.createElement("p");
    p.textContent = news.content;
    newsBox.appendChild(p);

    const backLink = document.createElement("a");
    backLink.href = "news-and-gallery.html";
    backLink.classList.add("back-link");
    backLink.textContent = "Returne";
    newsBox.appendChild(backLink);

    container.innerHTML = "";
    container.appendChild(newsBox);
  } else {
    container.innerHTML = "<p>خبر یافت نشد!</p>";
  }
}

// تابع اسلایدشو
function createNewsSlideshow(images) {
  let index = 0;
  const container = document.createElement("div");
  container.classList.add("news-slideshow");

  const img = document.createElement("img");   
  img.src = images[index];
  img.classList.add("slideshow-img"); // 👉 این خطو اضافه کن
  container.appendChild(img);


  const nextBtn = document.createElement("button");
  nextBtn.innerText = "›";
  nextBtn.classList.add("news-next-btn");
  nextBtn.onclick = () => {
    index = (index + 1) % images.length;
    img.src = images[index];
  };

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "‹";
  prevBtn.classList.add("news-prev-btn");
  prevBtn.onclick = () => {
    index = (index - 1 + images.length) % images.length;
    img.src = images[index];
  };

  container.appendChild(prevBtn);
  container.appendChild(nextBtn);

  if (images.length > 1) {
    setInterval(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
    }, 5000);
  }

  return container;
}
