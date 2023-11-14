var player;

var score = 0;
var enemyCount = 0;
var enemyActive = 0;
var enemyMax = 10;
var enemies = [];
var enemyGroup;
var enemySystem = false;

function setup() {
  createCanvas(400,400);
  
  player = createSprite(200,200,50,50);
  
  enemyGroup = createGroup();
}

function draw() {
  background("black");
  
  playerMovement();
  
  if(enemyActive < enemyMax) {
    if(frameCount % 5 === 0) {
      generateEnemy(enemyCount);
    }
  }
  
  if(enemySystem === true) {
    for(let i = 0; i<enemyCount; i++) {
  enemies[i].attractionPoint(1,player.position.x,player.position.y)
      enemies[i].friction = 0.5;
    }
  }
  
  if(player.isTouching(enemyGroup)) {
    for(let i=0; i<enemyCount; i++) {
      if(player.isTouching(enemies[i])) {
        enemyGroup.remove(enemies[i]);
        enemies[i].destroy();
        score++;
        enemyActive--;
        console.log(score, enemyActive);
      }
    }
  }
  
  if(keyDown("o")) {
    console.log(enemies);
  }
  
  drawSprites();
}

function playerMovement() {
  if(keyDown("w")) {
    player.y -= 5;
  }
  
  if(keyDown("a")) {
    player.x -= 5;
  }
  
  if(keyDown("s")) {
    player.y += 5;
  }
  
  if(keyDown("d")) {
    player.x += 5;
  }
}

function generateEnemy(count) {
  let eCount = count;
  let eX = Math.round(random(100, 300));
  let eY = Math.round(random(100, 300));
  
  enemies.push(createSprite(eX, eY, 25, 25));
  enemyCount+=1;
  enemyActive+=1;
  
  enemyGroup.add(enemies[eCount]);
  enemySystem = true;
}