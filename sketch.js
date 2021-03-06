
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score, survivaltime;
var ground,groundImage;
var invisible;
var invisibleGround;
var PLAY=1,END=0;
var RESTART;
var gameState=PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground2.png");
}

function setup() {
  createCanvas(500,500);
  ground = createSprite(250,450,1500,20);
  ground.addImage(groundImage);
  ground.velocityX=-6;
  ground.x = ground.width/2;

  monkey=createSprite(80,410,20,20);
   monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  invisible=createSprite(250,200,500,7);
  invisible.visible=false;
   
   score=0;
   survivaltime=0;
  
  invisibleGround=createSprite(250,460,500,20);
  invisibleGround.visible=false;
  
  bananaGroup = createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background(220);

  monkey.collide(invisibleGround);
  monkey.collide(invisible);
 
   monkey.velocityY=monkey.velocityY +0.8;
  
  if(gameState===PLAY){
    if(keyDown("space") && monkey.y>=0){
      monkey.velocityY=-6;}
  food();
  drawobstacles();
    
  if(ground.x<0){
   ground.x=ground.width/2; }
    
   if(monkey.isTouching(bananaGroup)){ 
    bananaGroup.destroyEach();
    score=score+1;}
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;}
  }
  
  if(gameState===END){
    fill("red");textSize(20);
    text("GAME OVER!!",230,250);
    monkey.x=80;
    monkey.y=420;
    monkey.velocityY=0;
    banana.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    survivaltime=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  if(gameState===RESTART){
    fill("black");
    textSize(30);
    text("YOU ARE THE WINNER!!",100,250);
    monkey.x=80;
    monkey.y=420;
    monkey.velocityY=0;
    banana.velocityX=0;
    obstacleGroup.velocityX=0;
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    survivaltime=0;
  }
  
  if(score===10){
  gameState=RESTART;}
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score:"+score,300,50);
  
   stroke("white");
  textSize(20);
  fill("red");
  survivaltime= survivaltime+Math.ceil(frameRate()/60);
  text("Survival Time:"+survivaltime,300,20);
  
  drawSprites();
}

function drawobstacles(){
  if(frameCount%300==0){
    obstacle=createSprite(480,430,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=150;
    obstacle.velocityX=-(6+score/10);
    obstacleGroup.add(obstacle);
  }}

function food(){
if(frameCount%80==0){
  banana=createSprite(480,random(300,350),20,20); 
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=150;
  banana.velocityX=-5;
  bananaGroup.add(banana);
   }
}
