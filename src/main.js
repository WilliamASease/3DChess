import godPiece from "./pieces/godPiece.js";
var canv = document.getElementById("canvas");
var paint = canv.getContext("2d");
paint.font = "60px Gothic";
paint.fillText("Raumschach 3D Chess", 10, 50);
paint.font = "30px Gothic";
paint.fillText("Ferdinand Maack 1907 / William Sease 2020", 10, 90);
var bSize = 160;
var sqSize = bSize / 5;
simpleBoards(10, 130);

let gp = new godPiece(1, 0, 0, 0);
paintValid(gp.getValid());
plotPiece(gp);
gp.move(1,2,1);
plotPiece(gp);


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

function paintValid(x)
{
	var i = 0;
	paint.fillStyle = "green";
	for (i = 0; i < x.length; i += 3)
	{
		plot(x[i],x[i + 1],x[i + 2], sqSize / 4, 0, 0);
	}
	paint.fillStyle = "black";
}

function plot(d, x, y, size, xoff, yoff)
{
	paint.fillRect(xoff + 10 + d * 180 + x * sqSize, 
				   yoff + 130+ d * 150 + y * sqSize, 
					   size, size);
}

function plotPiece(x)
{
	paint.font = "20px Gothic";
	if(x.color == 1) paint.fillStyle = "white";
	else paint.fillStyle = "grey"
	plot(x.d, x.x, x.y, sqSize/2, sqSize/4, sqSize/4);
	paint.fillStyle = "black";
	paint.fillText(x.name.charAt(0),
			       19 + x.d * 180 + x.x * sqSize, 
				   151+ x.d * 150 + x.y * sqSize);
}

function initBoard()
{
	
}