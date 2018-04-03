class Board {
	constructor(size) {
		this.matrix = [];
		this.lastPlayer = null;

		for(let i = 0; i < size; i++) {
			this.matrix[i] = new Array(size);
			this.matrix[i].fill(0);
		}
	}

	printMatrix() {
		// console.clear();
		
		this.matrix.forEach(function(row) {
			let line = "";

			row.forEach(function(element) {
				line += element + " ";
			});

			console.log(line);
		});
	}

	getMatrix() {
		return this.matrix;
	}

	getLastColor() {
		return this.lastPlayer;
	}

	setLastColor(color) {
		this.lastPlayer = color;
	}

	switchLastColor() {
		switch (this.lastPlayer) {
		case "white":
			this.lastPlayer = "black";
			break;
		case "black":
			this.lastPlayer = "white";
		}
	}

	setPlayerColor(color) {
		this.playerColor = color;
	}

	getPlayerColor() {
		return this.playerColor;
	}

	play(color, x, y) {
		let colorValue = 0;

		if(color == "black") {
			colorValue = 1;
		} else {	// color == "white"
			colorValue = 2;
		}
		this.matrix[x][y] = colorValue;
	}

	checkVictory(x, y) {
		let currentColor = this.matrix[x][y];
		let posX = parseInt(x);
		let posY = parseInt(y);
	
		let horizontal = [];
		for(let i = posY - 4; i <= posY + 4; i++) {
			if(i >= 0 && i <= 14) {
				horizontal.push(this.matrix[x][i]);
			}
		}
		if(this.countFive(currentColor, horizontal)) return true;

		let vertical = [];
		for(let i = posX - 4; i <= posX + 4; i++) {
			if(i >= 0 && i <= 14) {
				vertical.push(this.matrix[i][y]);
			}
		}
		if(this.countFive(currentColor, vertical)) return true;

		let diagonalA = [];
		for(let i = posX - 4, j = posY - 4; i <= posX + 4; i++) {
			if(i >= 0 && i <= 14 && j >= 0 && j <= 14) {
				diagonalA.push(this.matrix[i][j]);
			}
			j += 1;
		}
		if(this.countFive(currentColor, diagonalA)) return true;

		let diagonalB = [];
		for(let i = posX + 4, j = posY - 4; i >= posX - 4; i--) {
			if(i >= 0 && i <= 14 && j >= 0 && j <= 14) {
				diagonalB.push(this.matrix[i][j]);
			}
			j += 1;
		}
		if(this.countFive(currentColor, diagonalB)) return true;

		return false;
	}

	countFive(color, array) {
		let counter = 0;

		for(let i = 0; i < array.length; i++) {
			if(array[i] == color) {
				counter += 1;
				if(counter >= 5) {
					return true;
				}
			} else {
				counter = 0;
			}
		}

		return false;
	}
}
