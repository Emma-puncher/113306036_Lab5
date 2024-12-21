var mathScore = document.getElementById("mathScore");
var engScore = document.getElementById("engScore");
var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", calculate);
mathScore.addEventListener("keypress", enter);
engScore.addEventListener("keypress", enter);
mathScore.addEventListener("keyup", clear);
engScore.addEventListener("keyup", clear);
mathScore.addEventListener("keypress", refreshByKey);
engScore.addEventListener("keypress", refreshByKey);
mathScore.addEventListener("keydown", next);
engScore.addEventListener("keydown", next);

let rowCounter = 1;

function enter(event) {
	if (event.key === "Enter") {
		calculate();
	}
}

function clear(event) {
	if (event.key === "c") {
		clearInputs();
	}
}

function refreshByKey(event) {
	if (event.key === "r") {
		refresh();
	}
}

function next(event) {
	switch (event.keyCode) {
		case 39:
			engScore.focus();
			break;
		case 37:
			mathScore.focus();
			break;
	}
}

function calculate() {

	let math = parseFloat(mathScore.value);
	let eng = parseFloat(engScore.value);

	if (isNaN(math) || isNaN(eng)) {
		alert("Please enter valid numbers!");
		clearInputs();
		return;
	} 

	const table = document.getElementById("table").getElementsByTagName("tbody")[0];
	const newRow = table.insertRow();

	const num = newRow.insertCell(0);
	const mathCell = newRow.insertCell(1);
	const engCell = newRow.insertCell(2);
	const rowAvg = newRow.insertCell(3);

	num.textContent = rowCounter++;
	mathCell.textContent = math;
	engCell.textContent = eng;
	const avg = ((math + eng) / 2).toFixed(2);
	rowAvg.textContent = avg;

	updateAvgs();

	clearInputs();
}

function updateAvgs() {
	const table = document.getElementById("table").getElementsByTagName("tbody")[0];
	const rows = table.rows;

	let mathTotal = 0;
	let engTotal = 0;
	let totalAvg = 0;
	let totalCount = rows.length;

	for (let i = 0; i < totalCount; i++) {
		const math = parseFloat(rows[i].cells[1].textContent);
		const eng = parseFloat(rows[i].cells[2].textContent);
		const rowAvg = parseFloat(rows[i].cells[3].textContent);

		mathTotal += math;
		engTotal += eng;
		totalAvg += rowAvg;
	}

	const mathAvg = (mathTotal / totalCount).toFixed(2);
	const engAvg = (engTotal / totalCount).toFixed(2);
	const allAvg = (totalAvg / totalCount).toFixed(2);

	document.getElementById("mathAvg").textContent = mathAvg;
	document.getElementById("engAvg").textContent = engAvg;
	document.getElementById("allAvg").textContent = allAvg;	
}

function clearInputs() {
    mathScore.value = "";
    engScore.value = "";
    mathScore.focus();
}
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearInputs);

const refreshBtn = document.getElementById("refreshBtn");
function refresh() {
	window.location.reload();
}
refreshBtn.addEventListener("click", refresh);