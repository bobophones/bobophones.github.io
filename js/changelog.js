function open_changelog() {
	document.getElementById("changelog").classList.add("opened");
};
function close_changelog() {
	document.getElementById("changelog").classList.remove("opened");
};

window.addEventListener("DOMContentLoaded", () => {
	document.getElementById("changelog_b").addEventListener("click", open_changelog)
	document.querySelector("#changelog .panel").addEventListener("click", event => {
		event._click_on_panel = true;
	});
	document.getElementById("changelog").addEventListener("click", event => {
		if (event._click_on_panel) return;
		close_changelog()
	});
});