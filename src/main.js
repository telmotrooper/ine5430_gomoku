$(document).ready(function() {
	color = null;
	playerColor = null;

	$("#pick-color").modal("show");
	
	b = new Board(15);
	ia = new IA(2);
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

		if(b.getColor(x,y) == "blank") {
			play(x, y);
		}
	});
});

function checkVictory(x, y) {
	if(b.checkVictory(x, y)) {
		if(b.getColor(x,y) == playerColor) {
			$("#end-game-header").text("Você venceu!");
		} else {
			$("#end-game-header").text("Você perdeu!");
		}
		$("#end-game").modal("show");
	};
}

function pickColor(c) {
	color = c;
	playerColor = c;
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
	/* PLAYER TURN */
	b.play(color, x, y);
	$(`#square-${x}-${y}`).addClass(color);

	b.printMatrix();
	switchColor();
	checkVictory(x, y);

	/* COMPUTER TURN */
	let iaMove = ia.getBestMove(b);
	b.play(color, iaMove[0], iaMove[1]);
	$(`#square-${iaMove[0]}-${iaMove[1]}`).addClass(color);

	b.printMatrix();
	switchColor();
	checkVictory(iaMove[0], iaMove[1]);
}
