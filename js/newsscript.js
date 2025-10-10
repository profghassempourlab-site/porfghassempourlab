const newsData = [
  { id: 14040506,
    title: "​Amin win the best poster",
    content: "​Amin win the best poster presentation on his research (Methylation pattern of GSTP1 gens as biomarker in Acute Lymphoblastic Leukemia using mass spectrometry) in The First International Congress of Cancer Genomics 2023 held on March 5th. Congrats Amin!! Wish you the best!.",    
    images: ["img/test.jpg", "img/saeed Norouzi.png"]
  },
  { id: 14040606,
    title: "secandry news",
    content: "This is the second news text and more details have been written about the second news.",
    images: ["img/test2.jpg", "img/test.jpg"]
  },
  { id: 3, 
    title: "Thired news",
    content: "This is the text of the first news item, and more details are written about the third news item.",
    images: ["img/test.jpg"]
  },
  { id: 4, 
    title: "Thired news",
    content: "This is the text of the first news item, and more details are written about the third news item.",
    images: ["img/test.jpg"]
  },
  { id: 5, 
    title: "Thired news",
    content: "This is the text of the first news item, and more details are written about the third news item.",
    images: ["img/test.jpg"]
  },
  { id: 6, 
    title: "Thired news",
    content: "This is the text of the first news item, and more details are written about the third news item.",
    images: ["img/test.jpg"]
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
      <a href="single-news.HTML?id=${news.id}#news-container">View news</a>
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
    backLink.href = "news-and-gallery.HTML";
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
