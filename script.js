window.onload = init;

var isPlaying = false;

//Size
var gameWidth = 1000;
var gameHeight = 500;

//Canvases
var fieldCanvas;
var stickCanvas;
var ballCanvas;

//Contexts
var fieldCtx;
var stickCtx;
var ballCtx;

//Images
var ballImage = new Image;
ballImage.src = "images/ball.png";

var stickImage = new Image;
stickImage.src = "images/stick.png";

//Objects
var ball;
var stick;

//Score
var score = 0;

var requestAnimFrame = window.requestAnimFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init(){
    fieldCanvas = document.getElementById("field");
    fieldCanvas.width  = gameWidth;
    fieldCanvas.height = gameHeight;
    fieldCtx = fieldCanvas.getContext("2d");

    fieldCtx.fillStyle = "rgb(220, 220, 220)";
    fieldCtx.fillRect(0, 0, gameWidth, gameHeight);

    stickCanvas = document.getElementById("stick");
    stickCanvas.width = gameWidth;
    stickCanvas.height = gameHeight;
    stickCtx = stickCanvas.getContext("2d");

    ballCanvas = document.getElementById("ball");
    ballCanvas.width = gameWidth;
    ballCanvas.height = gameHeight;
    ballCtx = ballCanvas.getContext("2d");

    document.addEventListener("keydown", keyPressed, false);
    document.addEventListener("keyup", keyUp, false);

    ball = new Ball();
    stick = new Stick();

    startLoop();
}

function startLoop(){
    isPlaying = true;
    setInterval(loop, 10);
}

function loop(){
    if(isPlaying){
        draw();
        update();
    }
}

function keyPressed(e){
    var keyId = e.keyCode || e.which;
    if(keyId == 37){
        stick.isLeft = true;
        e.preventDefault();
    }
    if(keyId == 39){
        stick.isRight = true;
        e.preventDefault();
    }
}

function keyUp(e){
    var keyId = e.keyCode || e.which;
    if(keyId == 37){
        stick.isLeft = false;
        e.preventDefault();
    }
    if(keyId == 39){
        stick.isRight = false;
        e.preventDefault();
    }
}

function draw(){
    ball.draw();
    stick.draw();
}

function update(){
    ball.update();
    stick.update();
}

function updateScore(){
    document.getElementById("score").innerHTML = "<h1> Your score is: " + score + "</h1>";
}

function Ball(){
    this.drawX = 70;
    this.drawY = 50;
    this.width = 70;
    this.height = 50;
    this.image = ballImage;

    this.speed = 5;
    this.xDirection = 1;
    this.yDirection = 1;
}

Ball.prototype.draw = function(){
    ballCtx.clearRect(0, 0, gameWidth, gameHeight);
    ballCtx.drawImage(this.image, 0, 0, 256, 256, this.drawX, this.drawY, this.width, this.height);
};

Ball.prototype.update = function(){
    if(this.drawX > gameWidth-this.width/2){
        this.xDirection = -this.xDirection;
    }
    if(this.drawX < -this.width/2){
        this.xDirection = -this.xDirection;
    }
    if(this.drawY > gameHeight-this.height/2){
        this.yDirection = -this.yDirection;
    }
    if(this.drawY < -this.width/2){
        this.yDirection = -this.yDirection;
    }

    if(((this.drawY + this.width/2) == stick.bottomBallBorder)&&
        (this.drawX + this.width > stick.drawX)&&
        (this.drawX < stick.drawX + stick.width)){
        this.yDirection = -this.yDirection;
        score++;
        updateScore();
    }

    if(this.drawY + this.width/2 > stick.bottomBallBorder){
        score = 0;
        isPlaying = false;
        alert("You lose!");
    }

    this.drawX += this.xDirection * this.speed;
    this.drawY += this.yDirection * this.speed;
};

function Stick(){
    this.drawX = gameWidth/2;
    this.drawY = Math.floor(gameHeight*0.85);
    this.width = 200;
    this.height = 30;
    this.image = stickImage;

    this.speed = 15;

    this.isLeft = false;
    this.isRight = false;

    this.bottomBallBorder = this.drawY - this.height/2;
}

Stick.prototype.draw = function(){
    stickCtx.clearRect(0, 0, gameWidth, gameHeight);
    stickCtx.drawImage(this.image, 0, 0, 512, 256, this.drawX, this.drawY, this.width, this.height);
};

Stick.prototype.update = function(){
    if(this.isLeft){
        this.drawX -= this.speed;
    }
    if(this.isRight){
        this.drawX += this.speed;
    }
};
