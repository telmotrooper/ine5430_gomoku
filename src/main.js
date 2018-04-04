$(document).ready(function() {
	color = null;
	$("#pick-color").modal("show");
	
	b = new Board(15);
	let matrix = b.getMatrix();

	/* Drawing board from the matrix */
	matrix.forEach(function(column, i) {
		$("#board").append(`<tr id="row-${i}"></tr>`);
		column.forEach(function(square, j) {
			$(`#row-${i}`).append(`<td id="square-${i}-${j}">0</td>`);
		});
	});

	/* Dealing with click event */
	$("td").click(function(event) {
		let position = String(event.target.id).split("-");
		let x = position[1];
		let y = position[2];

		if(b.getValue(x,y) == 0) {
			play(x, y);
		}
	});
});

function checkVictory(x, y) {
	if(b.checkVictory(x, y)) {
		$("#end-game-header").text("Fim de jogo!");
		$("#end-game").modal("show");
	};
}

function pickColor(c) {
	color = c;
	$("#pick-color").modal("hide");
}

function switchColor() {
	switch (color) {
	case "black":
		color = "white";
		break;
	case "white":
		color = "black";
	}
}

function play(x, y) {
	b.play(color, x, y);
	$(`#square-${x}-${y}`).addClass(color);

	b.printMatrix();

	switchColor();
	checkVictory(x, y);
}
