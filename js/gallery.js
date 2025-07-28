function open_gallery(img) {
	document.getElementById("gallery").classList.add("opened");
	document.getElementById("gallery_img").src = img.src;
};
function close_gallery() {
	document.getElementById("gallery").classList.remove("opened");
};