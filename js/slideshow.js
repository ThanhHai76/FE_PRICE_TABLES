let currentSlideIndex = 0;
let slideArray = []; // Mang luu cac slide
let dotArray = [];

//Ham tao ra doi tuong slide
function Slide(title1, title2, image, content, button1, button2) {
  this.title1 = title1;
  this.title2 = title2;
  this.image = image;
  this.content = content;
  this.button1 = button1;
  this.button2 = button2;

  this.class = "slider-dark ";

  slideArray.push(this);
}

function Dot(currentSlide) {
  this.currentSlide = currentSlide;
  this.class = "dot";
  dotArray.push(this);
}

//Them cac doi tuong slide
let slide1 = new Slide(
  "Pricing",
  " Tables",
  "./images/icon-slider.png",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam minima iure aliquam sed. Delectus quos obcaecati id similique! Numquam commodi praesentium neque est ex cumque voluptate voluptatum aliquam doloremque?",
  "Purchase now",
  "More details"
);
let slide2 = new Slide(
  "Pricing",
  " Tables 2",
  "./images/icon-slider.png",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam minima iure aliquam sed. Delectus quos obcaecati id similique! Numquam commodi praesentium neque est ex cumque voluptate voluptatum aliquam doloremque?",
  "Purchase now",
  "More details"
);
let slide3 = new Slide(
  "Pricing",
  " Tables 3",
  "./images/icon-slider.png",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam minima iure aliquam sed. Delectus quos obcaecati id similique! Numquam commodi praesentium neque est ex cumque voluptate voluptatum aliquam doloremque?",
  "Purchase now",
  "More details"
);
let slide4 = new Slide(
  "Pricing",
  " Tables 4",
  "./images/icon-slider.png",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam minima iure aliquam sed. Delectus quos obcaecati id similique! Numquam commodi praesentium neque est ex cumque voluptate voluptatum aliquam doloremque?",
  "Purchase now",
  "More details"
);
let slide5 = new Slide(
  "Pricing",
  " Tables 5",
  "./images/icon-slider.png",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam minima iure aliquam sed. Delectus quos obcaecati id similique! Numquam commodi praesentium neque est ex cumque voluptate voluptatum aliquam doloremque?",
  "Purchase now",
  "More details"
);

let dot1 = new Dot(0);
let dot2 = new Dot(1);
let dot3 = new Dot(2);
let dot4 = new Dot(3);
let dot5 = new Dot(4);

// Tu mang slide da tao, dua vao HTML
function buildSlider() {
  let myHTML;
  let myDot;

  for (let i = 0; i < slideArray.length; i++) {
    myHTML +=
      "<div class='" +
      slideArray[i].class +
      "'>" +
      "<img class='image' src='" +
      slideArray[i].image +
      "' alt='' class='icon-slider'>" +
      "<div class='title-slider'>" +
      "<div class='title1'>" +
      slideArray[i].title1 +
      "</div>" +
      "<div class='title2'>" +
      slideArray[i].title2 +
      "</div>" +
      "</div>" +
      "<div>" +
      "<p class='content'>" +
      slideArray[i].content +
      "</p>" +
      "</div>" +
      "<div class='buttons'>" +
      "<a href='#' class='btn purchase'>" +
      slideArray[i].button1 +
      "</a>" +
      "<a href='#' class='btn more-detail'>" +
      slideArray[i].button2 +
      "</a>" +
      "</div>" +
      "</div>";

    myDot +=
      "<span class='" +
      dotArray[i].class +
      "' name='" +
      dotArray[i].currentSlide +
      "'></span>";
  }

  // Dua HTML vua tao vao class slideshow
  document.querySelector(".slideshow").innerHTML = myHTML;
  document.querySelector(".currentSlide").innerHTML = myDot;
  // Hien thị slide dau tien
  document.querySelector(".slider-dark").style.left = 0;
}

// Goi ham thuc thi
buildSlider();

let slider = document.querySelectorAll(".slider-dark");
let prevSlide = document.querySelector(".prev");
let nextSlide = document.querySelector(".next");

let dots = document.querySelectorAll(".dot");
dots[currentSlideIndex].classList.add("active");

prevSlide.addEventListener("click", prevSlide_func);

function prevSlide_func() {
  let nextSlideIndex; // Tim slide truoc do
  if (currentSlideIndex === 0) {
    // Neu slideIndex = 0 thi ve slide cuoi
    nextSlideIndex = slideArray.length - 1;
  } else {
    // Neu khong thi giam index di 1
    nextSlideIndex = currentSlideIndex - 1;
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // An cac dot con lai
  }
  dots[nextSlideIndex].className += " active"; // Show dot current, them class active

  // An slide hien tai, hien slide "currentSlideIndex"
  slider[nextSlideIndex].style.left = "-100%";
  slider[currentSlideIndex].style.left = 0;

  // Them class de chuyen slide co animation
  slider[nextSlideIndex].setAttribute("class", "slider-dark slideInLeft");
  slider[currentSlideIndex].setAttribute("class", "slider-dark slideOutRight");

  // Cap nhat gia tri slide hien tai
  currentSlideIndex = nextSlideIndex;
}

nextSlide.addEventListener("click", nextSlide_func);

function nextSlide_func() {
  let nextSlideIndex;
  if (currentSlideIndex === slideArray.length - 1) {
    nextSlideIndex = 0;
  } else {
    nextSlideIndex = currentSlideIndex + 1;
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // An cac dot con lai
  }
  dots[nextSlideIndex].className += " active"; // Show dot current, them class active

  slider[nextSlideIndex].style.left = "100%";
  slider[currentSlideIndex].style.left = 0;

  slider[nextSlideIndex].setAttribute("class", "slider-dark slideInRight");
  slider[currentSlideIndex].setAttribute("class", "slider-dark slideOutLeft");

  currentSlideIndex = nextSlideIndex;
}

dots.forEach((elem) => {
  elem.addEventListener("click", function () {
    count = Number(elem.getAttribute("name"));
    showSlides(count);
  });
});

//Show slide khi nhan vao dot
function showSlides(nextSlideIndex) {
  if (currentSlideIndex == 4 && nextSlideIndex == 0) {
    nextSlide_func();
  } 
  if (currentSlideIndex == 0 && nextSlideIndex == 4) {
    prevSlide_func();
  } 
  if (currentSlideIndex < nextSlideIndex) {
    for (let i = currentSlideIndex; i < nextSlideIndex; i++) {
      nextSlide_func();
    }
  } else {
    for (let i = currentSlideIndex; i > nextSlideIndex ; i--) {
      prevSlide_func();
    }
  }
}
