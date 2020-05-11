const GS = {
		NOGAME: 0,
		WHITESEL: 1,
		WHITEDEST: 2,
		BLACKSEL: 3,
		BLACKDEST: 4,
		WHITEWINS: 5,
		BLACKWINS: 6,
		DRAW: 7
	}

const COL = {
		WHITE: 0,
		BLACK: 1
	}

import godPiece from "./pieces/godPiece.js";
import king from "./pieces/king.js";

var canv = document.getElementById("canvas");
var paint = canv.getContext("2d");
paint.font = "60px Gothic";
paint.fillText("Raumschach 3D Chess", 10, 45);
paint.font = "30px Gothic";
paint.fillText("Ferdinand Maack 1907 / William Sease 2020", 10, 95);
var bSize = 160;
var sqSize = bSize / 5;

var whiteType = 0;
var whiteKing;
var whiteBag = new Array();
var blackType = 0;
var blackKing;
var blackBag = new Array();

var gameState = GS.NOGAME;
var clickable = false;
var pieceInHand = null;


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
	if (arr == "drop" && (gameState == GS.WHITEDEST || gameState == GS.BLACKDEST))
	{
		gameState--;
		gameStateProcess();
		return;
	}
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
			paint.fillText("White select dest. [Drop]", 200, 850);
			break;
		case 3:
			paint.fillText("Black select piece.", 200, 850);
			break;
		case 4:
			paint.fillText("Black select dest. [Drop]", 200, 850);
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
	paint.fillText("Whi " + getPts(COL.WHITE), 200, 900);
	paint.fillText("Bla " + getPts(COL.BLACK), 450, 900);
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
	if(x.color == COL.WHITE) paint.fillStyle = "white";
	else if(x.color == COL.BLACK) paint.fillStyle = "grey";
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
	
	//d[0][0][0] = new godPiece(0,0,0,0);
	//d[0][1][0] = new godPiece(0,0,1,0);
	d[0][2][0] = new king(0,0,2,0); whiteKing = d[0][2][0];
	//d[0][3][0] = new godPiece(0,0,3,0);
	//d[0][4][0] = new godPiece(0,0,4,0);
	d[0][0][1] = new godPiece(0,0,0,1);
	d[0][1][1] = new godPiece(0,0,1,1);
	d[0][2][1] = new godPiece(0,0,2,1);
	d[0][3][1] = new godPiece(0,0,3,1);
	d[0][4][1] = new godPiece(0,0,4,1);
	//d[1][0][0] = new godPiece(0,1,0,0);
	//d[1][1][0] = new godPiece(0,1,1,0);
	//d[1][2][0] = new godPiece(0,1,2,0);
	//d[1][3][0] = new godPiece(0,1,3,0);
	//d[1][4][0] = new godPiece(0,1,4,0);
	//d[1][0][1] = new godPiece(0,1,0,1);
	//d[1][1][1] = new godPiece(0,1,1,1);
	//d[1][2][1] = new godPiece(0,1,2,1);
	//d[1][3][1] = new godPiece(0,1,3,1);
	//d[1][4][1] = new godPiece(0,1,4,1);
	
	//d[4][0][4] = new godPiece(1,4,0,4);
	//d[4][1][4] = new godPiece(1,4,1,4);
	d[4][2][4] = new king(1,4,2,4); blackKing = d[0][2][0];
	//d[4][3][4] = new godPiece(1,4,3,4);
	//d[4][4][4] = new godPiece(1,4,4,4);
	d[4][0][3] = new godPiece(1,4,0,3);
	d[4][1][3] = new godPiece(1,4,1,3);
	d[4][2][3] = new godPiece(1,4,2,3);
	d[4][3][3] = new godPiece(1,4,3,3);
	d[4][4][3] = new godPiece(1,4,4,3);
	//d[3][0][4] = new godPiece(1,3,0,4);
	//d[3][1][4] = new godPiece(1,3,1,4);
	//d[3][2][4] = new godPiece(1,3,2,4);
	//d[3][3][4] = new godPiece(1,3,3,4);
	//d[3][4][4] = new godPiece(1,3,4,4);
	//d[3][0][3] = new godPiece(1,3,0,3);
	//d[3][1][3] = new godPiece(1,3,1,3);
	//d[3][2][3] = new godPiece(1,3,2,3);
	//d[3][3][3] = new godPiece(1,3,3,3);
	//d[3][4][3] = new godPiece(1,3,4,3);
	return d;
}

function xyToElem(x, y)
{
	x = x + window.pageXOffset;
	y = y + window.pageYOffset;
	if (x > 575 && x < 525 + 200 && y > 815 && y < 815 + 50) return "drop";
	var d = Math.floor(x/180);
	x = Math.floor((x - d * 180 - 10)/sqSize);
	y = Math.floor((y - 130 - d * 150)/sqSize);
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
	if ((temp != null) && (gameState == GS.WHITESEL && temp.color == COL.WHITE) || 
		(gameState == GS.BLACKSEL && temp.color == COL.BLACK))
	{
		pieceInHand = temp;
		gameState++;
		redraw();
		paintValid(temp.getValid(board));
		temp = null;
		return;
	}
	if ((gameState == GS.WHITEDEST || gameState == GS.BLACKDEST) && pieceInHand.valid(arr[0],arr[1],arr[2], board))
	{
		board[pieceInHand.d][pieceInHand.x][pieceInHand.y] = null;
		pieceInHand.move(arr[0],arr[1],arr[2], board);
		board[arr[0]][arr[1]][arr[2]] = pieceInHand;
		if (gameState == GS.WHITEDEST) gameState = GS.BLACKSEL;
		if (gameState == GS.BLACKDEST) gameState = GS.WHITESEL;
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
		case GS.NOGAME:
			gameState = GS.WHITESEL;
			advance = true;
			break;
		case GS.WHITESEL:
			clickable = false;
			if (whiteType > 0)
			{
				AIthink(COL.WHITE, whiteType);
				gameState = GS.BLACKSEL;
				advance = true;
			}
			clickable = true;
			break;
		case GS.BLACKSEL:
			clickable = false;
			if (blackType > 0)
			{
				AIthink(COL.BLACK, blackType);
				gameState = GS.WHITESEL;
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
	if (gameState == GS.BLACKSEL && findKing(COL.BLACK, board) == null)
	{
		gameState = GS.WHITEWINS;
		gameStateProcess();
	}
	if (gameState == GS.WHITESEL && findKing(COL.WHITE, board) == null)
	{
		gameState = GS.BLACKWINS;
		gameStateProcess();
	}
}

//This code, most of which concerns checkmating, never came close to working
/*function checkGameOver()
{
	if (gameState == GS.WHITESEL && inCheck(whiteKing.d, whiteKing.x, whiteKing.y, COL.WHITE, board) 
		&& inCheckMate(COL.WHITE, board))
	{
		gameState = GS.BLACKWINS;
	}
	if (gameState == GS.BLACKSEL && inCheck(blackKing.d, blackKing.x, blackKing.y, COL.BLACK, board) 
		&& inCheckMate(COL.BLACK, board))
	{
		gameState = GS.WHITEWINS;
	}
}

function inCheck(d, x, y, def, brd)
{
	var opp = getAllPieces(!def, brd);
	var i;
	for (i = 0; i < opp.length; i++)
		if (opp[i].valid(d, x, y, brd))
			return true;
	return false;
}

function inCheckMate(def, brd)
{
	console.log("i am in here");
	var mat = getAllPieces(def);
	var moves = new Array();
	var i, j;
	for (i = 0; i < mat.length; i++)
	{
		moves.push(mat[i].getValid(brd));
	}
	for (i = 0; i < mat.length; i++)
		for (j = 0; j < moves[i].length; j += 3)
		{
			var tbrd = brdSim(mat[i].d, mat[i].x, mat[i].y, moves[i][j], moves[i][j+1], moves[i][j+2], brd);
			var tkng = findKing(def, tbrd);
			if (inCheck(tkng.d, tkng.x, tkng.y, def, tbrd))
				return true;
		}
	return false;
}

function brdSim(oldd, oldx, oldy, newd, newx, newy, brd)
{
	var i, j, l = 0;
	var out = new Array();
	for (i = 0; i < 5; i++)
	{
		out[i] = new Array();
		for (j = 0; j < 5; j++)
		{
			out[i][j] = new Array();
		}
	}
	
	for (i = 0; i < 5; i++)
		for (j = 0; j < 5; j++)
			for (l = 0; l < 5; l++)
				if (brd[i][j][l] != null)
					out[i][j][l] = brd[i][j][l].deepCopy();
				else out[i][j][l] = null;
	out[newd][newx][newy] = out[oldd][oldx][oldy];
	out[oldd][oldx][oldy].move(newd, newx, newy);
	out[oldd][oldx][oldy] = null;
	return out;
}

function getAllPieces(col, brd)
{
	var out = new Array();
	var i, j, l = 0;
	for (i = 0; i < 5; i++)
		for (j = 0; j < 5; j++)
			for (l = 0; l < 5; l++)
				if (brd[i][j][l] != null && brd[i][j][l].color == col)
					out.push(brd[i][j][l]);
	return out;
}*/

function findKing(col, brd)
{
	var i, j, l;
	for (i = 0; i < 5; i++)
		for (j = 0; j < 5; j++)
			for (l = 0; l < 5; l++)
				if (brd[i][j][l] != null  && brd[i][j][l].color == col && brd[i][j][l].name === "King")
					return brd[i][j][l];
	return null;
}







