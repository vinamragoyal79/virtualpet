var dog, dogImg, dogImg1;
var database;
var foodS, foodStock

function preload() {
  dogImg = loadImage("images/Dog.png")
  dogImg1 = loadImage("images/happydog.png")

}

function setup() {
  createCanvas(800, 700);
  database = firebase.database()
  dog = createSprite(250, 300, 150, 150)
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  textSize(20)
}


function draw() {
  background("green")
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  drawSprites();
  //add styles here
  fill("black")
  stroke("black")
  text("Remaining food = " + foodS, 170, 200)
  textSize(13)
  text("Note :- press up arrow to feed the dog", 130, 10, 300, 20)
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else {
    x = x - 1
  }
  database.ref('/').update({
    food: x
  })
}



