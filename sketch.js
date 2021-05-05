const Render = Matter.Render;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var score = 0;
var gameState = 0;
var pipeG,pipe2G

var background,backgrounImg;

var pipeImg1,pipeImg2

var bird1;

var birdImg;

var pipe,pipe2;

var gameover,gameoverImg

var point1;

var invis;

var hit;

function preload(){
  backgroundImg = loadImage("sprites/background.png");

  pipeImg1 = loadImage("sprites/pipe1.png");
  pipeImg2 = loadImage("sprites/pipe2.png");

  birdImg = loadImage("sprites/bird1.png");

  gameoverImg = loadImage("sprites/gameover.png");

  point1 = loadSound("sounds/point.mp3");
}

function setup() {
  createCanvas(800,600);
 
  engine = Engine.create();
	world = engine.world;

  bird = new Bird(200,250,70,70);
  bird.scale = 2

  bird1 = createSprite(bird.body.position.x,bird.body.position.y);
  bird1.addImage(birdImg);
  bird1.scale = 0.1
  bird1.setCollider("circle",bird.body.position.x-300,bird.body.position.y-320,250)

  gameover = createSprite(400,230);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5
  gameover.visible = false;

  pipeG = new Group();
  pipe2G = new Group();

   //var render = Render.create({ element: document.body, engine: engine, options: { width: 1000, height: 700, wireframes: false } }); Render.run(render);

  Engine.run(engine)
}

function draw() {
  background(backgroundImg);  
  
  bird1.x = bird.body.position.x
  bird1.y = bird.body.position.y

  pipes();
  pipes2();

  if(bird1.y > 530 || bird1.y < 29){
     gameState = 2
  }

  if(frameCount%35 === 0 && gameState === 1){
     score = score+1
     //point1.play();
  }

  if(pipeG.isTouching(bird1)){
    gameState = 2;
  }

  if(pipe2G.isTouching(bird1)){
    gameState = 2;
  }

  if(keyDown("space") && gameState === 0 || 1){
    Matter.Body.setStatic(bird.body,false);
  }

  if(gameState === 1){
     k();
  }

  if(gameState === 2){
    reset()
  }

  if(gameState === 0){
    fill("yellow");
    textFont("Bahnschrift SemiBold");
    textSize(30);
    text("FLAPPY BIRD GAME",260,250);
    textSize(20);
    text("Press space to fly",310,280);

    k();

    bird.body.position.y = 250
    Matter.Body.setStatic(bird.body,true);
  }

  if(gameState === 2){
    pipe2G.setVelocityXEach(0);
    pipeG.setVelocityXEach(0);

    fill("white");
    textSize(30)
    text("Press R to play again",250,310);

    gameover.visible = true

    Matter.Body.setStatic(bird.body,true);
  }
  
  console.log(gameState)

  fill("white");
  textSize(50);  
  textFont("Arial Black");

  bird.display();

  drawSprites();

  text(score,displayWidth/4,70);
}

function pipes(){
   if(gameState === 1){
if(frameCount%65 === 0){
   var pipe = createSprite(displayWidth/2+100,475,100,random(200,370));
   pipe.velocityX = -4; 
   pipeG.add(pipe);
   pipeG.lifetime = 500
   pipe.addImage(pipeImg1);
   pipe.scale = 0.5
 } 
}
}

function pipes2(){
   if(gameState === 1){
  if(frameCount%65 === 0){
     var pipe2 = createSprite(displayWidth/2+100,73,100,random(200,370));
     pipe2.velocityX = -4;
     //pipe2.addImage(pipeImg2);
     pipe2G.add(pipe2);
     pipe2G.lifetime = 500          
     pipe2G.scale = 0.5;   
     image(pipeImg2,pipe2.x,pipe2.y,100,200);                     
  }
  }
}

function k(){
  if(gameState === 0 || 1){
  if(keyDown("space")){
       bird.body.position.y = bird.body.position.y - 1                    
       gameState = 1   
  }    
}                
  }

  function reset(){
    if(keyDown("R")){
      gameState = 0
      gameover.visible = false;
      pipeG.destroyEach()
      pipe2G.destroyEach()
      score = 0
   }
  }