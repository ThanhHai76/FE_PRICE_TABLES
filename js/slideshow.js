document.addEventListener( //Su kien DOMContentLoaded được chạy sau khi ket thuc phan tich cau truc cua HTML
  "DOMContentLoaded", // khong can cho cho stylesheets, images va subframes load xong
  function () {

    let sliders = document.querySelectorAll(".slider-dark");
    let prevSlide = document.querySelector(".prev");
    let nextSlide = document.querySelector(".next");
    let dots = document.querySelectorAll(".dot");
    let currentSlideIndex = 0;
    sliders[currentSlideIndex].style.left = 0;
    dots[currentSlideIndex].className += " active";

    let stateAutoplay = true;
    let show_interval = "";
    let time = 4000;
    let stateTab = true;
    let hidden, visibilityChange;
    //Khi chuyen sang tab khac thi khong autoplay nua
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange"; // Duoc kich hoat khi noi dung tab duoc hien thi hoac an di
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange"; //
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange"; //
    }
    // Ham xu ly su kien visibilityChange cho document
    function handleVisibilityChange() {
      stateTab = document[hidden] ? false : true;
      if (stateTab) {
        run_setInterval();
      } else {
        run_clearInterval();
      }
    }
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    prevSlide.addEventListener("click", function () {
      if (stateAutoplay) {
        run_clearInterval();
        showSlides(true, false);
        run_setInterval();
      }
    });
    nextSlide.addEventListener("click", function () {
      if (stateAutoplay) {
        run_clearInterval();
        showSlides(false, true);
        run_setInterval();
      }
    });

    function showSlides(arrowL, arrowR) {
      let nextSlideIndex; // Tim slide truoc do
      if (arrowL) {
        if (currentSlideIndex === 0) {
          // Neu slideIndex = 0 thi ve slide cuoi
          nextSlideIndex = sliders.length - 1;
        } else {
          // Neu khong thi giam index di 1
          nextSlideIndex = currentSlideIndex - 1;
        }
        // An slide hien tai, hien slide "currentSlideIndex"
        sliders[nextSlideIndex].style.left = "-100%";
        sliders[currentSlideIndex].style.left = 0;
        // Them class de chuyen slide co animation
        sliders[nextSlideIndex].setAttribute(
          "class",
          "slider-dark slideInLeft"
        );
        sliders[currentSlideIndex].setAttribute(
          "class",
          "slider-dark slideOutRight"
        );
      } else if (arrowR) {
        if (currentSlideIndex === sliders.length - 1) {
          nextSlideIndex = 0;
        } else {
          nextSlideIndex = currentSlideIndex + 1;
        }
        sliders[nextSlideIndex].style.left = "100%";
        sliders[currentSlideIndex].style.left = 0;
        sliders[nextSlideIndex].setAttribute(
          "class",
          "slider-dark slideInRight"
        );
        sliders[currentSlideIndex].setAttribute(
          "class",
          "slider-dark slideOutLeft"
        );
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // An cac dot con lai
      }
      dots[nextSlideIndex].className += " active"; // Show dot current, them class active
      // Cap nhat gia tri slide hien tai
      currentSlideIndex = nextSlideIndex;
    }

    dots.forEach((elem) => {
      elem.addEventListener("click", function () {
        if (stateAutoplay) {
          run_clearInterval();
          count = Number(elem.getAttribute("name"));
          dot_showSlides(count);
          run_setInterval();
        }
      });
    });

    //Show slide khi nhan vao dot
    function dot_showSlides(nextSlideIndex) {
      if (currentSlideIndex == sliders.length && nextSlideIndex == 0) {
        showSlides(false, true);
      }
      if (currentSlideIndex == 0 && nextSlideIndex == sliders.length) {
        showSlides(true, false);
      }
      if (currentSlideIndex < nextSlideIndex) {
        for (let i = currentSlideIndex; i < nextSlideIndex; i++) {
          showSlides(false, true);
        }
      } else {
        for (let i = currentSlideIndex; i > nextSlideIndex; i--) {
          showSlides(true, false);
        }
      }
    }

    run_setInterval();
    function run_setInterval() {
      show_interval = setInterval(() => {
        showSlides(false, true);
      }, time);
    }
    function run_clearInterval() {
      clearInterval(show_interval);
    }
  },
  false
);