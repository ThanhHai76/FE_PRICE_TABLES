function myFunction() {
  let x = document.getElementById("top-nav-header");
  if (x.className === "top-nav") {
    x.className += " responsive";
  } else {
    x.className = "top-nav";
  }
}
