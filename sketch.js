var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life = 3;
var score=0;
var gameState=1;



function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg);
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg);
  gun.scale=0.2;
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   

  heading=createElement("h1");
  scoreBoard=createElement("h1");
  lifeBoard=createElement("h1");
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreBoard.html("Score"+score);
  scoreBoard.style('color:red');
  scoreBoard.position(width-200,20)

  lifeBoard.html("Life"+life);
  lifeBoard.style('color:red');
  lifeBoard.position(200,20);

  if(gameState===1){
    gun.y=mouseY;  

    if(keyWentDown("space")){
      shootBullets();
    }

    if(frameCount%80===0){
      drawBlueBubble();
    }

    if(frameCount%100===0){
      drawRedBubble();
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);

    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
    }


    drawSprites();
  }
     
}

function shootBullets(){
  var bullet=createSprite(100, height/2, 50,50);
  bullet.y=gun.y;
  bullet.velocityX=10;
  bullet.addImage("bullet",bulletImg);
  bullet.scale=0.2 ;
  bullet.lifetime=200;
  bulletGroup.add(bullet);
}

function drawBlueBubble(){
  var blueBubble=createSprite(800,random(20,780),40,40);
  blueBubble.velocityX=-8;
  blueBubble.addImage("blueBubble",blueBubbleImg);
  blueBubble.scale=0.1;
  blueBubble.lifetime=400;
  blueBubbleGroup.add(blueBubble);
}


function drawRedBubble(){
  var redBubble=createSprite(800,random(40,790),40,40);
  redBubble.velocityX=-8;
  redBubble.addImage("redBubble",redBubbleImg);
  redBubble.scale=0.1;
  redBubble.lifetime=400;
  redBubbleGroup.add(redBubble);
}

function handleBubbleCollision(bubbleGroup){
  if(life > 0){
    score=score+1;
  }

    var blast=createSprite(bubbleGroup.x,bubbleGroup.y,20,20);
    blast.addImage("blast",blastImg);
    blast.scale=0.5;

    blast.lifetime=20;
    
  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function handleGameOver(bubbleGroup){
    life-=1;
    bubbleGroup.destroyEach();

    if(life===0){
      gameState=2;

      swal({
       title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"  
      }); 
    }
  }
