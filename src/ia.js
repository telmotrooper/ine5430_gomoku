class IA {
	constructor(depth, color) {
		if(depth > 0) {
			this.depth = depth;
		} else {
			console.log("Error: Depth has to be greater than 0.");
		}

		this.computerColor = null;
		this.playerColor = null;

		if(color == "white") {
			this.playerColor = 2;	// White
			this.computerColor = 1;	// Black
		} else {
			this.playerColor = 1;	// Black
			this.computerColor = 2;	// White
		}
	}

	getBestMove(board) {
		let node = board.getMatrixCopy();
		let bestMove = this.minimax(node, this.depth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true);
		return bestMove;
	}

	getEmptySlots(matrix) {
		let emptySlots = [];

		for(let x = 0; x < matrix.length; x++) {
			for(let y = 0; y < matrix[x].length; y++) {
				if(matrix[x][y] == 0) {
					emptySlots.push([x,y]);
				}
			}
		}

		return emptySlots;
	}

	heuristic(matrix, color) {
		let heuristicValue = 0;

		for(let y = 0; y < matrix.length; y++) {
			for(let x = 0; x < matrix[y].length; x++) {
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
			}
		}

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

	getInverseColor(color) {
		switch (color) {
		case 1:
			return 2;
		case 2:
			return 1;
		}
	}

	copyMatrix(matrix) {
		return JSON.parse(JSON.stringify(matrix));
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

	minimax(node, depth, alpha, beta, maximizing)
	{
		console.log("minimax");
		let v = Number.MIN_SAFE_INTEGER;
		let children = this.getEmptySlots(node);
		let bestPlay = [];
		let bestValue = Number.MIN_SAFE_INTEGER;

		for(let i = 0; i < children.length; i++) {
			let myNode = this.copyMatrix(node);

			let x = children[i][0];
			let y = children[i][1];

			myNode[x][y] = this.computerColor;

			v = this.minimaxNext(myNode, depth - 1, alpha, beta, false);
			if(bestValue < v) {
				bestPlay = [];
				bestValue = v;
				bestPlay.push(x);
				bestPlay.push(y);
			}

			alpha = Math.max(alpha, v);

			if(beta <= alpha) {
				break;
			}
		}
		return bestPlay;
	}
	/* Based on pseudocode from: https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning#Pseudocode */
	minimaxNext(node, depth, alpha, beta, maximizing) {
		// console.log("Time to minimax!");
		
		if(depth == 0) {
			let computerHeuristic = this.heuristic(node, this.computerColor);
			let playerHeuristic = this.heuristic(node, this.playerColor);
			let totalHeuristic = computerHeuristic - playerHeuristic;

			return totalHeuristic;
		}

		if(maximizing) {
			let v = Number.MIN_SAFE_INTEGER;
			let children = this.getEmptySlots(node);

			for(let i = 0; i < children.length; i++) {
				let myNode = this.copyMatrix(node);

				let x = children[i][0];
				let y = children[i][1];

				myNode[x][y] = this.computerColor;

				v = Math.max(v, this.minimaxNext(myNode, depth - 1, alpha, beta, false));
				alpha = Math.max(alpha, v);

				if(beta <= alpha) {
					break;
				}
			}
			return v;

		} else {	// minimizing
			let v = Number.MAX_SAFE_INTEGER;
			let children = this.getEmptySlots(node);
			
			for(let i = 0; i < children.length; i++) {
				let myNode = this.copyMatrix(node);

				let x = children[i][0];
				let y = children[i][1];

				myNode[x][y] = this.playerColor;

				v = Math.min(v, this.minimaxNext(myNode, depth - 1, alpha, beta, true));
				beta = Math.min(beta, v);

				if(beta <= alpha) {
					break;
				}
			}
			return v;
		}
	}
}
