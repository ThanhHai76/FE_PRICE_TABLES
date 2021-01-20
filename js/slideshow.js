let slidersHeader = document.querySelectorAll(".slider-dark");
let sliderHeaderClass = slidersHeader[0].className;
let dotsHeader = document.querySelectorAll(".dot");

let prevSlide = document.querySelector(".prev");
let nextSlide = document.querySelector(".next");

// Slideshow header
slideShowFunc(
  slidersHeader,
  sliderHeaderClass,
  dotsHeader,
  prevSlide,
  nextSlide
);

function slideShowFunc(
  sliders,
  sliderClass,
  dots,
  prevSlide,
  nextSlide,
  autoPlay = { delay: 4000, autoplay: true }
) {
  let currentSlideIndex = 0;
  let nextSlideIndex;
  // Show the first slide
  sliders[currentSlideIndex].style.left = 0;
  dots[currentSlideIndex].className += " active";

  // Get click event for Header slideshow ----------------------
  if (prevSlide && nextSlide) {
    prevSlide.addEventListener("click", function () {
      nextSlideIndex = getNextSlideIndex(
        true,
        false,
        sliders,
        currentSlideIndex
      );
      showSlides(
        true,
        false,
        sliders,
        sliderClass,
        dots,
        currentSlideIndex,
        nextSlideIndex
      );
      currentSlideIndex = nextSlideIndex;
    });
    nextSlide.addEventListener("click", function () {
      nextSlideIndex = getNextSlideIndex(
        false,
        true,
        sliders,
        currentSlideIndex
      );
      showSlides(
        false,
        true,
        sliders,
        sliderClass,
        dots,
        currentSlideIndex,
        nextSlideIndex
      );
      currentSlideIndex = nextSlideIndex;
    });
  }

  dots.forEach((elem) => {
    elem.addEventListener("click", function () {
      dotIndex = Number(elem.getAttribute("name"));
      if (currentSlideIndex === sliders.length - 1 && dotIndex === 0) {
        showSlides(
          false,
          true,
          sliders,
          sliderClass,
          dots,
          currentSlideIndex,
          dotIndex
        );
      } else if (currentSlideIndex === 0 && dotIndex === sliders.length - 1) {
        showSlides(
          true,
          false,
          sliders,
          sliderClass,
          dots,
          currentSlideIndex,
          dotIndex
        );
      } else if (currentSlideIndex < dotIndex) {
        showSlides(
          false,
          true,
          sliders,
          sliderClass,
          dots,
          currentSlideIndex,
          dotIndex
        );
      } else {
        showSlides(
          true,
          false,
          sliders,
          sliderClass,
          dots,
          currentSlideIndex,
          dotIndex
        );
      }
      currentSlideIndex = dotIndex;
    });
  });

  if (autoPlay.autoplay) {
    setInterval(() => {
      nextSlideIndex = getNextSlideIndex(
        false,
        true,
        sliders,
        currentSlideIndex
      );
      showSlides(
        false,
        true,
        sliders,
        sliderClass,
        dots,
        currentSlideIndex,
        nextSlideIndex
      );
      currentSlideIndex = nextSlideIndex;
    }, autoPlay.delay);
  }
}

function getNextSlideIndex(arrowL, arrowR, sliders, currentSlideIndex) {
  let nextSlideIndex;
  if (arrowL) {
    if (currentSlideIndex === 0) {
      nextSlideIndex = sliders.length - 1;
    } else {
      nextSlideIndex = currentSlideIndex - 1;
    }
  } else if (arrowR) {
    if (currentSlideIndex === sliders.length - 1) {
      nextSlideIndex = 0;
    } else {
      nextSlideIndex = currentSlideIndex + 1;
    }
  }
  return nextSlideIndex;
}

function showSlides(
  arrowL,
  arrowR,
  sliders,
  sliderClass,
  dots,
  currentSlideIndex,
  nextSlideIndex
) {
  if (arrowL) {
    // Hide current slide, show slide "currentSlideIndex"
    sliders[nextSlideIndex].style.left = "-100%";
    sliders[currentSlideIndex].style.left = 0;
    // Add class to slide animation
    sliders[nextSlideIndex].setAttribute("class", `${sliderClass} slideInLeft`);
    sliders[currentSlideIndex].setAttribute(
      "class",
      `${sliderClass} slideOutRight`
    );
  } else if (arrowR) {
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

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // Hide the rest dots
  }
  dots[nextSlideIndex].className += " active"; // Show dot current, add class active
}