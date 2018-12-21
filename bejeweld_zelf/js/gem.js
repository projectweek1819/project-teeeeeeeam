class Gem {
    constructor(x,y,color,lijndikte){
        this.lijndikte = lijndikte;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    show(){
        strokeWeight(this.lijndikte);
        fill(this.color);
        ellipse(this.x, this.y, 45, 45);
    }
    
}
