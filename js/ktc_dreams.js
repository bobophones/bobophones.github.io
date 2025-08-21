const _batch_size = 15;
let _dreams_i = [];
let _loaded_dreams = [];
let _loaded_count = 0;
let _loading = false;

let _dreams_list;

const _tag_text = {
	"abs": "Абсурдный",
	"sus": "Подозрительный",
	"prop": "Вещий"
};

async function init() {
	const _res = await fetch("dreams/index.json");
	_dreams_i = await _res.json();

	load_dreams();

	window.addEventListener("scroll", on_scroll);
}

window.addEventListener("DOMContentLoaded", () => {
	_dreams_list = document.getElementById("dreams");
	init();
});

function on_scroll() {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200)
		load_dreams();
}

async function load_dreams() {
	if (_loading) return;
	else _loading = true;
	if (_loaded_count >= _dreams_i.length) return;

	const _next_batch = _dreams_i.slice(_loaded_count, _loaded_count + _batch_size);
	let _to_load = _loaded_count + _next_batch.length;
	for (const i of _next_batch) {
		if (_loaded_dreams.indexOf(i) !== -1) continue;
		_loaded_dreams.push(i);
		const _res = await fetch(`dreams/${i}.json`);
		if (!_res.ok) continue;

		const _dream = await _res.json();
		const _card = document.createElement("a");
		_card.className = "dream_p";
		_card.href = `dream?id=${encodeURIComponent(i)}`;
		_card.innerHTML = `
			<div class="title"> ${_dream.title} </div>
			<div class="date"> ${_dream.date} </div>
			<div class="tags">
				${"tags" in _dream ? _dream.tags.map(_tag => `
					<div class="tag ${_tag}"> ${_tag_text[_tag] || _tag} </div>
				`).join("") : ""}
			</div>
		`;
		_dreams_list.appendChild(_card);
		_loaded_count += 1;
		if (_loaded_count >= _to_load)
			_loading = false;
	}
}