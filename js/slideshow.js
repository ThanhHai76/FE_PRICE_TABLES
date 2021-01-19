let slidersHeader = document.querySelectorAll(".slider-dark");
let sliderHeaderClass = slidersHeader[0].className;
let dotsHeader = document.querySelectorAll(".dot");

let prevSlide = document.querySelector(".prev");
let nextSlide = document.querySelector(".next");

// let stateAutoplay = true;
let showInterval = "";
let time = 4000;

// Slideshow header
slideShowFunc(
  slidersHeader,
  sliderHeaderClass,
  dotsHeader,
  prevSlide,
  nextSlide,
  // false
);

function slideShowFunc(sliders, sliderClass, dots, prevSlide, nextSlide, autoPlay = true) {
  let currentSlideIndex = 0;
  // Show the first slide
  sliders[currentSlideIndex].style.left = 0;
  dots[currentSlideIndex].className += " active";

  // Get click event for Header slideshow ----------------------
  if (prevSlide && nextSlide) {
    prevSlide.addEventListener("click", function () {
      showSlides(true, false, sliders, sliderClass, dots);
    });
    nextSlide.addEventListener("click", function () {
      showSlides(false, true, sliders, sliderClass, dots);
    });
  }
  function showSlides(arrowL, arrowR, sliders, sliderClass, dots) {
    let nextSlideIndex; // Find slide
    if (arrowL) {
      // Left arrow
      if (currentSlideIndex === 0) {
        // If slideIndex = 0 to last slide
        nextSlideIndex = sliders.length - 1;
      } else {
        // If no, decrease index 1
        nextSlideIndex = currentSlideIndex - 1;
      }
      // Hide current slide, show slide "currentSlideIndex"
      sliders[nextSlideIndex].style.left = "-100%";
      sliders[currentSlideIndex].style.left = 0;
      // Add class to slide animation
      sliders[nextSlideIndex].setAttribute(
        "class",
        `${sliderClass} slideInLeft`
      );
      sliders[currentSlideIndex].setAttribute(
        "class",
        `${sliderClass} slideOutRight`
      );
    } else if (arrowR) {
      // Right arrow
      if (currentSlideIndex === sliders.length - 1) {
        nextSlideIndex = 0;
      } else {
        nextSlideIndex = currentSlideIndex + 1;
      }
      sliders[nextSlideIndex].style.left = "100%";
      sliders[currentSlideIndex].style.left = 0;
      sliders[nextSlideIndex].setAttribute(
        "class",
        `${sliderClass} slideInRight`
      );
      sliders[currentSlideIndex].setAttribute(
        "class",
        `${sliderClass} slideOutLeft`
      );
    }
    // Dots control
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", ""); // Hide the rest dots
    }
    dots[nextSlideIndex].className += " active"; // Show dot current, add class active
    // Update current slide index
    currentSlideIndex = nextSlideIndex;
  }

  dots.forEach((elem) => {
    elem.addEventListener("click", function () {
        runClearInterval();
        count = Number(elem.getAttribute("name"));
        dotShowSlides(count, sliders, sliderClass, dots);
        runSetInterval();
    });
  });

  // Show slide when click dot
  function dotShowSlides(nextSlideIndex, sliders, sliderClass, dots) {
    if (currentSlideIndex === sliders.length - 1 && nextSlideIndex === 0) {
      showSlides(false, true, sliders, sliderClass, dots);
    }
    if (currentSlideIndex === 0 && nextSlideIndex === sliders.length - 1) {
      showSlides(true, false, sliders, sliderClass, dots);
    }
    if (currentSlideIndex < nextSlideIndex) {
      for (let i = currentSlideIndex; i < nextSlideIndex; i++) {
        showSlides(false, true, sliders, sliderClass, dots);
      }
    } else {
      for (let i = currentSlideIndex; i > nextSlideIndex; i--) {
        showSlides(true, false, sliders, sliderClass, dots);
      }
    }
  }

  if(autoPlay){
    runSetInterval();
  } 
  function runSetInterval() {
    showInterval = setInterval(() => {
      showSlides(false, true, sliders, sliderClass, dots);
    }, time);
  }
  function runClearInterval() {
    clearInterval(showInterval);
  }
}
