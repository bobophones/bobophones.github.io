function open_gallery(_container) {
	document.getElementById("gallery").classList.add("opened");
	document.getElementById("gallery_img").src = get_img(_container);
};
function close_gallery() {
	document.getElementById("gallery").classList.remove("opened");
};

function get_img(_container) {
	if (!_container || !(_container instanceof HTMLElement))
		return null;
	return _container.querySelector('.img').src;
}