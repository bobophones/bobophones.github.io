function addRow() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var city = document.getElementById('city').value;

    var table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.textContent = name;
    cell2.textContent = age;
    cell3.textContent = city;
    cell4.innerHTML = `
        <td>
            <button onclick="editRow(this)">Редактировать</button>
			<button onclick="deleteRow(this)">Удалить</button>
        </td>
    `

    // Очищаем поля формы

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('city').value = '';
}

function editRow(button) {
    var row = button.parentElement.parentElement;
    var cells = row.getElementsByTagName('td');

    // Преобразуем ячейки в поля ввода

    for (var i = 0; i < cells.length - 1; i++) {
        var input = document.createElement('input');
        input.value = cells[i].textContent;
        if (i == 1) input.type = "number"
        cells[i].innerHTML = '';
        cells[i].appendChild(input);
    }

    // Заменяем кнопку на кнопку сохранения

    button.textContent = 'Сохранить';
    button.setAttribute('onclick', 'saveRow(this)');
}

function saveRow(button) {
    var row = button.parentElement.parentElement;
    var cells = row.getElementsByTagName('td');

    // Сохраняем изменения

    for (var i = 0; i < cells.length - 1; i++) {
        var input = cells[i].getElementsByTagName('input')[0];
        cells[i].textContent = input.value;
    }

    // Заменяем кнопку на кнопку редактирования

    button.textContent = 'Редактировать';
    button.setAttribute('onclick', 'editRow(this)');
}

function deleteRow(button) {
    var row = button.parentElement.parentElement;
    row.parentNode.removeChild(row);
} 