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
		if (!_res.ok) {
			throw new Error('Íå íàéäåíî');
		}
		const _dream = await _res.json();
		document.getElementById('title').textContent = _dream.title;
		document.getElementById('date').textContent = _dream.date;
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
