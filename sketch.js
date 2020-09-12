PLAY = 1;
END = 0;
gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage;
var obstacle , obstacleImage;
var FoodGroup, obstacleGroup
var invisibleGround;
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600, 600);
  
monkey = createSprite(50, 180, 20 , 50);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.1;

  
 
  
  
  ground = createSprite(370, 200 , 600, 10);
  ground.visible = true;
  
  
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  
}


function draw() {
  
background("white");
  
  if (gameState === PLAY) { 
  stroke("black");
  textSize(20);
  fill("black");
  
  text("SURVIVAL TIME :" + survivalTime , 100, 50);
  
  
  if (bananaGroup.isTouching(monkey)){
   survivalTime = Math.ceil(frameCount/frameRate());
 }
  
if (keyDown("space") && monkey.y <= 370) {
 monkey.velocityY = -18; 
  
}
  
 monkey.velocityY = monkey.velocityY +0.8;
  
  monkey.collide(ground);
  
  
    ground.velocityX = -4;
  ground.x = ground.width/2;
  
  }
  
  
  if (monkey.isTouching(obstaclesGroup)) {
    monkey.velocityX = 0;
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    monkey.changeAnimation("sprite_0.png");
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  
 spawnBanana();
  
  spawnObstacles();
  
drawSprites();
  
}

function spawnObstacles(){
  
  if (frameCount % 60 === 0 ){
    obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;
    
    var rand = Math.round(random(1,6));
    obstacle.addImage("image" , obstacleImage);
    obstacle.scale = 0.2;
  
  obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana (){
  if (frameCount % 60 === 0 ){
    banana = createSprite(600, 100 , 40, 10);
    banana.y = Math.round(random(10,60));
    banana.addImage("image" , bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 190;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    
    bananaGroup.add(banana);
  }
}



