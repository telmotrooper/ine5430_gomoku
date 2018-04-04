class IA {
	constructor(depth) {
		this.depth = depth;
	}

	getBestMove(board) {
		let matrix = board.getMatrix();
		// console.log("Matrix as seen by the IA:");
		// console.log(matrix);

		let emptySlots = [];

		/* Finding all empty slots */
		for(let x = 0; x < matrix.length; x++) {
			for(let y = 0; y < matrix[x].length; y++) {
				if(matrix[x][y] == 0) {
					emptySlots.push([x,y]);
				}
			}
		}

		// console.log(emptySlots);
		return emptySlots[Math.floor(Math.random() * emptySlots.length)];
	}
}
