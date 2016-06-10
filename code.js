var shapes = new Array();
var Shape = function (x, y, xChange, yChange, obj) {
    this.x = x;
    this.y = y;
    this.xChange = xChange;
    this.yChange = yChange;
    this.obj = obj;
}

var blackholes = new Array();
var Blackhole = function (x, y, type) {
    this.x = x;
    this.y = y;
    // type can be blue, purple or black
    this.type = type;
}
var time = 60 + 1;


// shapes.push(new Shape(300, 200));

window.onload = function () {

	// Init canvas
	window.c = document.getElementById("canvas");
	window.ctx = c.getContext("2d");

	// Params
	var heightOfDivider = 40;
	var level = 1;
	var score = 0;
	// var time = 60;
    var i;

	// Draw the line
	ctx.beginPath();
	ctx.moveTo(0, heightOfDivider);
	ctx.lineTo(1000, heightOfDivider);
	ctx.stroke();

	// Add Level
	ctx.font = "20px Arial";
    ctx.fillText("Level " + level, 10, 25); // Text, x, y

    // Add Score
    ctx.fillText("Score: " + score, 500, 25);

    // Add Pause
    ctx.font = "15px Arial";
    ctx.fillText("PAUSE", 700, 25);
    ctx.rect(690, 10, 70, 20); 
    ctx.stroke();

    // Install the functionality of pause
    // ??

    // Add time left
    ctx.fillText(time + " seconds", 900, 25);
    // 1 second (no "s")??

    // Objects
    // Need to change to diff shape
    ctx.imgObject = new Image();
    ctx.imgObject.src = 'img/object1.png';

    ctx.imgObject.onload = function(){
        for (i = 0; i < 10; i++) {
            // i < 2 needs to change to i < 10 later
            drawRandomObject(ctx.imgObject);
        }
    }

    // Blackholes
    ctx.imgBlackHole1 = new Image();
    ctx.imgBlackHole1.src = 'img/blackhole1.png';
    // ctx.imgBlackHole1.crossOrigin = 'anonymous';
    ctx.imgBlackHole2 = new Image();
    ctx.imgBlackHole2.src = 'img/blackhole2.png';
    // ctx.imgBlackHole2.crossOrigin = 'anonymous';
    ctx.imgBlackHole3 = new Image();
    ctx.imgBlackHole3.src = 'img/blackhole3.png';
    // ctx.imgBlackHole3.crossOrigin = 'anonymous';

    ctx.imgBlackHole1.onload = function(){
        for (i = 0; i < 10; i++) {
            drawRandomBlackhole();
        }
    }



    animate();

    countDown();
}

function countDown() {
    window.ctx.clearRect(900, 0, 100, 30);
    time --;
    if (time > 1) {
        ctx.fillText(time + " seconds", 900, 25);
    }
    else if (time == 1 || time == 0) {
        ctx.fillText(time + " second", 900, 25);
    } 
    // else!!
    // else {
    //     break;
    // }
    setTimeout(countDown, 1000);
}

function animate() {
    // Always clear the canvas after drawing each frame
    window.ctx.clearRect(0, 40, 1000, 640);

    // Draw here, including conditionals
    moveBlackhole();
    
    moveObject();

    setTimeout(animate, 1);
}

function moveBlackhole(){

    for (var i = 0; i < blackholes.length; i ++) {
        //console.log("haha");
        if (blackholes[i].type === 'blue') {
            ctx.drawImage(ctx.imgBlackHole1, blackholes[i].x, blackholes[i].y, 50, 50);
        }
        else if (blackholes[i].type === 'purple') {
            ctx.drawImage(ctx.imgBlackHole2, blackholes[i].x, blackholes[i].y, 50, 50);
        }
        else if (blackholes[i].type === 'black') {
            ctx.drawImage(ctx.imgBlackHole3, blackholes[i].x, blackholes[i].y, 50, 50);
        }
    }
}

function moveObject() {

    var obj;
    var newX;
    var newY;

    for (var i = 0; i < shapes.length; i ++) {
        if (shapes[i] != null) {
            // Need to adjust by angle later
            if (shapes[i].x > 1000 - 50 || shapes[i].x < 0) {
                shapes[i].xChange *= -1;
            }
            if (shapes[i].y > 640 - 50 || shapes[i].y < 50) {
                shapes[i].yChange *= -1;
            }
            newX = shapes[i].x + shapes[i].xChange;
            newY = shapes[i].y + shapes[i].yChange;
            ctx.drawImage(shapes[i].obj, newX, newY, 50, 50);
            shapes[i].x = newX;
            shapes[i].y = newY;

        }
    }
    /*while (shapes.length > 0) {
        obj = shapes.pop();
        alert(obj.x);
        ctx.drawImage(object, x, y, 50, 50);
    }*/
}

function drawRandomObject(object) {
    // Generate rand # btw 0-950
    var x = Math.floor(Math.random() * 951);
    // Generate rand # btw 40-590
    var y = Math.floor(50 + Math.random() * 551);
    //var angle = 0; // Need to be changed later
    // Generate rand # btw 1-10
    var xChange = Math.floor(Math.random() * 10 + 1);
    var yChange = Math.floor(Math.random() * 10 + 1);
    ctx.drawImage(object, x, y, 50, 50);
    shapes.push(new Shape(x, y, xChange, yChange, object));
}

function drawRandomBlackhole() {

    // Generate rand # btw 0-950
    var x = Math.floor(Math.random() * 951);
    // Generate rand # btw 40-590
    var y = Math.floor(40 + Math.random() * 551);

    // Generate rand # btw 1-14
    var type = Math.floor(Math.random() * 14 + 1);
    // 1-9      for blue    blackhole
    // 10-13    for purple  blackhole
    // 14       for black   blackhole

    // Black Holes cannot overlap with each other!!

    if (type >= 1 && type <= 9) {
        ctx.drawImage(ctx.imgBlackHole1, x, y, 50, 50);
        blackholes.push(new Blackhole(x, y, 'blue'));
    }
    else if (type >= 10 && type <= 13) {
        ctx.drawImage(ctx.imgBlackHole2, x, y, 50, 50);
        blackholes.push(new Blackhole(x, y, 'purple'));
    }
    else if (type === 14) {
        ctx.drawImage(ctx.imgBlackHole3, x, y, 50, 50);
        blackholes.push(new Blackhole(x, y, 'black'));
    }
}

function isOverlapped() {

}