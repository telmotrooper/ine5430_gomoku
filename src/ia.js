class IA {
	constructor(depth) {
		this.depth = depth;
	}

	getBestMove(board) {
		return this.minimax( board);
	}

	heuristic(matrix, lastMove, moveAttempt, color) {
		let heuristicValue = 0;
		let x = null;
		let y = null;


		if(moveAttempt != null) {	// If trying to calculate a move attempt
			/* Play the piece in the matrix copy */
			matrix[moveAttempt[0]][moveAttempt[1]] = color;

			x = parseInt(moveAttempt[0]);
			y = parseInt(moveAttempt[1]);
		} else {	// If calculating the board without a new move
			x = parseInt(lastMove[0]);
			y = parseInt(lastMove[1]);
		}

		let horizontal = [];
		for(let i = y - 5; i <= y + 5; i++) {
			if(i >= 0 && i <= 14) {
				horizontal.push(matrix[x][i]);
			}
		}
		heuristicValue += this.countSequence(color, horizontal);

		let vertical = [];
		for(let i = x - 5; i <= x + 5; i++) {
			if(i >= 0 && i <= 14) {
				vertical.push(matrix[i][y]);
			}
		}
		heuristicValue += this.countSequence(color, vertical);

		let diagonalA = [];
		for(let i = x - 5, j = y - 5; i <= x + 5; i++) {
			if(i >= 0 && i <= 14 && j >= 0 && j <= 14) {
				diagonalA.push(matrix[i][j]);
			}
			j += 1;
		}
		heuristicValue += this.countSequence(color, diagonalA);

		let diagonalB = [];
		for(let i = x + 5, j = y - 5; i >= x - 5; i--) {
			if(i >= 0 && i <= 14 && j >= 0 && j <= 14) {
				diagonalB.push(matrix[i][j]);
			}
			j += 1;
		}
		heuristicValue += this.countSequence(color, diagonalB);

		// if(moveAttempt != null) {
		// 	console.log(`Attempt at ${x},${y} has value ${heuristicValue}`);
		// }
		return heuristicValue;
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

	countSequence(color, array) {	// Used inside checkVictory()
		let sequences = [];
		let lineValue = 0;
		let counter = 0;

		for(let i = 0; i < array.length; i++) {
			if(array[i] == color) {
				counter += 1;
			} else {
				if(counter > 0) {
					if(counter == 5) {
						sequences.push(300 * 150 * 75 * 50);
					} else if(counter == 4) {
						sequences.push(300 * 150 * 75);
					} else if(counter == 3) {
						sequences.push(300 * 150);
					} else if(counter == 2) {
						sequences.push(300);
					} else {
						sequences.push(counter);
					}
				}
				counter = 0;
			}
		}

		if(sequences.length > 0) {
			lineValue = sequences.reduce((a, b) => {return a + b;});

			/* Decrementing the sequence value for every
			   break between sequences including being blocked */
			for(let i = 0; i < sequences.length - 1; i++) {
				lineValue *= 0.75;
			}
		}

		return lineValue;
	}

	minimax(board) {	// Recursive through the usage of getMini() and getMax()

		let matrix = board.getMatrixCopy();
		let lastMove = board.getLastMove();
		let computerColor = this.getComputerColor(lastMove);

		let alpha = Number.MIN_SAFE_INTEGER;
		let beta = Number.MAX_SAFE_INTEGER;
		let bestValue = Number.MIN_SAFE_INTEGER;
		
		let bestPlay = [];

		let possiblePlays = this.getPossiblePlays(matrix);

		for(let i = 0; i < possiblePlays.length; i++) {
			let play = possiblePlays[i];
			matrix[play[0]][play[1]] = 2; // 1 -- cor da IA
			let value = this.getMax(matrix, alpha, beta, 0, lastMove, play);
			matrix[play[0]][play[1]] = 0;

			if( bestValue < value ){
				bestValue = value;
				bestPlay = play;
			}
			
			if(alpha < value) {
				alpha = value;
			}
		}
		console.log("bestPlay");
		console.log(bestPlay);

		return bestPlay;
	}

	getMini(matrix, alpha, beta, depth, lastMove, moveAttempt) {
		// if(node.isFinal())
		// 	return this.utility(node, depth);

		if(depth == 2)
			return this.heuristic(node, depth, lastMove, moveAttempt, 1);// 1 -- cor da Jogador

		let possiblePlays = this.getPossiblePlays(matrix);

		let miniVal = Number.MAX_SAFE_INTEGER;;

		for(let i = 0; i < possiblePlays.length; i++) {
			let play = possiblePlays[i];
			matrix[play[0]][play[1]] = 2;// 1 -- cor da IA
			let value = this.getMax(matrix, alpha, beta, depth + 1, lastMove, play);
			matrix[play[0]][play[1]] = 0;

			if(alpha < miniVal)
				alpha = miniVal;
			if(value < miniVal)
				miniVal = value;
			if(alpha < beta)
				break;
		}
		return miniVal;
	}

	getMax(matrix, alpha, beta, depth, lastMove, moveAttempt) {
		// if(node.isFinal())
		// 	return this.utility(node, depth);

		if(depth == 2)
			return this.heuristic(matrix, lastMove, moveAttempt, 2);// 1 -- cor da IA

		let maxVal = Number.MIN_SAFE_INTEGER;

		let possiblePlays = this.getPossiblePlays(matrix);
		
		for(let i = 0; i < possiblePlays.length; i++) {
			let play = possiblePlays[i];
			matrix[play[0]][play[1]] = 1;// 1 -- cor da Jogador
			let value = this.getMini(matrix, alpha, beta, depth + 1, lastMove, play);
			matrix[play[0]][play[1]] = 0;

			if(beta > value)
				beta = value;
			if(value > maxVal)
				maxVal = value;
			if(alpha < beta) {
				break;
			}
		}

		return maxVal;
	}

	getPossiblePlays( matrix )
	{
		let emptySlots = [];
		for(let x = 0; x < matrix.length; x++) {
			for(let y = 0; y < matrix[x].length; y++) {
				if(matrix[x][y] == 1) {	
					if( x + 1 < matrix.length && matrix[x+1][y] == 0 ){
						emptySlots.push([x + 1,y]);
					}
					if( x - 1 > 0 && matrix[x+1][y] == 0 ){
						emptySlots.push([x - 1,y]);
					}
					if( y + 1 < matrix[x].length && matrix[x][y - 1] == 0 ){
						emptySlots.push([x ,y + 1]);
					}
					if( x - 1 > 0 && matrix[x+1][y] == 0 ){
						emptySlots.push([x,y - 1]);
					}
				}
			}
		}
		return emptySlots;
	}

}
