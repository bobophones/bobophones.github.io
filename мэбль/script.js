let slideIndex = 0;
showSlides(slideIndex);
function changeSlide(n) {
	showSlides(slideIndex += n);
}
function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("carousel-slide");
	if (n - 4 > slides.length) {
		slideIndex = 0
	}
	if (n < 0) {
		slideIndex = slides.length - 4
	}
	for (i = slideIndex; i < slideIndex+4; i++) {
		console.log(i)
		slides[i].style.display = "block";
	}
}