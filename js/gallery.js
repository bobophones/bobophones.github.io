function open_gallery(_img) {
	document.getElementById("gallery").classList.add("opened");
	document.getElementById("gallery_img").src = _img.src;
};
function close_gallery() {
	document.getElementById("gallery").classList.remove("opened");
};