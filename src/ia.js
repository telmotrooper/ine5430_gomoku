class IA {
	constructor(depth) {
		this.depth = depth;
	}

	getBestMove(board) {
		let ownMatrix = board.getMatrixCopy();
		let lastMove = board.getLastMove();
		let computerColor = this.getComputerColor(lastMove);

		console.log(computerColor);

		if(lastMove != null) {
			console.log(`Player played at ${lastMove[0]},${lastMove[1]}`);
		}

		let emptySlots = [];

		/* Finding all empty slots */
		for(let x = 0; x < ownMatrix.length; x++) {
			for(let y = 0; y < ownMatrix[x].length; y++) {
				if(ownMatrix[x][y] == 0) {
					emptySlots.push([x,y]);
				}
			}
		}

		/* Calculate the heuristic for each empty slot in the board */
		for(let i = 0; i < emptySlots.length; i++) {
			let ownMatrix = board.getMatrixCopy();
			this.heuristic(ownMatrix, lastMove, emptySlots[i], computerColor);
		}

		let bestMove = emptySlots[Math.floor(Math.random() * emptySlots.length)];
		console.log(`Computer played at ${bestMove[0]},${bestMove[1]}`);	
		return bestMove;
	}

	heuristic(matrix, lastMove, moveAttempt, color) {
		/* Play the piece in the matrix copy */
		matrix[moveAttempt[0]][moveAttempt[1]] = color;
		
		// TODO
	}

	getComputerColor(lastMove) {	// Finds out the color of the pieces controlled by the computer
		let color = null;

		if(lastMove == null) {
			color = 1;	// The first to play is always black (value: 1)
		} else {
			switch (lastMove[2]) {	// color of the last move
			case 0:	// blank
				console.log("THIS SHOULD NEVER HAPPEN!");
				break;
			case 1:	// player is black, computer is white
				color = 2;
				break;
			case 2:	// player is white, computer is black
				color = 1;
			}
		}

		return color;
	}
}
