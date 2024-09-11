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

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://helios.cs.ifmo.ru:24738/httpd-root/fcgi-bin/server.jar", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var jsonResponse = JSON.parse(xhr.responseText);


            var resultBody = document.getElementById("resultBody");
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${jsonResponse.x}</td>
                <td>${jsonResponse.y}</td>
                <td>${jsonResponse.r}</td>
                <td>${jsonResponse.result}</td>
                <td>${jsonResponse.currentTime}</td>
                <td>${jsonResponse.executionTime}</td>
            `;
            resultBody.appendChild(newRow);

            drawGraph();
            drawPoints(x, [y], r);
        } else if (xhr.readyState == 4) {
            console.error("Error:", xhr.statusText);
        }
    };


    xhr.send("x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r));
}

document.getElementById("info-block").addEventListener("submit", function(event) {
    event.preventDefault();
    validatePoint();
});


document.querySelectorAll("input[name='x']").forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        document.querySelectorAll("input[name='x']").forEach(cb => {
            if (cb !== this) cb.checked = false;
        });
    });
});


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


