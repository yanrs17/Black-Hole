var time = 60 + 1;
var score = 0;
var gameSpeed = 33;
var numInitBlackHoles = 10;
var numObjects = 100;


var blackholeAppearFreq = 1;var shapes = new Array();
var Shape = function (x, y, xChange, yChange, obj) {
    this.x = x;
    this.y = y;
    this.xChange = xChange;
    this.yChange = yChange;
    this.obj = obj;
    this.trapped = false;
}

var blackholes = new Array();
var Blackhole = function (x, y, type) {
    this.x = x;
    this.y = y;
    // type can be blue, purple or black
    this.type = type;
    this.eaten = 0;
}

window.onload = function () {

	// Init canvas
    window.c = document.getElementById("canvas");
	window.ctx = c.getContext("2d");
    c.setAttribute("onmousedown", "mouseDown(event)");

	// Params
	var heightOfDivider = 40;
	var level = 1;
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
    addScore(200);

    // Add Pause
    ctx.font = "15px Arial";
    ctx.fillText("PAUSE", 700, 25);
    ctx.rect(690, 10, 70, 20);
    ctx.stroke();

    // Install the functionality of pause
    // ??

    // Add time left
    ctx.font = "15px Arial";
    ctx.fillText(time + " seconds", 900, 25);

    // Objects
    // Need to change to diff shape
    ctx.imgObject = new Image();
    ctx.imgObject.src = 'img/object1.png';

    ctx.imgObject.onload = function(){
      for (i = 0; i < numObjects; i++) {
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
      for (i = 0; i < numInitBlackHoles; i++) {
          drawRandomBlackhole();
      }
    }

    animate();
    //removeBlackhole();
    countDown();
}

function addScore(s) {

    score += s;
    ctx.clearRect(500, 5, 150, 30);
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 500, 25);

}

function countDown() {
    window.ctx.clearRect(900, 0, 100, 30);
    time --;
    ctx.font = "15px Arial";
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

    if (time % blackholeAppearFreq == 0) {
        drawRandomBlackhole();
    }


    setTimeout(countDown, 1000);
}

function animate() {
    // Always clear the canvas after drawing each frame
    window.ctx.clearRect(0, 40, 1000, 640);

    // Draw here, including conditionals
    moveBlackhole();
    moveObject();
    setTimeout(animate, gameSpeed);
}

//window.addEventListener('mousedown', getMousePos, false);

function getMousePos(event) {
    var rect = c.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

function isOnBlackhole(xBlackhole, yBlackhole, xSelected, ySelected) {
    return xBlackhole < xSelected &&
        xSelected < (xBlackhole + 50) &&
        yBlackhole < ySelected &&
        ySelected < (yBlackhole + 50)
}

function mouseDown(event) {

    pos = getMousePos(event);
    for (var i = 0; i < blackholes.length; i ++) {

        // If it is a blackhole
        if (isOnBlackhole(blackholes[i].x, blackholes[i].y, pos.x, pos.y)) {
            // Remove the blackhole
            blackholes.splice(i, 1);
            break;
        }
    }
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

function isInArea(xBlackhole, yBlackhole, xSelected, ySelected) {

    leftBoundary = xBlackhole - 25;
    rightBoundary = xBlackhole + 75;
    topBoundary = yBlackhole - 25;
    bottomBoundary = yBlackhole + 75;

    // // Need to delete later
    // ctx.strokeStyle = "red"; // Style
    // ctx.rect(leftBoundary, topBoundary, 100, 100); // x, y, width, height
    // ctx.stroke(); // Draw

    return xSelected > leftBoundary &&
        xSelected < rightBoundary &&
        ySelected > topBoundary &&
        ySelected < bottomBoundary
}

function moveObject() {

    var obj, newX, newY, i, j;

    for (i = 0; i < shapes.length; i ++) {
        if (shapes[i] != null) {

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

            for (j = 0; j < blackholes.length; j ++) {
                if (isInArea(blackholes[j].x, blackholes[j].y,
                        shapes[i].x, shapes[i].y) ||
                    isInArea(blackholes[j].x, blackholes[j].y,
                        shapes[i].x + 50, shapes[i].y) ||
                    isInArea(blackholes[j].x, blackholes[j].y,
                        shapes[i].x, shapes[i].y + 50) ||
                    isInArea(blackholes[j].x, blackholes[j].y,
                        shapes[i].x + 50, shapes[i].y + 50)) {
                    shapes[i].trapped = true;
                }
            }
            if (shapes[i].trapped) {

                // Suck into the center
                // if (blackholes[j].x == shapes[i].x && blackholes[j].y == shapes[i].y) {
                    shapes.splice(i, 1);
                    addScore(-50);
                    // blackholes[j].eaten += 1;
                    // console.log(backholes[j].eaten);
                // break;
                // }
            }

        }
    }
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

    var x, y, i, type, isOverlapped;

    do {
        isOverlapped = false;
        // Generate rand # btw 0-950
        x = Math.floor(Math.random() * 951);
        // Generate rand # btw 40-590
        y = Math.floor(40 + Math.random() * 551);

        // Generate rand # btw 1-14
        type = Math.floor(Math.random() * 14 + 1);
        // 1-9      for blue    blackhole
        // 10-13    for purple  blackhole
        // 14       for black   blackhole

        // Dealing with overlapping
        for (i = 0; i < blackholes.length; i ++) {

            // If overlapped
            if (isOnBlackhole(blackholes[i].x, blackholes[i].y, x, y) ||
                isOnBlackhole(blackholes[i].x,
            blackholes[i].y, x + 50, y) ||
                isOnBlackhole(blackholes[i].x,
            blackholes[i].y, x, y + 50) ||
                isOnBlackhole(blackholes[i].x,
            blackholes[i].y, x + 50, y + 50)) {
                isOverlapped = true;
            }

        }
        // If overlapped, find a new position until not overlapped
    } while (isOverlapped);


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
