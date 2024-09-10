function validatePoint() {
    let xElement = document.querySelector('input[name="x"]:checked');
    let y = parseFloat(document.getElementById("y").value);
    let r = parseFloat(document.getElementById("r").value);
    let message = document.getElementById("message");


    if (!xElement) {
        message.textContent = "Пожалуйста, выберите координату X.";
        return;
    }

    let x = xElement.value;

    console.log("Приняты данные:", x, y, r);

    if (isNaN(x) || isNaN(y) ||  isNaN(r)) {
        message.textContent = "Пожалуйста, введите корректные значения!";
        return;
    }

    if (r < 1 || r > 4 || y < -5 || y > 5) {
        message.textContent = "Координаты Y должны быть в пределах [-5, 5], а R в пределах [1, 4].";
        return;
    }

    let inRectangle = (x >= -r && x <= 0 && y >= -r / 2 && y <= 0);

    let inTriangle = (x >= 0 && y >= 0 && y <= (-x + r));

    let inSector = (x >= 0 && y <= 0 && (x * x + y * y <= (r / 2) ** 2));

    if (inRectangle || inTriangle || inSector) {
        message.textContent = "Точка попадает в область графика.";
        console.log("Отображение сообщения:", message.textContent);
    } else {
        message.textContent = "Точка не попадает в область графика.";
        console.log("Отображение сообщения:", message.textContent);
    }

    addResultToTable(x, y, r, inRectangle || inTriangle || inSector);
}

function addResultToTable(x, y, r, isHit) {
    const table = document.getElementById("table");
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = x;
    newRow.insertCell(1).textContent = y;
    newRow.insertCell(2).textContent = r;
    newRow.insertCell(3).textContent = isHit ? "Попала" : "Не попала";
    newRow.insertCell(4).textContent = new Date().toLocaleTimeString();
    newRow.insertCell(5).textContent = performance.now().toFixed(2) + " ms";
}

function resetForm() {
    document.getElementById("message").textContent = "";
    document.getElementById("table").innerHTML = `
        <tr>
            <th>Координата X</th>
            <th>Координата Y</th>
            <th>Радиус R</th>
            <th>Факт попадания в область</th>
            <th>Текущее время</th>
            <th>Время выполнения скрипта (ms)</th>
        </tr>`;
}


