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
	
	getValid()
	{
		var i, j, k, t= 0;
		var out = [];
		for (i = 0; i < 5; i++)
			for (j = 0; j < 5; j++)
				for (k = 0; k < 5; k++)
				{
					out[t] = i;
					out[t + 1] = j;
					out[t + 2] = k;
					t += 3; 
				}
		return out;
	}
	
	move(d, x, y)
	{
		if (!this.valid(d, x, y)) return;
		this.d = d;
		this.x = x;
		this.y = y;
	}
	
	valid(d, x, y)
	{
		var a = this.getValid();
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
}