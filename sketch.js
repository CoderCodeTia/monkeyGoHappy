var PLAY = 1
var END = 0;
var GameState = PLAY;
var monkey , monkey_running,monkeyImg
var ground, ground2, ground3
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyImg=loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,200) 

  ground = createSprite(200,180,1000,10);
  ground.shapeColor=color("green")

  
  ground2 = createSprite(250,192,1000,15);
  ground2.shapeColor=color(160,82,45);
  
  monkey = createSprite(150,146,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.11;

   
  FoodGroup= new Group();
  obstacleGroup = new Group();
  
  score=0;
}


function draw() {
background("lightblue")
  text("Survival Time: "+ score, 10,20);
  
  if (GameState===PLAY){
 score = score + Math.round(frameCount/60); 
  
   if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -13;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground2)
    
    if(monkey.isTouching(obstacleGroup)){
      GameState=END
    }
  }
  
  if(GameState===END){
    score=0;
    FoodGroup.velocityX=0;
    obstacleGroup.velocityX=0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.collide(ground2)
    monkey.addImage(monkeyImg)
   
  }
  
  spawnFood();
  spawnRock();
  
  drawSprites();
}

function spawnFood(){
  if (frameCount % 60 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(10,100));
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -3;    
    banana.lifetime = 134;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnRock(){
  if (frameCount % 100 === 0){
    obstacle=createSprite(400,165,10,40)
    obstacle.y = Math.round(random(155,160));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle)
    
  }
}
