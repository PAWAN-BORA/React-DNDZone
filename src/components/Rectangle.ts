export default class Rectangle {
	private x:number
	private y:number
	private width:number
	private height:number

	constructor(x:number, y:number, width:number, height:number){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	contains(x:number, y:number):boolean{
		if((x>this.x && x<this.x+this.width) && (y>this.y && y<this.y+this.height)){
			return true;
		}
		return false;
	}
}
