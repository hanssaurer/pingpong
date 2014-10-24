// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     ||  
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
} )();

window.onload = init;
window.onresize = resize;

var canvas;
var playRect;
var divleft;
var divtop;
var ctx; 	//canvas context
var playDiv;
var ball = {};
var paddles = [2];
var mouse = {};
var points = 0;
var clicksound;

// Start Button object
startBtn = {
	w: 100,
	h: 50,
    startText: "Start",
	
	draw: function() {
	
this.x = playRect.width/2 - 50,
this.y = playRect.height/2 - 25,

	ctx.strokeStyle = "white";
		ctx.lineWidth = "2";
		ctx.strokeRect(this.x, this.y, this.w, this.h);
//this.startText = "playRect.width:"+playRect.width.toString()+" playRect.height:"+playRect.height.toString()+"Target:"+e.target;		
		ctx.font = "18px Arial, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "yellow";
		ctx.fillText(this.startText, this.x + this.w/2, this.y + this.h/2 );
	}
};

function init() {

clicksound = document.getElementById("sound");

canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", trackPosition, true);
canvas.addEventListener("mousedown", btnClick, true);

ctx = canvas.getContext("2d"); // Create canvas context

playDiv = document.getElementById("playground");
playRect = playDiv.getBoundingClientRect();
//divtop = playDiv.offsetTop;   top und left können sich durch andere Programme ändern width und height nicht
//divleft = playDiv.offsetLeft;
canvas.width = playRect.width; 
canvas.height = playRect.height;
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, playRect.width, playRect.height);	

startBtn.x = playRect.width/2 - 50,
startBtn.y = playRect.height/2 - 25,

startBtn.draw();

paddles.push(new sidePaddle("left")); 
paddles.push(new sidePaddle("right"));

}

function resize(e) {

//alert(playDiv.clientHeight);
playRect = playDiv.getBoundingClientRect();
canvas.width = playRect.width; 
paddles[2].x = playRect.width - paddles[2].w
canvas.height = playRect.height-6;				//????????? Woher kommt 6?
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, playRect.width, playRect.height);	
//playRect = canvas.getBoundingClientRect();
divtop = playDiv.offsetTop
divleft = playDiv.offsetLeft;

//startBtn.startText = "playRect.width:"+playRect.width.toString()+" playRect.height:"+playRect.height.toString()+"timeStamp:"+e.timeStamp;		
startBtn.startText = "divtop:"+divtop.toString();		
startBtn.x = playRect.width/2 - 50,
startBtn.y = playRect.height/2 - 25,

startBtn.draw();
}

function btnClick(e) {

	// Click start button
	if(e.offsetX >= startBtn.x && e.offsetX <= startBtn.x + startBtn.w) {
		ball.x = 20;
		ball.y = 20;
		points = 0;
		ball.vx = 4;
		ball.vy = 8;

		divtop = playDiv.offsetTop
		divleft = playDiv.offsetLeft;

		animloop();
	}
}

 ball = { x: 50, y: 50, r: 15, c: "yellow", vx: 3, vy: 3,
// Function for drawing ball on canvas
draw: function() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
    ctx.fill();
	update();
    }
};

// Function to paint canvas 
function paintCanvas() {
    ctx.fillStyle = "blue"; 
	ctx.fillRect(0, 0, playRect.width, playRect.height); 
}

function draw() {
	paintCanvas();
	for(var i = 0; i < paddles.length; i++) {
		p = paddles[i];
		
		ctx.fillStyle = "red";
		ctx.fillRect(p.x, p.y, p.w, p.h);
	}
	
	ball.draw();
}


function trackPosition(e) {
    mouse.x = e.pageX - divleft;
	mouse.y = e.pageY - divtop; 
	
// ctx.fillStyle = "blue";
// ctx.fillRect(0, 0, playRect.width, playRect.height);	
	
// startBtn.startText = "PageY:"+e.pageY+" playRect.top:"+ divtop;		
// startBtn.x = playRect.width/2 - 50,
// startBtn.y = playRect.height/2 - 25,

// startBtn.draw();

}
	

function sidePaddle(pos) { 
    // Height and width 
    this.h = 150; 
	this.w = 5;
    // Paddle's position
    this.y = playRect.height/2 - this.h/2;
    if (pos == "left") {
	    this.x = 0 ;
	}
    else {
    	this.x = playRect.width - this.w;
	}
}

// Function for running the whole animation
function animloop() {
	init = requestAnimFrame(animloop);
	draw();
}

function update() { 
    // Move the ball 
    ball.x = ball.x + ball.vx; 
    ball.y = ball.y + ball.vy; 
	
	// Move the paddles on mouse move
	if(mouse.x && mouse.y) {
		for(var i = 1; i < paddles.length; i++) {
			p = paddles[i];
			p.y = mouse.y - p.h/2;
		}		
	}

	//Check for collission with paddles
	if (horizontalCollide(paddles[1]) || horizontalCollide(paddles[2])) {
		collideAction();
	} 
	else{
		// Collide with walls
		// if gap < paddles.width -> over!
		if(ball.x + ball.r > playRect.width - paddles[2].w) {
			ball.x = playRect.width - ball.r;
			gameOver();
		} 
		
		else if(ball.x - ball.r < paddles[1].w) {
			ball.x = ball.r;
			gameOver();
		}
	
	//  Version for bouncing from top and bottom	
		if(ball.y + ball.r > playRect.height) {
			ball.vy = -ball.vy;
			ball.y = playRect.height - ball.r;
		}
		else if(ball.y -ball.r < 0) {
			ball.vy = -ball.vy;
			ball.y = ball.r;
		}
	}
}


//Do this when collides == true
function collideAction() {
	
	ball.vx = -ball.vx;
	points++;
	increaseSpd();
	clicksound.play;
	
}

// Function to increase speed after every 4 points
function increaseSpd() {
	if(points % 4 == 0) {
		if(Math.abs(ball.vx) < 15) {
			ball.vx += (ball.vx < 0) ? -1 : 1;
			ball.vy += (ball.vy < 0) ? -1 : 1;
		}
	}
}


//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
	if(b.x + b.r >= p.x && b.x - b.r <=p.x + p.w) {
		if(b.y +b.r>= (p.y - p.h) && p.y > 0){
			paddleHit = 1;
			return true;
		}
		
		else if(b.y <= p.h && p.y == 0) {
			paddleHit = 2;
			return true;
		}
		
		else return false;
	}
}


function horizontalCollide(Paddle) {

	//Horizontalen Korridor testen - für beide Seiten gleich
	if (ball.y + ball.r >= Paddle.y && ball.y - ball.r < Paddle.y + Paddle.h) {
	    //left Paddle
		if (Paddle.x == 0) {
		  return ball.x - ball.r <= Paddle.w
		}
		// right Padlle
		else {
		  return ball.x + ball.r >= Paddle.x
        }
	}
}


// Function to run when the game overs
function gameOver() {
	ctx.fillStlye = "white";
	ctx.font = "20px Arial, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Vorbei - Du hast "+points+" Punkte!", playRect.width/2, 25 );
	
	// Stop the Animation
	cancelRequestAnimFrame(init);
	
	// Show the Start button agein
	startBtn.startText = "Noch mal";
	startBtn.draw();
}
