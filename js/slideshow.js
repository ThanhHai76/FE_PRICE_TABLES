const slidersHeader = document.querySelectorAll(".slider-dark")
const sliderHeaderClass = slidersHeader[0].className
const dotsHeader = document.querySelectorAll(".dot")

const slidersFooter = document.querySelectorAll(".slider-footer .flex-container")
const sliderFooterClass = slidersFooter[0].className
const dotsFooter = document.querySelectorAll(".dot-footer")

const prevSlide = document.querySelector(".prev")
const nextSlide = document.querySelector(".next")

const NAV_ARROW = {
  LEFT: "left",
  RIGHT: "right",
}

// Slideshow header
runSlideShow(
  slidersHeader,
  sliderHeaderClass,
  dotsHeader,
  prevSlide,
  nextSlide
)

// Slideshow footer
runSlideShow(slidersFooter, sliderFooterClass, dotsFooter)

function runSlideShow(
  sliders,
  sliderClass,
  dots,
  prevSlide,
  nextSlide,
  autoPlay = { delay: 4000, autoplay: true }
) {
  let currentSlideIndex = 0
  let nextSlideIndex
  let showInterval = null
  // Show the first slide
  sliders[currentSlideIndex].style.left = 0
  dots[currentSlideIndex].classList.add("active")

  // Get click event for Header slideshow ----------------------
  if (prevSlide && nextSlide) {
    prevSlide.addEventListener("click", function () {
      navigateSlide(NAV_ARROW.LEFT)
    })
    nextSlide.addEventListener("click", function () {
      navigateSlide(NAV_ARROW.RIGHT)
    })
  }

  const navigateSlide = (navArrow, interval = true) => {
    if (interval) runClearInterval()
    nextSlideIndex = getNextSlideIndex(navArrow, sliders, currentSlideIndex)
    controlShowSlides(navArrow)
    if (interval) runSetInterval()
    currentSlideIndex = nextSlideIndex
  }

  dots.forEach((element) => {
    element.addEventListener("click", function () {
      runClearInterval()
      const dotIndex = Number(element.getAttribute("name"))
      clickDotShowSlide(dotIndex)
      runSetInterval()
      currentSlideIndex = dotIndex
    })
  })

  const clickDotShowSlide = (dotIndex) => {
    if (
      (currentSlideIndex === sliders.length - 1 && dotIndex === 0) ||
      currentSlideIndex < dotIndex
    ) {
      controlShowSlides(NAV_ARROW.RIGHT, dotIndex)
    } else if (
      (currentSlideIndex === 0 && dotIndex === sliders.length - 1) ||
      currentSlideIndex > dotIndex
    ) {
      controlShowSlides(NAV_ARROW.LEFT, dotIndex)
    }
  }

  const controlShowSlides = (navArrow, nextIndex = nextSlideIndex) => {
    showSlides(
      navArrow,
      sliders,
      sliderClass,
      dots,
      currentSlideIndex,
      nextIndex
    )
  }

  const runSetInterval = () => {
    showInterval = setInterval(() => {
      navigateSlide(NAV_ARROW.RIGHT, false)
    }, autoPlay.delay)
  }

  if (autoPlay.autoplay) {
    runSetInterval()
  }

  const runClearInterval = () => {
    clearInterval(showInterval)
  }
}

function getNextSlideIndex(navArrow, sliders, currentSlideIndex) {
  let nextSlideIndex
  if (navArrow === NAV_ARROW.LEFT) {
    if (currentSlideIndex === 0) {
      nextSlideIndex = sliders.length - 1
    } else {
      nextSlideIndex = currentSlideIndex - 1
    }
  } else if (navArrow === NAV_ARROW.RIGHT) {
    if (currentSlideIndex === sliders.length - 1) {
      nextSlideIndex = 0
    } else {
      nextSlideIndex = currentSlideIndex + 1
    }
  }
  return nextSlideIndex
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
    sliders[nextSlideIndex].style.left = "-100%"
    sliders[currentSlideIndex].style.left = 0
    // Add class to slide animation
    sliders[nextSlideIndex].setAttribute("class", `${sliderClass} slideInLeft`)
    sliders[currentSlideIndex].setAttribute(
      "class",
      `${sliderClass} slideOutRight`
    )
  } else if (navArrow === NAV_ARROW.RIGHT) {
    sliders[nextSlideIndex].style.left = "100%"
    sliders[currentSlideIndex].style.left = 0
    sliders[nextSlideIndex].setAttribute(
      "class",
      `${sliderClass} slideInRight`
    )
    sliders[currentSlideIndex].setAttribute(
      "class",
      `${sliderClass} slideOutLeft`
    )
  }

  for (let i = 0 ; i < dots.length ; i++) {
    dots[i].classList.remove("active") // Hide the rest dots
  }
  dots[nextSlideIndex].classList.add("active") // Show dot current, add class active
}