var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_jumping;
var invisible_ground;
var bg, bgImage;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;

var survival_time, score;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  monkey_jumping = loadImage("monkey_3.png");

  bgImage = loadImage("background.jpg");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);

  bg = createSprite(width/2, height/2, width, height);
  bg.addImage(bgImage);
  bg.scale = 1.1;
  bg.x=bg.width/2;
  bg.velocityX=-0.05;

  monkey = createSprite(40, 365)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;

  invisible_ground = createSprite(250, 405, 1000000, 0)
  invisible_ground.scale = 0.35;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  survival_time = 0;
  score = 0;
}


function draw() {
  background("lightblue");
  
  if(gameState === PLAY){
    monkey.velocityX = 3;
    
    if(bg.x<200){
      bg.x=bg.width/2;
    }

    camera.position.x = monkey.x + 150;
    camera.position.y = height/2;


    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 1
    }

    if(keyDown("space") && monkey.y > 364){
      monkey.velocityY = monkey.velocityY - 15;
    }
    
    if(monkey.y > 364){
      monkey.addImage("jumping", monkey_jumping)
    }
    
    //console.log(monkey.y)
    //console.log(getFrameRate())
    
    monkey.velocityY = monkey.velocityY + 0.6;
    
    bananas();
    obstacles();
  }
  
  invisible_ground.visible = false;
  
  monkey.collide(invisible_ground);
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    monkey.destroy();
    bg.destroy()
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(60);
    textFont("Algerian");
    textAlign(CENTER);
    fill("black");
    text("GAME OVER", monkey.x + 150, 200);
    
    survival_time = 0;
    score = 0;
  }
  
  drawSprites();

  textSize(13);
  textFont("TimesNewRoman");
  fill("black");
  text("Survival Time: " + survival_time + "s", monkey.x - 40, 35);

  survival_time = survival_time + Math.round(getFrameRate()/61);

  textSize(13);
  textFont("TimesNewRoman");
  fill("black");
  text("Score: " + score, monkey.x - 40, 20);
}

function bananas(){
 if (frameCount % 80 === 0){
   var banana = createSprite(monkey.x + 500, Math.round(random(200, 300)), 10, 40);
   banana.addImage(bananaImage);
   banana.scale = 0.1;
   banana.lifetime = -1;
   
   bananaGroup.add(banana);
  }
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(monkey.x + 500, 370, 10, 40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.lifetime = -1;
   
   obstacle.setCollider("circle",0,0,200)
   obstacle.debug = false;
   
   obstacleGroup.add(obstacle);
    }
}
