//i'm not sure how to make the ball bounce off the wedges 
// and how to make the divider go behind the wedges
// and line 145 to 148 is not working
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ball;
var balL, balLImg;

var paddle1;
var paddle2;

var ground;
var roof;
var divider;

var wedge1;
var wedge2;

var angle1 = 60;
var angle2 = 60;

var player1Score=0
var player2Score=0


function preload()
{
  balLImg = loadImage("melon.png")
}


function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  var ballOptions={
    restitution:1,
    frictionAir:0.01
  }
  var groundOptions={
    isStatic:true,
    restitution:2
  }

 
  wedge1 = Bodies.rectangle(windowWidth/2,150,100,10,groundOptions)
  World.add(world,wedge1)
  wedge2 = Bodies.rectangle(windowWidth/2,450,100,10,groundOptions)
  World.add(world,wedge2)


  paddle1 = createSprite(10,windowHeight/2,10,100)
  paddle1.shapeColor = "red"
  paddle2 = createSprite(windowWidth-10,windowHeight/2,10,100)
  paddle2.shapeColor = "orange"

  balL = createSprite(windowWidth/2,windowHeight/2,10,10)
  balL.addImage("pingPongBall", balLImg)
  balL.scale = 0.05

  ground = createSprite(windowWidth/2,windowHeight,windowWidth,10)
  ground.shapeColor="yellow"

  roof = createSprite(windowWidth/2,0,windowWidth,10)
  roof.shapeColor="yellow"

  divider = createSprite(windowWidth/2,windowHeight/2,2,windowHeight)
  divider.shapeColor="yellow"

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}



function draw() 
{
  background(51);
  textSize(20)
 
  imageMode(CENTER)

 //console.log(windowWidth)

  text(player1Score, windowWidth/2-100,30)
  text(player2Score, windowWidth/2+100,30)
 
    if(keyDown("DOWN_ARROW")){
      paddle2.y = paddle2.y+5
    }
  
    if(keyDown("UP_ARROW")){
      paddle2.y = paddle2.y-5
    }

    if(keyDown("W")){
      paddle1.y = paddle1.y-5
    }

    if(keyDown("S")){
      paddle1.y = paddle1.y+5
    }


    
   if(keyDown("SPACE")){
    balL.velocityX = 5
    balL.velocityY = 5
   }

   if(balL.x>windowWidth){
     player1Score = player1Score+1
     reset()
   }
   else if(balL.x<0){
     player2Score = player2Score+1
     reset()
   }

   //if(balL.isTouching(wedge1)||balL.isTouching(wedge2)){
     //balL.velocityX = balL.velocityX+1
    // balL.velocityY = balL.velocityY+1
  // }


   balL.bounceOff(paddle1)
   balL.bounceOff(paddle2)
   balL.bounceOff(ground)
   balL.bounceOff(roof)
  


 
  Engine.update(engine);
  Matter.Body.rotate(wedge1,angle1)
  push()
  fill("green")
  translate(wedge1.position.x,wedge1.position.y)
  rotate(angle1)
  rect(0,0,100,10)
  pop()
  angle1 = angle1+20
  
  Matter.Body.rotate(wedge2,angle2)
  push()
  fill("blue")
  translate(wedge2.position.x,wedge2.position.y)
  rotate(angle2)
  rect(0,0,100,10)
  pop()
  angle2 = angle2+20




  drawSprites()
  divider.depth = balL.depth
  balL.depth = balL.depth+1

}

function reset(){
  balL.x = windowWidth/2
  balL.y = windowHeight/2
  balL.velocityX=0
  balL.velocityY=0
}

/*const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ball;
var balL, balLImg;

var paddle1;
var paddle2;

var ground;
var roof;

var wedge1;
var wedge2;

var angle1 = 60;
var angle2 = 60;

var player1Score=0
var player2Score=0


function preload()
{
  balLImg = loadImage("melon.png")
}


function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  var ballOptions={
    restitution:1,
    frictionAir:0.01
  }
  var groundOptions={
    isStatic:true,
    restitution:2
  }

  ground = Bodies.rectangle(windowWidth/2,windowHeight,1280,1,groundOptions)
  World.add(world,ground)
  roof = Bodies.rectangle(windowWidth/2,0,1280,1,groundOptions)
  World.add(world,roof)
  wedge1 = Bodies.rectangle(windowWidth/2,150,100,10,groundOptions)
  World.add(world,wedge1)
  wedge2 = Bodies.rectangle(windowWidth/2,450,100,10,groundOptions)
  World.add(world,wedge2)


  paddle1 = createSprite(10,windowHeight/2,10,100)
  paddle1.shapeColor = "red"
  paddle2 = createSprite(windowWidth-10,windowHeight/2,10,100)
  paddle2.shapeColor = "orange"

  balL = createSprite(windowWidth/2,windowHeight/2,10,10)
  balL.addImage("pingPongBall", balLImg)
  balL.scale = 0.05

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}



function draw() 
{
  background(51);
  textSize(20)
 
  imageMode(CENTER)

 console.log(windowWidth)

  text(player1Score, windowWidth/2-100,30)
  text(player2Score, windowWidth/2+100,30)
 
    if(keyDown("DOWN_ARROW")){
      paddle2.y = paddle2.y+5
    }
  
    if(keyDown("UP_ARROW")){
      paddle2.y = paddle2.y-5
    }

    if(keyDown("W")){
      paddle1.y = paddle1.y-5
    }

    if(keyDown("S")){
      paddle1.y = paddle1.y+5
    }


    
   if(keyDown("SPACE")){
    balL.velocityX = 5
    balL.velocityY = 5
   }

   if(balL.x>windowWidth){
     player1Score = player1Score+1
     reset()
   }
   else if(balL.x<0){
     player2Score = player2Score+1
     reset()
   }


   balL.bounceOff(paddle1)
   balL.bounceOff(paddle2)
  


 
  Engine.update(engine);
  Matter.Body.rotate(wedge1,angle1)
  push()
  fill("green")
  translate(wedge1.position.x,wedge1.position.y)
  rotate(angle1)
  rect(0,0,100,10)
  pop()
  angle1 = angle1+20
  
  Matter.Body.rotate(wedge2,angle2)
  push()
  fill("blue")
  translate(wedge2.position.x,wedge2.position.y)
  rotate(angle2)
  rect(0,0,100,10)
  pop()
  angle2 = angle2+20

  fill("yellow")
  rect(ground.position.x,ground.position.y,1280,10)

  rect(roof.position.x,roof.position.y,1280,10)
 



  drawSprites()

}

function reset(){
  balL.x = windowWidth/2
  balL.y = windowHeight/2
  balL.velocityX=0
  balL.velocityY=0
}*/