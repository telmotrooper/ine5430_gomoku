class IA {
	constructor(depth) {
		this.depth = depth;
	}

	getBestMove(board) {
		let matrix = board.getMatrixCopy();
		let lastMove = board.getLastMove();

		if(lastMove != null) {
			console.log("Player played at " + lastMove);
		}

		let emptySlots = [];

		/* Finding all empty slots */
		for(let x = 0; x < matrix.length; x++) {
			for(let y = 0; y < matrix[x].length; y++) {
				if(matrix[x][y] == 0) {
					emptySlots.push([x,y]);
				}
			}
		}

		this.heuristic(matrix, lastMove, board);

		// console.log(emptySlots);
		let bestMove = emptySlots[Math.floor(Math.random() * emptySlots.length)];

		console.log(`Computer played at ${bestMove[0]},${bestMove[1]}`);	

		return bestMove;
	}

	heuristic(matrix, lastMove) {
		if(lastMove != null) {
			/* This is the color of the IA pieces */ 
			// console.log(matrix[lastMove[0]][lastMove[1]]);
		}
		
	}
}
