
var kBoardWidth = 8;
var kBoardHeight= 8;
var kPieceWidth = 50;
var kPieceHeight= 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);
var kFilasIniciales = 3;
var kNegras = "#000000";
var kBlancas = "#ffffff";


var gCanvasElement;
var gDrawingContext;
var gPattern;

var piezas = [];

var gNumPieces;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gMoveCountElem;
var gGameInProgress;

function getCursorPosition(e) {
	/* returns Cell with .row and .column properties */
	var x;
	var y;
	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= gCanvasElement.offsetLeft;
	y -= gCanvasElement.offsetTop;
	x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Casilla(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
    return cell;
}

function gGameInProgress(){
	return true;
}

function isTheGameOver(){
	return false;
}

function endGame(){

}

function drawBoard() {
    if (gGameInProgress && isTheGameOver()) {
	endGame();
    }

    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);

    gDrawingContext.beginPath();
   
    /* vertical lines */
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
	gDrawingContext.moveTo(0.5 + x, 0);
	gDrawingContext.lineTo(0.5 + x, kPixelHeight);
    }
    
    /* horizontal lines */
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
	gDrawingContext.moveTo(0, 0.5 + y);
	gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
    }
    
    /* draw it! */
    gDrawingContext.strokeStyle = "#ccc";
    gDrawingContext.stroke();
    
    for (var i = 0; i < piezas.length; i++) {
	drawPiece(piezas[i], piezas[i].color, i == gSelectedPieceIndex);
    }


    gMoveCountElem.innerHTML = gMoveCount;

}

function drawPiece(p, color, selected) {
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + (kPieceWidth/2);
    var y = (row * kPieceHeight) + (kPieceHeight/2);
    var radius = (kPieceWidth/2) - (kPieceWidth/10);
    gDrawingContext.beginPath();
    gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
    gDrawingContext.closePath();
    gDrawingContext.fillStyle = color;
    gDrawingContext.fill();
    gDrawingContext.strokeStyle = "#000";
    gDrawingContext.stroke();
    if (selected) {
	gDrawingContext.fillStyle = "#ff0000";
	gDrawingContext.fill();
    }
}

function guardarPosiciones() {
	for (var i=0; i < piezas.length; i++) { 
		localStorage.setItem("pieza" + i + ".fila", piezas[i].row); 
		localStorage.setItem("pieza" + i + ".columna", piezas[i].column); 
		localStorage.setItem("pieza" + i + ".color", piezas[i].color); 
	}
}

function cargarPosiciones() {
	piezas = [];
	for (var i=0; i < localStorage.length/3; i++) { 
		var row = parseInt(localStorage.getItem("pieza" + i + ".fila")); 
		var column = parseInt(localStorage.getItem("pieza" + i + ".columna")); 
		var color = localStorage.getItem("pieza" + i + ".color"); 
		piezas.push(new Casilla(row, column, color));
	}
	drawBoard();
}
function newGame() {
	for (var i=0; i< kFilasIniciales; i++){
		for (var j=(i+1)%2; j < kBoardHeight; j=j+2) {
			piezas.push(new Casilla(i,j, kNegras));
		}
	}

	for (var i=kBoardHeight-1; i >= kBoardHeight - kFilasIniciales; i--){
		for (var j=(i+1)%2; j < kBoardHeight; j=j+2) {
			piezas.push(new Casilla(i,j, kBlancas));
		}
	}

    gNumPieces = piezas.length;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gMoveCount = 0;
    gGameInProgress = true;
    drawBoard();
}

function Casilla(row, column, color) {
    this.row = row;
    this.column = column;
    this.color = color;
}

function isThereAPieceBetween(casilla1, casilla2) {
    var rowDiff = casilla1.row - casilla2.row;
    var columnDiff = casilla1.column - casilla2.column;

	if(casilla1.color == kBlancas){
		if(rowDiff > 0){
			//NO dama
			return true;
		}else{
			if(Math.abs(columnDiff)>0 && Math.abs(rowDiff)>0){
			//si dama
			console.log("damaBlanca no implementado")
			}
			return false;
		}
	}else{
		if(rowDiff < 0){
			//NO dama
			return true;
		}else{
			if(Math.abs(columnDiff)>0 && Math.abs(rowDiff)>0){
				//si dama
				console.log("damaNegra no implementado")
			}
			return false;
		}
	}	
}



function clickOnEmptyCell(cell) {
    if (gSelectedPieceIndex == -1) { return; }
   
    var direccion = 1;
    if (piezas[gSelectedPieceIndex].color == kBlancas)
	   direccion = -1;
    
    var rowDiff = direccion * (cell.row - piezas[gSelectedPieceIndex].row);
    var columnDiff = direccion * (cell.column - piezas[gSelectedPieceIndex].column);
    if (rowDiff == 1 && Math.abs(columnDiff) == 1) {
	/* we already know that this click was on an empty square,
	   so that must mean this was a valid single-square move */
	piezas[gSelectedPieceIndex].row = cell.row;
	piezas[gSelectedPieceIndex].column = cell.column;
	gMoveCount += 1;
	gSelectedPieceIndex = -1;
	gSelectedPieceHasMoved = false;
	drawBoard();
	return;
    }

	columnDiff = Math.abs(columnDiff);
    if ((isThereAPieceBetween(piezas[gSelectedPieceIndex], cell) && 
		((rowDiff == 2) && (columnDiff == 2))) /*||
		(((rowDiff == 2) && (columnDiff == 0)) ||
		 ((rowDiff == 0) && (columnDiff == 2)))*/) {

		/* this was a valid jump */
		if (!gSelectedPieceHasMoved) {
			gMoveCount += 1;
		}
		gSelectedPieceHasMoved = true;
		piezas[gSelectedPieceIndex].row = cell.row;
		piezas[gSelectedPieceIndex].column = cell.column;
		drawBoard();
		return;
    }
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    drawBoard();
}

function gestorClick(e){
	var casilla = getCursorPosition(e);
	for (var i = 0; i < gNumPieces; i++) {
		if ((piezas[i].row == casilla.row) && 
				(piezas[i].column == casilla.column)) {
					clickOnPiece(i);
					return;
				}
	}
	clickOnEmptyCell(casilla);	
}

function clickOnPiece(indicePieza){
	if (gSelectedPieceIndex == indicePieza) { return; }
    	gSelectedPieceIndex = indicePieza;
    	gSelectedPieceHasMoved = false;
    	drawBoard();
}

function iniciarJuego(canvasElement, moveCountElement) {
    gCanvasElement = canvasElement;
    gCanvasElement.width = kPixelWidth;
    gCanvasElement.height = kPixelHeight;
    gCanvasElement.addEventListener("click", gestorClick, false);
    gMoveCountElem = moveCountElement;
    gDrawingContext = gCanvasElement.getContext("2d");
    newGame();
}
