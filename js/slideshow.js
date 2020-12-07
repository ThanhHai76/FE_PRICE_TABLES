let currentSlideIndex = 0;
// Mang luu cac slide
let slideArray = [];

//Ham tao ra cac doi tuong slide
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

//Tao cac doi tuong slide

let slide1 = new Slide(
  "Pricing",
  " Tables 1",
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

// Từ mảng slide đã tạo, ta tiến hành đưa nó vào source HTML
function buildSlider() {
  // A letiable to hold all our HTML
  let myHTML;

  // Go through the Array and add the code to our HTML
  for (let i = 0; i < slideArray.length; i++) {
    myHTML +=
      "<div class='" +
      slideArray[i].class + 
      "'>" +
      "<img class='image' src='" +
      slideArray[i].image +
      "' alt='' class='icon-slider'>" +
      "<div class='title-slider'>" +
      "<span class='title1'>" +
      slideArray[i].title1 +
      "</span>" +
      "<span class='title2'>" +
      slideArray[i].title2 +
      "</span>" +
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

  // Đưa HTML chúng ta vừa tạo vào id #mySlider
  document.getElementsByClassName("slideshow")[0].innerHTML = myHTML;

  // Đồng thời hiển thị slide đầu tiên
  document.getElementsByClassName("slider-dark")[currentSlideIndex].style.left = 0;
}

// Gọi hàm thực thi
buildSlider();

let dots = document.getElementsByClassName("dot");
dots[currentSlideIndex].className += " active"; // show dot, them class active

// Xử lý bấm nút chuyển slide trước đó
function prevSlide() {
  // Tìm slide trước đó
  let nextSlideIndex;
  // Nếu chỉ số slide là 0, về slide cuối
  if (currentSlideIndex === 0) {
    nextSlideIndex = slideArray.length - 1;
  } else {
    // Nếu không thì giảm chỉ số đi 1
    nextSlideIndex = currentSlideIndex - 1;
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // an cac dot con lai
  }
  dots[nextSlideIndex].className += " active"; // show dot, them class active

  // Ẩn slide hiện tại, hiện slide "currentSlideIndex"
  document.getElementsByClassName("slider-dark")[nextSlideIndex].style.left = "-100%";
  document.getElementsByClassName("slider-dark")[currentSlideIndex].style.left = 0;

  // Thêm class để chuyển slide có animation đã định nghĩa ở bước 3
  document
    .getElementsByClassName("slider-dark")[nextSlideIndex]
    .setAttribute("class", "slider-dark slideInLeft");
  document
    .getElementsByClassName("slider-dark")[currentSlideIndex]
    .setAttribute("class", "slider-dark slideOutRight");

  // Cập nhật giá trị slide hiện tại
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
    dots[i].className = dots[i].className.replace(" active", ""); // an cac dot con lai
  }
  dots[nextSlideIndex].className += " active"; // show dot, them class active
  
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

function showSlides(nextSlideIndex) {
  if (currentSlideIndex === 0 && nextSlideIndex === 1) {
    nextSlide();
  } else if (currentSlideIndex === 0 && nextSlideIndex === 2) {
    nextSlide();
    nextSlide();
  } else if(currentSlideIndex === 1 && nextSlideIndex === 0){
    prevSlide();
  } else if(currentSlideIndex === 1 && nextSlideIndex === 2){
    nextSlide();
  } else if(currentSlideIndex === 2 && nextSlideIndex === 1){
    prevSlide();
  } else if(currentSlideIndex === 2 && nextSlideIndex === 0){
    prevSlide();
    prevSlide();
  }
  currentSlideIndex = nextSlideIndex;
}
