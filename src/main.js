$(document).ready(function() {
	$("#pick-color").modal("show");
	
	b = new Board(15);
	let matrix = b.getMatrix();

	/* Drawing board */
	matrix.forEach(function(column, i) {
		$("#board").append(`<tr id="row-${i}"></tr>`);
		column.forEach(function(square, j) {
			$(`#row-${i}`).append(`<td id="square-${i}-${j}">0</td>`);
		});
	});

	/* Dealing with click event */
	$("td").click(function(event) {
		let position = String(event.target.id).split("-");

		let element = $(this);
		let lastPlayer = b.getLastColor();

		if(!element.hasClass("white") && !element.hasClass("black")) {
			console.log(`Player at ${position[1]},${position[2]}`);

			if(lastPlayer == null || lastPlayer == "black") {	// If "white"
				/* Drawing move and adding it to the board */
				$(element).addClass("white");
				b.setLastColor("white");
				b.play("white", position[1], position[2]);
			} else {	// If "black"
				/* Drawing move and adding it to the board */
				$(element).addClass("black");
				b.setLastColor("black");
				b.play("black", position[1], position[2]);
			}
			checkVictory(position[1], position[2]);
		}
		// b.printMatrix();
	});
});

function checkVictory(posX, posY) {
	let lastPlayer = b.getLastColor();

	if(b.checkVictory(posX, posY)) {
		$("#end-game-header").text("Fim de jogo!");
		$("#end-game").modal("show");
	};
}

function pickColor(color) {
	$("#pick-color").modal("hide");
	
	if(color == "black") {
		b.setPlayerColor("white");
		b.setLastColor("white");
	} else {
		b.setPlayerColor("black");
		b.setLastColor("black");
	}
}
