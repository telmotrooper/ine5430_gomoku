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
				if( this.itsGoodToPlay(matrix, x, y) ) {
					emptySlots.push([x,y]);
				}
			}
		}
		if( emptySlots.length == 0 ){
			emptySlots.push([7,7]);
		}

		return emptySlots;
	}

	itsGoodToPlay( matrix, x, y ){
		if( matrix[x][y] != 0 ){
			return false;
		}

		if( ( x + 1 < 15 && matrix[x + 1][y] != 0 )|| 
			( x - 1 > 0 && matrix[x - 1][y] != 0 )||
			( y + 1 < 15 && matrix[x][y + 1] != 0 )||
			( y - 1 > 0 && matrix[x][y - 1] != 0 )||
			( x + 1 < 15 && y + 1 < 15 && matrix[x + 1][y + 1] != 0 )||
			( x - 1 > 0 && y + 1 < 15 && matrix[x - 1][y + 1] != 0 )||
			( x + 1 < 15 && y - 1 > 0 && matrix[x + 1][y - 1] != 0 )||
			( x - 1 > 0 && y - 1 > 0 && matrix[x - 1][y - 1] != 0 ) ){
			return true;
		}
		return false;
	}

	// heuristic(matrix, color) {
	// 	let heuristicValue = 0;

	// 	for(let y = 0; y < matrix.length; y++) {
	// 		for(let x = 0; x < matrix[y].length; x++) {
	// 			let horizontal = [];
	// 			for(let i = y - 5; i <= y + 5; i++) {
	// 				if(i >= 0 && i <= 14) {
	// 					horizontal.push(matrix[x][i]);
	// 				}
	// 			}
	// 			heuristicValue += this.countSequence(color, horizontal);
		
	// 			let vertical = [];
	// 			for(let i = x - 5; i <= x + 5; i++) {
	// 				if(i >= 0 && i <= 14) {
	// 					vertical.push(matrix[i][y]);
	// 				}
	// 			}
	// 			heuristicValue += this.countSequence(color, vertical);
		
	// 			let diagonalA = [];
	// 			for(let i = x - 5, j = y - 5; i <= x + 5; i++) {
	// 				if(i >= 0 && i <= 14 && j >= 0 && j <= 14) {
	// 					diagonalA.push(matrix[i][j]);
	// 				}
	// 				j += 1;
	// 			}
	// 			heuristicValue += this.countSequence(color, diagonalA);
		
	// 			let diagonalB = [];
	// 			for(let i = x + 5, j = y - 5; i >= x - 5; i--) {
	// 				if(i >= 0 && i <= 14 && j >= 0 && j <= 14) {
	// 					diagonalB.push(matrix[i][j]);
	// 				}
	// 				j += 1;
	// 			}
	// 			heuristicValue += this.countSequence(color, diagonalB);
	// 		}
	// 	}

	// 	return heuristicValue;
	// }

	testHeristic(){
		let matrix = [
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		console.log( "HEURISTIC" );
		console.log( this.heuristic(matrix, 1) );
	}

	heuristic( matrix, iaColor ){
		let hValue = 0;

		// // HORIZONTAL; TODO Vertical -- so criar as variaveis e trocar x por y ao percorrer a matriz
		
		// \ diagonal parte de cima da matriz
		
		hValue = this.getSecundDiagonalValue( matrix, iaColor);

		console.log( "hValue" );
		console.log( hValue );
		// }
		// for( let coluna = 0; coluna < 10; coluna ++ ){

		// }

		// for(let x = 0; x < matrix.length; x++) {
		// 	for(let y = 0; y < matrix[x].length; y++) {

		// 	}
		// }

		return hValue;
	}

	getVerticalValue(matrix, iaColor){
		let hValue = 0;
		for(let y = 0; y < matrix.length; y++) {
			let xCount = 0;
			let xLength = 0;
			let xSpace = 0;
			let xColor = 0;
			let xBlocked = 0;
			let xSpaceAfter = 0;
			for(let x = 0; x < matrix[y].length; x++) {
				if( xLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
					break;
				}
				if( matrix[x][y] == 0 ){
					if( xLength == 0){ // nenhuma tupla
						continue;
					}else{  // tupla com espaços;
						xCount++;
						xSpace++;
						xSpaceAfter++;
					}
				}else{
					if( xLength == 0 ){ // nova tupla
						xCount = 1;
						xLength = 1;
						xColor = matrix[x][y];
					}else{ // atualizar tupla
						if( matrix[x][y] == xColor ){ // aumenta o length
							xCount++;
							xLength++;
							xSpaceAfter = 0;
							if( x < 5 ){
								xBlocked = 1;
							}
						}else{ // blockeia // comeca nova
							if( xBlocked == 0 ){ //adiciona tupla blockead // caso xBlocked != 0 quer diser que a tupla ja estava blockeada 
												 // nao seram adicionadas tuplas blockeadas dos dois lados
								xBlocked = 1;
								hValue += this.getTupleValue( xLength, xSpace - xSpaceAfter, xBlocked, xColor, iaColor);
							}
							xCount = 1;
							xLength = 1;
							xBlocked = 1;
							xSpace = 0;
							xColor = matrix[x][y];
							xSpaceAfter = 0;
						}
					}
				}
				if( xCount == 5 ){ //adiciona valor de tupla
					hValue += this.getTupleValue( xLength, xSpace - xSpaceAfter, xBlocked, xColor, iaColor );
					xCount = 0;
					xLength = 0;
					xColor = 0;
					xBlocked = 0;
					xSpace = 0;
					xSpaceAfter = 0;
				}
			}
		}
		return hValue;
	}

	getHorizontallValue(matrix, iaColor){
		let hValue = 0;
		for(let x = 0; x < matrix.length; x++) {
			let xCount = 0;
			let xLength = 0;
			let xSpace = 0;
			let xColor = 0;
			let xBlocked = 0;
			let xSpaceAfter = 0;
			for(let y = 0; y < matrix[x].length; y++) {
				if( xLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
					break;
				}
				if( matrix[x][y] == 0 ){
					if( xLength == 0){ // nenhuma tupla
						continue;
					}else{  // tupla com espaços;
						xCount++;
						xSpace++;
						xSpaceAfter++;
					}
				}else{
					if( xLength == 0 ){ // nova tupla
						xCount = 1;
						xLength = 1;
						xColor = matrix[x][y];
					}else{ // atualizar tupla
						if( matrix[x][y] == xColor ){ // aumenta o length
							xCount++;
							xLength++;
							xSpaceAfter = 0;
							if( x < 5 ){
								xBlocked = 1;
							}
						}else{ // blockeia // comeca nova
							if( xBlocked == 0 ){ //adiciona tupla blockead // caso xBlocked != 0 quer diser que a tupla ja estava blockeada 
												 // nao seram adicionadas tuplas blockeadas dos dois lados
								xBlocked = 1;
								hValue += this.getTupleValue( xLength, xSpace - xSpaceAfter, xBlocked, xColor, iaColor);
							}
							xCount = 1;
							xLength = 1;
							xBlocked = 1;
							xSpace = 0;
							xColor = matrix[x][y];
							xSpaceAfter = 0;
						}
					}
				}
				if( xCount == 5 ){ //adiciona valor de tupla
					hValue += this.getTupleValue( xLength, xSpace - xSpaceAfter, xBlocked, xColor, iaColor );
					xCount = 0;
					xLength = 0;
					xColor = 0;
					xBlocked = 0;
					xSpace = 0;
					xSpaceAfter = 0;
				}
			}
		}
		return hValue;
	}

	getFirstDiagonalValue(matrix, iaColor){
		let hValue = 0;
		let coluna = 0;
		let counter = 0;
		for( let linha = 0; linha < 10; linha++ ){
			let dCount = 0;
			let dLength = 0;
			let dSpace = 0;
			let dColor = 0;
			let dBlocked = 0;
			let dSpaceAfter = 0;
			for( let i = 0; i < matrix.length; i++ ){
				let x = coluna + i;
				let y = linha + i; 
				if( x > 14 || y > 14 ){
					break; // supostamente e para parar apenas o 2 loop
				}

				// if( dLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
				// 	break;
				// }
				if( matrix[x][y] == 0 ){
					if( dLength == 0){ // nenhuma tupla
						continue;
					}else{  // tupla com espaços;
						dCount++;
						dSpace++;
						dSpaceAfter++;
					}
				}else{
					if( dLength == 0 ){ // nova tupla
						dCount = 1;
						dLength = 1;
						dColor = matrix[x][y];
					}else{ // atualizar tupla
						if( matrix[x][y] == dColor ){ // aumenta o length
							dCount++;
							dLength++;
							dSpaceAfter = 0;
							// if( x < 5 ){
							// 	dBlocked = 1;
							// }
						}else{ // blockeia // comeca nova
							if( dBlocked == 0 ){ //adiciona tupla blockead // caso xBlocked != 0 quer diser que a tupla ja estava blockeada 
												 // nao seram adicionadas tuplas blockeadas dos dois lados
								dBlocked = 1;
								hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor);
							}
							dCount = 1;
							dLength = 1;
							dBlocked = 1;
							dSpace = 0;
							dColor = matrix[x][y];
							dSpaceAfter = 0;
						}
					}
				}
				if( dCount == 5 ){ //adiciona valor de tupla
					hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
					dCount = 0;
					dLength = 0;
					dColor = 0;
					dBlocked = 0;
					dSpace = 0;
					dSpaceAfter = 0;
				}
				if( matrix[coluna + i ][ linha + i] == 1){
					counter++;
				}
			}
			if( dLength > 0 ){
				hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
			}
		}
		let linha = 0;
		for( coluna = 1; coluna < 10; coluna++ ){
			let dCount = 0;
			let dLength = 0;
			let dSpace = 0;
			let dColor = 0;
			let dBlocked = 0;
			let dSpaceAfter = 0;
			for( let i = 0; i < matrix.length; i++ ){
				let x = coluna + i;
				let y = linha + i; 
				if( x > 14 || y > 14 ){
					break; // supostamente e para parar apenas o 2 loop
				}
				// if( dLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
				// 	break;
				// }
				if( matrix[x][y] == 0 ){
					if( dLength == 0){ // nenhuma tupla
						continue;
					}else{  // tupla com espaços;
						dCount++;
						dSpace++;
						dSpaceAfter++;
					}
				}else{
					if( dLength == 0 ){ // nova tupla
						dCount = 1;
						dLength = 1;
						dColor = matrix[x][y];
					}else{ // atualizar tupla
						if( matrix[x][y] == dColor ){ // aumenta o length
							dCount++;
							dLength++;
							dSpaceAfter = 0;
							// if( x < 5 ){
							// 	dBlocked = 1;
							// }
						}else{ // blockeia // comeca nova
							if( dBlocked == 0 ){ //adiciona tupla blockead // caso xBlocked != 0 quer diser que a tupla ja estava blockeada 
												 // nao seram adicionadas tuplas blockeadas dos dois lados
								dBlocked = 1;
								hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor);
							}
							dCount = 1;
							dLength = 1;
							dBlocked = 1;
							dSpace = 0;
							dColor = matrix[x][y];
							dSpaceAfter = 0;
						}
					}
				}
				if( dCount == 5 ){ //adiciona valor de tupla
					hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
					dCount = 0;
					dLength = 0;
					dColor = 0;
					dBlocked = 0;
					dSpace = 0;
					dSpaceAfter = 0;
				}
				if( matrix[coluna + i ][ linha + i] == 1){
					counter++;
				}
			}
			if( dLength > 0 ){
				hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
			}
		}
		return hValue;
	}

	getSecundDiagonalValue(matrix, iaColor){
		let hValue = 0;
		let coluna = 0;
		let counter = 0;
		for( let linha = 14; linha >= 4; linha-- ){
			let dCount = 0;
			let dLength = 0;
			let dSpace = 0;
			let dColor = 0;
			let dBlocked = 0;
			let dSpaceAfter = 0;
			for( let i = 0; i < matrix.length; i++ ){
				let x = 14 - i;
				let y = linha - i; 
				if( x < 0 || y < 0 ){
					break;
				}

				if(matrix[x][y] != 0 ){
					counter++;
				}

				// if( dLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
				// 	break;
				// }
				if( matrix[x][y] == 0 ){
					if( dLength == 0){ // nenhuma tupla
						continue;
					}else{  // tupla com espaços;
						dCount++;
						dSpace++;
						dSpaceAfter++;
					}
				}else{
					if( dLength == 0 ){ // nova tupla
						dCount = 1;
						dLength = 1;
						dColor = matrix[x][y];
					}else{ // atualizar tupla
						if( matrix[x][y] == dColor ){ // aumenta o length
							dCount++;
							dLength++;
							dSpaceAfter = 0;
							// if( x < 5 ){
							// 	dBlocked = 1;
							// }
						}else{ // blockeia // comeca nova
							if( dBlocked == 0 ){ //adiciona tupla blockead // caso xBlocked != 0 quer diser que a tupla ja estava blockeada 
												 // nao seram adicionadas tuplas blockeadas dos dois lados
								dBlocked = 1;
								hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor);
							}
							dCount = 1;
							dLength = 1;
							dBlocked = 1;
							dSpace = 0;
							dColor = matrix[x][y];
							dSpaceAfter = 0;
						}
					}
				}
				if( dCount == 5 ){ //adiciona valor de tupla
					hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
					dCount = 0;
					dLength = 0;
					dColor = 0;
					dBlocked = 0;
					dSpace = 0;
					dSpaceAfter = 0;
				}
				if( matrix[coluna + i ][ linha + i] == 1){
					counter++;
				}
			}
			if( dLength > 0 ){
				hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
			}
		}
		let linha = 0;
			console.log('counter' );
	console.log(counter );
		for( coluna = 9; coluna >= 4; coluna-- ){
			let dCount = 0;
			let dLength = 0;
			let dSpace = 0;
			let dColor = 0;
			let dBlocked = 0;
			let dSpaceAfter = 0;
			for( let i = 0; i < matrix.length; i++ ){
				let x =coluna - i;
				let y = 14 - i; 
				if( x < 0 || y < 0 ){
					break; // supostamente e para parar apenas o 2 loop
				}
				// if( dLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
				// 	break;
				// }
				if( matrix[x][y] == 0 ){
					if( dLength == 0){ // nenhuma tupla
						continue;
					}else{  // tupla com espaços;
						dCount++;
						dSpace++;
						dSpaceAfter++;
					}
				}else{
					if( dLength == 0 ){ // nova tupla
						dCount = 1;
						dLength = 1;
						dColor = matrix[x][y];
					}else{ // atualizar tupla
						if( matrix[x][y] == dColor ){ // aumenta o length
							dCount++;
							dLength++;
							dSpaceAfter = 0;
							// if( x < 5 ){
							// 	dBlocked = 1;
							// }
						}else{ // blockeia // comeca nova
							if( dBlocked == 0 ){ //adiciona tupla blockead // caso xBlocked != 0 quer diser que a tupla ja estava blockeada 
												 // nao seram adicionadas tuplas blockeadas dos dois lados
								dBlocked = 1;
								hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor);
							}
							dCount = 1;
							dLength = 1;
							dBlocked = 1;
							dSpace = 0;
							dColor = matrix[x][y];
							dSpaceAfter = 0;
						}
					}
				}
				if( dCount == 5 ){ //adiciona valor de tupla
					hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
					dCount = 0;
					dLength = 0;
					dColor = 0;
					dBlocked = 0;
					dSpace = 0;
					dSpaceAfter = 0;
				}
				if( matrix[coluna + i ][ linha + i] == 1){
					counter++;
				}
			}
			if( dLength > 0 ){
				hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
			}
		}
		return hValue;
	}


	getTupleValue(length, spaces, blocked, color, iaColor){
		let value = 0;
		if( color == iaColor ){
			if( length > 1 ){
				value += this.amp( length ) * this.mod( spaces, blocked );
			}else{
				value++;
			}
		}else{
			if( length > 1 ){
				value -= this.amp( length ) * this.mod( spaces, blocked );
			}else{
				value--;
			}
		}
		return value;
	}

	amp( length ){
		let value = 0;
		switch (length){
			case 2:
				value =	50;
			break;
			case 3:
				value =	100;
			break;
			case 4:
				value =	200;
			break;
			case 5:
				value =	500;
		}
		return value;
	}

	mod( spaces, blocked ){
		return 10 - spaces - (blocked * 5);
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
