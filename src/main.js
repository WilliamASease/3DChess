import godPiece from "./pieces/godPiece.js";
var canv = document.getElementById("canvas");
var paint = canv.getContext("2d");
paint.font = "60px Gothic";
paint.fillText("Raumschach 3D Chess", 10, 45);
paint.font = "30px Gothic";
paint.fillText("Ferdinand Maack 1907 / William Sease 2020", 10, 95);
var bSize = 160;
var sqSize = bSize / 5;

var whiteType = 0;
var blackType = 0;
//0 = human player.
//1 = Carl, the smoking monkey.
//2 = Leonard.
//3 = Rhonda.
//4 = Bob.
//5 = Jill.
//6 = Master Cordon.
//7 = Dr. Premonition.
var gameState = 0;
var clickable = 0;
var pieceInHand = null;
//0 = no game.
//1 = white select piece. 
//2 = white select dest.
//3 = black select piece. 
//4 = black select dest.
//5 = white wins.
//6 = black wins.
//7 = draw.


addEventListener("click", function(e) { onClick(e)});
let board = initBoard();
redraw();
gameStateProcess();

function redraw()
{
	simpleBoards(10, 130);
	plotAllPieces();
	drawGameState();
}

function onClick(evt)
{
	if (!clickable) return;
	var arr = xyToElem(evt.clientX, evt.clientY) //Add functionality to this to create new types of clicks.
	if (arr == null) return;
	if (arr.length == 3) processBoardClick(arr); //Valid board click.
}

function simpleBoards(x, y)
{
	var i = 0;
	for (i = 0; i < 5; i++)
		simpleBoard(x + i * 180, y + i * 150);
	paint.stroke();
}

function simpleBoard(x, y)
{
	paint.rect(x, y, bSize, bSize);
	var i = 0;
	for (i = 0; i < 5; i++)
	{
		paint.rect(x + sqSize * i, y, 0, bSize);
		paint.rect(x, y + sqSize * i, bSize, 0);
	}
	i = 0;
	paint.fillStyle = "#C8C8C8"; // light grey
	for (i = 0; i < 25; i++)
	{
		if (i % 2 == 1) paint.fillStyle = "#C8C8C8";
		else paint.fillStyle = "#E3E3E3";
			paint.fillRect(x + sqSize * (i % 5), y + sqSize * Math.floor((i / 5)), sqSize, sqSize);
	}
	paint.fillStyle = "black";	
}

function drawGameState()
{
	paint.fillStyle = "white";
	paint.fillRect(200,750,500,300);
	paint.font = "50px Gothic";
	paint.fillStyle = "black";
	switch (gameState)
	{
		case 0:
			paint.fillText("No game.", 200, 850);
			break;
		case 1:
			paint.fillText("White select piece.", 200, 850);
			break;
		case 2:
			paint.fillText("White select dest.", 200, 850);
			break;
		case 3:
			paint.fillText("Black select piece.", 200, 850);
			break;
		case 4:
			paint.fillText("Black select dest.", 200, 850);
			break;
		case 5:
			paint.fillText("White wins!", 200, 850);
			break;
		case 6:
			paint.fillText("Black wins!", 200, 850);
			break;
		case 7:
			paint.fillText("Draw!", 200, 850);
			break;
	}
	paint.fillText("Whi " + getPts(1), 200, 900);
	paint.fillText("Bla " + getPts(2), 450, 900);
}

function getPts(color)
{
	var i,j,l;
	var o = 0;
	for (i = 0; i < 5; i++)
		for (j = 0; j < 5; j++)
			for (l = 0; l < 5; l++)
				if(board[i][j][l] != null && board[i][j][l].color == color) 
					o = o + board[i][j][l].pts
	return o;
}

function paintValid(x)
{
	var i = 0;
	paint.fillStyle = "green";
	for (i = 0; i < x.length; i += 3)
	{
		plot(x[i],x[i + 1],x[i + 2], sqSize / 5, 0, 0);
	}
	paint.fillStyle = "black";
}

function plot(d, x, y, size, xoff, yoff)
{
	paint.fillRect(xoff + 10 + d * 180 + x * sqSize, 
				   yoff + 130 + d * 150 + y * sqSize, 
					   size, size);
}

function plotPiece(x)
{
	paint.font = "20px Gothic";
	if(x.color == 1) paint.fillStyle = "white";
	else if(x.color == 2) paint.fillStyle = "grey";
	else paint.fillStyle = "red";
	plot(x.d, x.x, x.y, sqSize/2, sqSize/4, sqSize/4);
	paint.fillStyle = "black";
	paint.fillText(x.name.charAt(0),
			       19 + x.d * 180 + x.x * sqSize, 
				   151+ x.d * 150 + x.y * sqSize);
}

function plotAllPieces()
{
	var i, j, l = 0;
	for (i = 0; i < 5; i++)
		for (j = 0; j < 5; j++)
			for (l = 0; l < 5; l++)
				if (board[i][j][l] != null)
					plotPiece(board[i][j][l]);
}

function initBoard()
{
	
	var i, j, l = 0;
	var d = new Array()
	for (i = 0; i < 5; i++)
	{
		d[i] = new Array()
		for (j = 0; j < 5; j++)
		{
			d[i][j] = new Array();
		}
	}
	
	for (i = 0; i < 5; i++)
		for (j = 0; j < 5; j++)
			for (l = 0; l < 5; l++)
			{
				d[i][j][l] = null;
			}
	
	d[0][0][0] = new godPiece(1,0,0,0);
	d[0][1][0] = new godPiece(1,0,1,0);
	d[0][2][0] = new godPiece(1,0,2,0);
	d[0][3][0] = new godPiece(1,0,3,0);
	d[0][4][0] = new godPiece(1,0,4,0);
	d[0][0][1] = new godPiece(1,0,0,1);
	d[0][1][1] = new godPiece(1,0,1,1);
	d[0][2][1] = new godPiece(1,0,2,1);
	d[0][3][1] = new godPiece(1,0,3,1);
	d[0][4][1] = new godPiece(1,0,4,1);
	d[1][0][0] = new godPiece(1,1,0,0);
	d[1][1][0] = new godPiece(1,1,1,0);
	d[1][2][0] = new godPiece(1,1,2,0);
	d[1][3][0] = new godPiece(1,1,3,0);
	d[1][4][0] = new godPiece(1,1,4,0);
	d[1][0][1] = new godPiece(1,1,0,1);
	d[1][1][1] = new godPiece(1,1,1,1);
	d[1][2][1] = new godPiece(1,1,2,1);
	d[1][3][1] = new godPiece(1,1,3,1);
	d[1][4][1] = new godPiece(1,1,4,1);
	
	d[4][0][4] = new godPiece(2,4,0,4);
	d[4][1][4] = new godPiece(2,4,1,4);
	d[4][2][4] = new godPiece(2,4,2,4);
	d[4][3][4] = new godPiece(2,4,3,4);
	d[4][4][4] = new godPiece(2,4,4,4);
	d[4][0][3] = new godPiece(2,4,0,3);
	d[4][1][3] = new godPiece(2,4,1,3);
	d[4][2][3] = new godPiece(2,4,2,3);
	d[4][3][3] = new godPiece(2,4,3,3);
	d[4][4][3] = new godPiece(2,4,4,3);
	d[3][0][4] = new godPiece(2,3,0,4);
	d[3][1][4] = new godPiece(2,3,1,4);
	d[3][2][4] = new godPiece(2,3,2,4);
	d[3][3][4] = new godPiece(2,3,3,4);
	d[3][4][4] = new godPiece(2,3,4,4);
	d[3][0][3] = new godPiece(2,3,0,3);
	d[3][1][3] = new godPiece(2,3,1,3);
	d[3][2][3] = new godPiece(2,3,2,3);
	d[3][3][3] = new godPiece(2,3,3,3);
	d[3][4][3] = new godPiece(2,3,4,3);
	return d;
}

function xyToElem(x, y)
{
	var d = Math.floor(x/180);
	x = Math.floor((x + window.pageXOffset - d * 180 - 10)/sqSize);
	y = Math.floor((y + window.pageYOffset - 130 - d * 150)/sqSize);
	if (d < 0 || d > 4 || x < 0 || x > 4 || y < 0 || y > 4) return null;
	return [d, x, y];
}

function processBoardClick(arr)
{
	var txt = "";
	if (arr[0] == 0) txt = "E";
	if (arr[0] == 1) txt = "D";
	if (arr[0] == 2) txt = "C";
	if (arr[0] == 3) txt = "B";
	if (arr[0] == 4) txt = "A";
	if (arr[1] == 0) txt += "a";
	if (arr[1] == 1) txt += "b";
	if (arr[1] == 2) txt += "c";
	if (arr[1] == 3) txt += "d";
	if (arr[1] == 4) txt += "e";
	txt+=arr[2] + 1;
	paint.fillStyle = "white";
	paint.fillRect(0,750,200,150);
	paint.font = "100px Gothic";
	paint.fillStyle = "black";
	paint.fillText(txt, 0, 900);
	paint.font = "50px Gothic";
	var temp = boardGet(arr);
	if (temp != null) paint.fillText(temp.name, 0, 800);
	console.log("yo " + gameState);
	if ((temp != null) && (gameState == 1 && temp.color == 1) || (gameState == 3 && temp.color == 2))
	{
		pieceInHand = temp;
		gameState++;
		redraw();
		paintValid(temp.getValid());
		temp = null;
		return;
	}
	if ((gameState == 2 || gameState == 4) && pieceInHand.valid(arr[0],arr[1],arr[2]))
	{
		board[pieceInHand.d][pieceInHand.x][pieceInHand.y] = null;
		pieceInHand.move(arr[0],arr[1],arr[2]);
		board[arr[0]][arr[1]][arr[2]] = pieceInHand;
		if (gameState == 2) gameState = 3;
		if (gameState == 4) gameState = 1;
		checkGameOver();
		gameStateProcess();
	}
}

function boardGet(arr)
{
	return board[arr[0]][arr[1]][arr[2]];
}

function gameStateProcess()
{
	var advance = false;
	switch (gameState)
	{
		case 0:
			gameState = 1;
			advance = true;
			break;
		case 1:
			clickable = false;
			if (whiteType > 0)
			{
				AIthink(1, whiteType);
				gameState = 3;
				advance = true;
			}
			clickable = true;
			break;
		case 3:
			clickable = false;
			if (blackType > 0)
			{
				AIthink(2, blackType);
				gameState = 1;
				advance = true;
			}
			clickable = true;
			break;
	}
	checkGameOver();
	redraw();
	if (advance) gameStateProcess();
}

function AIthink(t, diff)
{
}

function checkGameOver()
{
}








