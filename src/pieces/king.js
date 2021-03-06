export default class king
{
	constructor(color, d, x, y) 
	{
		this.color = color;
		this.d = d;
		this.x = x;
		this.y = y;
		this.pts = 1000;
		this.name = "King";
	}
	
	getValid(board)
	{
		var out = [];
		return out;
	}
	
	move(d, x, y)
	{
		if (!this.valid(d, x, y)) return;
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
		return new king(this.color, this.d, this.x, this.y);
	}
}