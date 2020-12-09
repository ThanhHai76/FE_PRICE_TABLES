function myFunction() {
  let x = document.getElementsByClassName("top-nav")[0];
  if (x.className === "top-nav") {
    x.className += " responsive";
  } else {
    x.className = "top-nav";
  }
}
