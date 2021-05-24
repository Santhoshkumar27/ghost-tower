var towerimg,tower;
var doorimg,door;
var climber,climberimg,ghost,ghostimg;
var ground;
var gameState = "play"  

function preload(){
  
  towerimg=loadImage("tower.png");
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  ghostimg=loadImage("ghost-standing.png","ghost.jumping.png");
  spookySound = loadSound("spooky.wav");
  doorgrp=new Group();
  climbergrp=new Group();
  groundgrp=new Group();
  
  
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower= createSprite(300,300);
  tower.addImage(towerimg);
  tower.velocityY=3;
  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage(ghostimg);
  
  ground=createSprite(300,590,600,100);
  ground.visible=false;
  
  
  
  
}

function draw(){
  
  background(0);
  
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawndoor();

    
  
    if(climbergrp.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(groundgrp.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}
function spawndoor(){
  
  if (frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorimg);
   climber = createSprite(200,10);
    climber.addImage(climberimg);
    door.x=Math.round(random(120,200));
    climber.velocityY=2;
    door.velocityY=2;
    door.lifetime=800;
    climber.lifetime=800;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    doorgrp.add(door);
    climbergrp.add(climber);
    
    
  }
  
  
  
  
  
}