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

	heuristic( matrix, iaColor ){
		let hValue = 0;
		hValue += this.getVerticalValue( matrix, iaColor);
		hValue += this.getHorizontallValue( matrix, iaColor);
		hValue += this.getFirstDiagonalValue( matrix, iaColor);
		hValue += this.getSecundDiagonalValue( matrix, iaColor);
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
				if( xLength == 0 && y > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
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
					break;
				}
				if( dLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
					break;
				}
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
							if( x < 5 ){
								dBlocked = 1;
							}
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
				if( dLength == 0 && x > 10 ){ // nao haveram tuplas validas caso nao tenha começado antes do 10
					break;
				}
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
							if( x < 5 ){
								dBlocked = 1;
							}
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
		let counter = 0;
		for( let linha = 14; linha >= 4; linha-- ){
			let dCount = 0;
			let dLength = 0;
			let dSpace = 0;
			let dColor = 0;
			let dBlocked = 0;
			let dSpaceAfter = 0;
			for( let i = 0; i < matrix.length; i++ ){
				let x = linha - i;
				let y = i; 
				if( x < 0){
					break;
				}
				if(matrix[x][y] != 0 ){
					counter++;
				}
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
				if( matrix[x][y] == 1){
					counter++;
				}
			}
			if( dLength > 0 ){
				hValue += this.getTupleValue( dLength, dSpace - dSpaceAfter, dBlocked, dColor, iaColor );
			}
		}
		for( let coluna = 1; coluna < 11; coluna++ ){
			let dCount = 0;
			let dLength = 0;
			let dSpace = 0;
			let dColor = 0;
			let dBlocked = 0;
			let dSpaceAfter = 0;
			for( let i = 0; i < matrix.length; i++ ){
				let x = 14 - i;
				let y = coluna + i;
				if( x < 0 || y > 14 ){
					break;
				}
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
				value += this.group( length ) * this.modifier( spaces, blocked );
			}else{
				value++;
			}
		}else{
			if( length > 1 ){
				value -= this.group( length ) * this.modifier( spaces, blocked );
			}else{
				value--;
			}
		}
		return value;
	}

	group( length ){
		let value = 0;
		switch (length){
			case 2:
				value =	600;
			break;
			case 3:
				value =	600*300;
			break;
			case 4:
				value =	600*300*150;
			break;
			case 5:
				value =	600*300*150*150;
		}
		return value;
	}

	modifier( spaces, blocked ){
		return 10 - spaces - (blocked * 4);
	}

	minimax(node, depth, alpha, beta, maximizing)
	{
		let v = Number.MIN_SAFE_INTEGER;
		let children = this.getEmptySlots(node);
		let bestPlay = [];
		let bestValue = Number.MIN_SAFE_INTEGER;

		for(let i = 0; i < children.length; i++) {

			let x = children[i][0];
			let y = children[i][1];

			node[x][y] = this.computerColor;
			v = this.minimaxNext(node, depth - 1, alpha, beta, false);
			node[x][y] = 0;

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
		if(depth == 0) {
			let totalHeuristic = this.heuristic(node, this.computerColor);
			return totalHeuristic;
		}

		if(maximizing) {
			let v = Number.MIN_SAFE_INTEGER;
			let children = this.getEmptySlots(node);

			for(let i = 0; i < children.length; i++) {
				let x = children[i][0];
				let y = children[i][1];

				node[x][y] = this.computerColor;
				v = Math.max(v, this.minimaxNext(node, depth - 1, alpha, beta, false));
				alpha = Math.max(alpha, v);
				node[x][y] = 0;

				if(beta <= alpha) {
					break;
				}
			}
			return v;
		} else {	// minimizing
			let v = Number.MAX_SAFE_INTEGER;
			let children = this.getEmptySlots(node);
			
			for(let i = 0; i < children.length; i++) {
				let x = children[i][0];
				let y = children[i][1];

				node[x][y] = this.playerColor;
				v = Math.min(v, this.minimaxNext(node, depth - 1, alpha, beta, true));
				beta = Math.min(beta, v);
				node[x][y] = 0;

				if(beta <= alpha) {
					break;
				}
			}
			return v;
		}
	}
}
