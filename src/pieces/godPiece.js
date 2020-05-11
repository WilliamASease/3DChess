export default class godPiece
{
	constructor(color, d, x, y) 
	{
		this.color = color; //White = 1 Black = 2
		this.d = d;
		this.x = x;
		this.y = y;
		this.pts = 100;
		this.name = "GodPiece";
	}
	
	getValid(board)
	{
		var i, j, l;
		var out = [];
		for (i = this.d - 1; i < this.d + 2; i++)
			for (j = this.x - 1; j < this.x + 2; j++)
				for (l = this.y - 1; l < this.y + 2; l++)
					if (i >= 0 && i < 5 && j >= 0 && j < 5 && l >= 0 && l < 5)
						if (board[i][j][l] == null || board[i][j][l].color != this.color)
							out.push(i, j, l);
		return out;
	}
	
	move(d, x, y, board)
	{
		if (!this.valid(d, x, y, board)) return;
		this.d = d;
		this.x = x;
		this.y = y;
	}
	
	valid(d, x, y, board)
	{
		var a = this.getValid(board);
		var i = 0;
		for (i = 0; i < a.length; i = i + 3)
		{
			if (a[i] == d && a[i + 1] == x && a[i + 2] == y) 
			{
				return true;
			}
		}
		return false;
	}
	
	deepCopy()
	{
		return new godPiece(this.color, this.d, this.x, this.y);
	}
}