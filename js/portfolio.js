const _batch_size = 15;
let _content = [];
let _loaded_content = [];
let _loaded_count = 0;
let _loading = false;
const _params = new URLSearchParams(window.location.search);
const _id = _params.get('id');

let _list;

const _tag_text = {
	"anim": "Анимация",
	"texture": "Текстура"
};

async function init() {
	const _res = await fetch(_id + "/index.json");
	_content = await _res.json();

	load_content();

	window.addEventListener("scroll", on_scroll);
}

window.addEventListener("DOMContentLoaded", () => {
	_dreams_list = document.getElementById("portfolio");
	init();
});

function on_scroll() {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200)
		load_content();
}

function open_gallery(img) {
	document.getElementById("gallery").classList.add("opened");
	document.getElementById("gallery_img").src = img;
};
function close_gallery() {
	document.getElementById("gallery").classList.remove("opened");
};

async function load_content() {
	if (_loading) return;
	else _loading = true;
	if (_loaded_count >= _content.length) return;

	const _next_batch = _content.slice(_loaded_count, _loaded_count + _batch_size);
	let _to_load = _loaded_count + _next_batch.length;
	for (const i of _next_batch) {
		if (_loaded_content.indexOf(i) !== -1) continue;
		_loaded_content.push(i);
		const _res = await fetch(_id + `/${i}.json`);
		if (!_res.ok) continue;

		const _p = await _res.json();
		const _card = document.createElement("div");
		_card.className = "portfolio_p";
		_card.innerHTML = `
			<div class="title"> ${_p.title} </div>
			<div class="tags">
				${"tags" in _p ? _p.tags.map(_tag => `
					<div class="tag ${_tag}"> ${_tag_text[_tag] || _tag} </div>
				`).join("") : ""}
			</div>
			<img src="${_p.src}" onclick="open_gallery(${_p.src})">
		`;
		_list.appendChild(_card);
		_loaded_count += 1;
		if (_loaded_count >= _to_load)
			_loading = false;
	}
}