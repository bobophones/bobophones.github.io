const _dreams_list = document.getElementsByClassName('dreams');
let _loaded_count = 0;
const _batch_size = 5;
let _dreams_i = [];

window.addEventListener('DOMContentLoaded', init);

async function init() {
	const _res = await fetch('dreams/index.json');
	_dreams_i = await _res.json();

	loadMoreDreams();

	window.addEventListener('scroll', onScroll);
}

function onScroll() {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
		loadMoreDreams();
	}
}

async function loadMoreDreams() {
	if (_loaded_count >= _dreams_i.length) return;

	const _next_batch = _dreams_i.slice(_loaded_count, _loaded_count + _batch_size);
	for (const i of _next_batch) {
		const _res = await fetch(`dreams/${i}.json`);
		if (!_res.ok) continue;

		const _dream = await _res.json();
		const _card = document.createElement('div');
		_card.innerHTML = `
			<a class="dream_p" href="dream?id=${encodeURIComponent(i)}">
				<div class="title"> ${_dream.title} </div>
				<div class="date"> ${_dream.date} </div>
			</a>
		`;
		_dreams_list.appendChild(card);
	}
	_loaded_count += _next_batch.length;
}