const _tag_text = {
	"abs": "Абсурдный",
	"sus": "Подозрительный",
	"prop": "Вещий"
};

window.addEventListener('DOMContentLoaded', loadDream);

async function loadDream() {
	const _params = new URLSearchParams(window.location.search);
	const _id = _params.get('id');
	if (!_id) {
		showNotFound();
		return;
	}

	try {
		const _res = await fetch(`../dreams/${decodeURIComponent(_id)}.json`);
		if (!_res.ok) throw new Error('Не найдено');

		const _dream = await _res.json();
		document.getElementById('title').textContent = _dream.title;
		document.getElementById('date').textContent = _dream.date;
		if ("tags" in _dream) {
			document.getElementById('tags').innerHTML = _dream.tags.map(_tag => `
				<div class="tag ${_tag}"> ${_tag_text[_tag] || _tag} </div>
			`).join("")
		}
		document.getElementById('text').innerHTML = _dream.text;
		document.title = _dream.title;
		document.getElementById('dream').classList.remove("hidden");
	} catch (e) {
		showNotFound();
	}
};

function showNotFound() {
	document.getElementById('not_found').classList.remove("hidden");
};