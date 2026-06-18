let slideIndex = new Array(2);
slideIndex[0] = 0;
slideIndex[1] = 0;
const shown_slides = 4;

function changeSlide(n, id) {
	showSlides(slideIndex[id] + n, id);
}

function showSlides(n, id) {
	let slides = document.getElementsByClassName("slide " + id);

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	if (n >= slides.length - shown_slides) {
		slideIndex[id] = slides.length - shown_slides;
	} else if (n < 0) {
		slideIndex[id] = 0;
	} else {
		slideIndex[id] = n;
	}

	for (let i = slideIndex[id]; i < slideIndex[id] + shown_slides && i < slides.length; i++) {
		slides[i].style.display = "block";
	}
}

function open_basket() {
	document.getElementsByClassName("basket")[0].style.display = "flex";
}
function close_basket() {
	document.getElementsByClassName("basket")[0].style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
	showSlides(slideIndex[0], 0);
	showSlides(slideIndex[1], 1);
});