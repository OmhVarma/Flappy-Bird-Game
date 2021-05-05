class Pipe{
    constructor(x,y,width,height,options){
        
     var options = {
         isStatic:true,
     }

     this.x = x;
     this.y = y;
     this.width = width;
     this.height = height;
     this.image = loadImage("sprites/pipe1.png");
     this.body = Bodies.rectangle(x,y,width,height,options);
    }
    display(){
    var pos = this.body.position

    imageMode(CENTER);
    image(this.image,pos.x,pos.y,this.width,this.height)
    }
}