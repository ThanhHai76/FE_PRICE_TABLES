let slidersHeader = document.querySelectorAll(".slider-dark");
let sliderHeaderClass = slidersHeader[0].className;
let dotsHeader = document.querySelectorAll(".dot");

let slidersFooter = document.querySelectorAll(".slider-footer .flex-container");
let sliderFooterClass = slidersFooter[0].className;
let dotsFooter = document.querySelectorAll(".dot-footer");

let prevSlide = document.querySelector(".prev");
let nextSlide = document.querySelector(".next");

let stateAutoplay = true;
let showInterval = "";
let time = 4000;

//slideshow header
slideShowFunc(
  slidersHeader,
  sliderHeaderClass,
  dotsHeader,
  prevSlide,
  nextSlide
);
//slideshow footer
slideShowFunc(slidersFooter, sliderFooterClass, dotsFooter);

function slideShowFunc(sliders, sliderClass, dots, prevSlide, nextSlide) {
  let currentSlideIndex = 0;
  //Show the first slide
  sliders[currentSlideIndex].style.left = 0;
  dots[currentSlideIndex].className += " active";

  //Get click event for Header slideshow ----------------------
  if (stateAutoplay && prevSlide && nextSlide) {
    // runClearInterval();
    prevSlide.addEventListener("click", function () {
      showSlides(true, false, sliders, sliderClass, dots);
    });
    nextSlide.addEventListener("click", function () {
      showSlides(false, true, sliders, sliderClass, dots);
    });
    // runSetInterval();
  }
  function showSlides(arrowL, arrowR, sliders, sliderClass, dots) {
    let nextSlideIndex; // find slide
    if (arrowL) {
      //left arrow
      if (currentSlideIndex === 0) {
        // if slideIndex = 0 to last slide
        nextSlideIndex = sliders.length - 1;
      } else {
        // if no, decrease index 1
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
      //right arrow
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
    //Dots control
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", ""); // Hide the rest dots
    }
    dots[nextSlideIndex].className += " active"; // Show dot current, add class active

    dots.forEach((elem) => {
      elem.addEventListener("click", function () {
        if (stateAutoplay) {
          // runClearInterval();
          count = Number(elem.getAttribute("name"));
          dotShowSlides(count, sliders, sliderClass, dots);
          // runSetInterval();
        }
      });
    });
    // Update current slide index
    currentSlideIndex = nextSlideIndex;
  }

  //Show slide when click dot
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

  runSetInterval();
  function runSetInterval() {
    showInterval = setInterval(() => {
      showSlides(false, true, sliders, sliderClass, dots);
    }, time);
  }
  function runClearInterval() {
    clearInterval(showInterval);
  }
}
