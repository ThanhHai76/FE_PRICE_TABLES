let slidersHeader = document.querySelectorAll(".slider-dark");
let sliderHeaderClass = slidersHeader[0].className;
let dotsHeader = document.querySelectorAll(".dot");

let prevSlide = document.querySelector(".prev");
let nextSlide = document.querySelector(".next");

const NAV_ARROW = {
  LEFT: "left",
  RIGHT: "right",
};

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
  let showInterval = "";
  // Show the first slide
  sliders[currentSlideIndex].style.left = 0;
  dots[currentSlideIndex].className += " active";

  // Get click event for Header slideshow ----------------------
  if (prevSlide && nextSlide) {
    prevSlide.addEventListener("click", function () {
      navFunc(NAV_ARROW.LEFT);
    });
    nextSlide.addEventListener("click", function () {
      navFunc(NAV_ARROW.RIGHT);
    });
  }

  let navFunc = (navArrow, interval = true) => {
    if (interval) runClearInterval();
    nextSlideIndex = getNextSlideIndex(navArrow, sliders, currentSlideIndex);
    showSlidesFunc(navArrow);
    if (interval) runSetInterval();
    currentSlideIndex = nextSlideIndex;
  };

  dots.forEach((element) => {
    element.addEventListener("click", function () {
      runClearInterval();
      let dotIndex = Number(element.getAttribute("name"));
      dotShowSlide(dotIndex);
      runSetInterval();
      currentSlideIndex = dotIndex;
    });
  });

  let dotShowSlide = (dotIndex) => {
    if (
      (currentSlideIndex === sliders.length - 1 && dotIndex === 0) ||
      currentSlideIndex < dotIndex
    ) {
      showSlidesFunc(NAV_ARROW.RIGHT, dotIndex);
    } else if (
      (currentSlideIndex === 0 && dotIndex === sliders.length - 1) ||
      currentSlideIndex > dotIndex
    ) {
      showSlidesFunc(NAV_ARROW.LEFT, dotIndex);
    }
  };

  let showSlidesFunc = (navArrow, nextIndex = nextSlideIndex) => {
    showSlides(
      navArrow,
      sliders,
      sliderClass,
      dots,
      currentSlideIndex,
      nextIndex
    );
  };

  let runSetInterval = () => {
    showInterval = setInterval(() => {
      navFunc(NAV_ARROW.RIGHT, false);
    }, autoPlay.delay);
  };

  if (autoPlay.autoplay) {
    runSetInterval();
  }

  let runClearInterval = () => {
    clearInterval(showInterval);
  };
}

function getNextSlideIndex(navArrow, sliders, currentSlideIndex) {
  let nextSlideIndex;
  if (navArrow === NAV_ARROW.LEFT) {
    if (currentSlideIndex === 0) {
      nextSlideIndex = sliders.length - 1;
    } else {
      nextSlideIndex = currentSlideIndex - 1;
    }
  } else if (navArrow === NAV_ARROW.RIGHT) {
    if (currentSlideIndex === sliders.length - 1) {
      nextSlideIndex = 0;
    } else {
      nextSlideIndex = currentSlideIndex + 1;
    }
  }
  return nextSlideIndex;
}

function showSlides(
  navArrow,
  sliders,
  sliderClass,
  dots,
  currentSlideIndex,
  nextSlideIndex
) {
  if (navArrow === NAV_ARROW.LEFT) {
    // Hide current slide, show slide "currentSlideIndex"
    sliders[nextSlideIndex].style.left = "-100%";
    sliders[currentSlideIndex].style.left = 0;
    // Add class to slide animation
    sliders[nextSlideIndex].setAttribute("class", `${sliderClass} slideInLeft`);
    sliders[currentSlideIndex].setAttribute(
      "class",
      `${sliderClass} slideOutRight`
    );
  } else if (navArrow === NAV_ARROW.RIGHT) {
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