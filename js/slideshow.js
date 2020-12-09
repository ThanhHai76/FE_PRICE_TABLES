let currentSlideIndex = 0;
let slideArray = [];// Mang luu cac slide

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

// Tu mang slide da tao, dua vao HTML
function buildSlider() {
  let myHTML;

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
  }

  // Dua HTML vua tao vao class slideshow
  document.getElementsByClassName("slideshow")[0].innerHTML = myHTML;
  // Hien thị slide dau tien
  document.getElementsByClassName("slider-dark")[currentSlideIndex].style.left = 0;
}

// Goi ham thuc thi
buildSlider();

let dots = document.getElementsByClassName("dot");
dots[currentSlideIndex].className += " active";

function prevSlide() {
  let nextSlideIndex;// Tim slide truoc do
  if (currentSlideIndex === 0) {// Neu slideIndex = 0 thi ve slide cuoi
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
  document.getElementsByClassName("slider-dark")[nextSlideIndex].style.left = "-100%";
  document.getElementsByClassName("slider-dark")[currentSlideIndex].style.left = 0;

  // Them class de chuyen slide co animation
  document
    .getElementsByClassName("slider-dark")[nextSlideIndex]
    .setAttribute("class", "slider-dark slideInLeft");
  document
    .getElementsByClassName("slider-dark")[currentSlideIndex]
    .setAttribute("class", "slider-dark slideOutRight");

  // Cap nhat gia tri slide hien tai
  currentSlideIndex = nextSlideIndex;
}

function nextSlide() {
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
  
  document.getElementsByClassName("slider-dark")[nextSlideIndex].style.left = "100%";
  document.getElementsByClassName("slider-dark")[currentSlideIndex].style.left = 0;

  document
    .getElementsByClassName("slider-dark")[nextSlideIndex]
    .setAttribute("class", "slider-dark slideInRight");
  document
    .getElementsByClassName("slider-dark")[currentSlideIndex]
    .setAttribute("class", "slider-dark slideOutLeft");

  currentSlideIndex = nextSlideIndex;
}

//Show slide khi nhan vao dot
function showSlides(nextSlideIndex) {
  if(currentSlideIndex === 2 && nextSlideIndex === 0){
    nextSlide()
  }
  if(currentSlideIndex === 0 && nextSlideIndex === 2){
    prevSlide();
  }
  if (currentSlideIndex < nextSlideIndex){
    for(let i=currentSlideIndex; i<nextSlideIndex; i++){
      nextSlide();
    }
  } else {
    for(let i=nextSlideIndex; i<currentSlideIndex; i++){
      prevSlide();
    }
  }
}
