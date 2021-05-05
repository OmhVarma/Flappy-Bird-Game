class Bird{
  constructor(x,y,r){

   var options = {
       isStatic:false
   }

   this.image = loadImage("sprites/bird1.png");
   this.x = 200;
   this.y = displayHeight/2;
   this.r = 25;
   this.body = Bodies.circle(x,y,r,options);
   World.add(world,this.body);

  }

  display(){

   var pos = this.body.position;

   imageMode(CENTER);
   image(this.image,pos.x,pos.y,120,100);
  }

}