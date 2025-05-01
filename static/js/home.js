// window.addEventListener('scroll', revealOnScroll);

// function revealOnScroll() {
//   var revealDiv = document.getElementById('revealDiv');
//   var revealDivPosition = revealDiv.getBoundingClientRect().top;
//   var windowHeight = window.innerHeight;
//   var revealPoint = 100; // Adjust this value according to when you want the reveal to happen

//   if (revealDivPosition < windowHeight - revealPoint) {
//     revealDiv.classList.add('active');
//   } else {
//     revealDiv.classList.remove('active');
//   }
// }


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

showSlides(); // Initial call to start the slideshow
