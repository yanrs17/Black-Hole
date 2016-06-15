// define some macro at beginning, easier for differet tests

var INIT_TIME = 60;
var GAME_SPEED = 30;
var NUM_INIT_BLACKHOLE = 5;
var NUM_OBJECT = 10;
var BLUE_ABSORB_SPEED = 1;
var PURPLE_ABSORB_SPEED = 4;
var BLACK_ABSORB_SPEED = 7;
var BLACKHOLE_APPEAR_FREQ = 5;

if (typeof(Storage) === "undefined")
    alert("Web Storage is not supported.");
if (localStorage.highScore1 == null)
    localStorage.highScore1 = 0;
if (localStorage.highScore2 == null)
    localStorage.highScore2 = 0;
if (localStorage.highScore3 == null)
    localStorage.highScore3 = 0;
if (localStorage.tranScore == null)
    localStorage.tranScore = 0;
var shapes = new Array();
var Shape = function (x, y, xChange, yChange, type) {
    this.x = x;
    this.y = y;
    this.xChange = xChange;
    this.yChange = yChange;
    this.trappedBy = null;
    this.obj = type;
}
var blackholes = new Array();
var Blackhole = function (x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; /* type can be blue, purple or black */
    this.eaten = 0;
}
var keepOnlyOneCountDown = 0;
window.onload = function () {

	/* Initialize canvas */
    window.c = document.getElementById("canvas");
	window.ctx = c.getContext("2d");
    window.paused = false;
    window.status = 0;
    window.time;
    window.score = 0;

    c.setAttribute("onmousedown", "mouseDown(event)");
    clearScreen();
    drawTransitionalScreen('BLACKHOLE', 'START');
}

function clearScreen() {
	ctx.clearRect(0,0,1000,640);
}

function drawTransitionalScreen(title, button) {

    ctx.clearRect(0, 0, 1000, 640);
    ctx.beginPath();
    ctx.rect(300, 150, 400, 360); // Start frame
    ctx.rect(400, 200, 200, 60); // Title
    ctx.rect(400, 300, 200, 100); // High Score
    ctx.rect(425, 430, 150, 60); // Start Button
    ctx.stroke();
    ctx.closePath();
    
    ctx.font = "20px Arial";
    ctx.fillText(title, 440, 237);
    ctx.font = "20px Arial";
    if (status == 3) {
        ctx.fillText("SCORE", 460, 327);
        localStorage.tranScore = score;
        ctx.fillText(localStorage.tranScore + " POINTS", 445, 350);
    } else {
        ctx.fillText("HIGH SCORE", 440, 327);
        ctx.fillText(localStorage.highScore1 + " POINTS", 445, 350);
        ctx.fillText(localStorage.highScore2 + " POINTS", 445, 370);
        ctx.fillText(localStorage.highScore3 + " POINTS", 445, 390);
    }
    ctx.font = "20px Arial";
    ctx.fillText(button, 470, 465);
}

function isOnButton(x, y) {
    return x > 425 && x < 425 + 150 && y > 430 && y < 430 + 60;
}

function isOnPause(x, y){
    return pos.x > 690 && pos.x < 690 + 70 && pos.y > 10 && pos.y < 70 + 2;
}

function mouseDown(event) {

    pos = getMousePos(event);

    if (status == 0 || status == 3 || status == 4 || status == 5) {
        if (isOnButton(pos.x, pos.y)) checkStatus();
    }
    else {
        if (isOnPause(pos.x, pos.y)) pause();
        if (!paused) {
            for (var i = 0; i < blackholes.length; i ++) {
                // If it is a blackhole
                if (isOnBlackhole(blackholes[i].x, blackholes[i].y, pos.x, pos.y)) {
                    // Remove the blackhole
                    if (blackholes[i].type == "blue")
                        addScore(5);
                    else if (blackholes[i].type == "purple")
                        addScore(10);
                    else if (blackholes[i].type == "black")
                        addScore(20);
                    release(blackholes[i]);
                    blackholes.splice(i, 1);
                    return;
                }
            }
        }
    }
}

function start() {

    shapes = [];
    blackholes = [];
    // Params
    var heightOfDivider = 40;
    var i;
    time = INIT_TIME;

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(0, heightOfDivider);
    ctx.lineTo(1000, heightOfDivider);
    ctx.stroke();

    // Add Level
    ctx.font = "20px Arial";
    ctx.fillText("Level " + status, 10, 25);
		//ctx.stroke();
    // Add Score
    if (status == 1) {
        score = 0;
        addScore(200);
    }
    else addScore(0);

    // Add Pause
    ctx.font = "15px Arial";
    ctx.fillText("PAUSE", 700, 25);
    ctx.rect(690, 10, 70, 20);
    ctx.stroke();

    // Add time left
    ctx.font = "15px Arial";
    ctx.fillText(time + " seconds", 900, 25);
		//ctx.stroke();
    for (i = 0; i < NUM_OBJECT; i++) {
        drawRandomObject(i % 10);
    }

    // Blackholes
    ctx.imgBlackHole1 = new Image();
    ctx.imgBlackHole1.src = 'img/blackhole1.png';
    ctx.imgBlackHole2 = new Image();
    ctx.imgBlackHole2.src = 'img/blackhole2.png';
    ctx.imgBlackHole3 = new Image();
    ctx.imgBlackHole3.src = 'img/blackhole3.png';

    ctx.imgBlackHole1.onload = function(){
      for (i = 0; i < NUM_INIT_BLACKHOLE; i++) {
          drawRandomBlackhole();
      }
    }

    moveObjects();
    if (keepOnlyOneCountDown == 0) {
        countDown();
        keepOnlyOneCountDown = 1;
    }
}

function addScore(s) {

    score += s;
    ctx.fillStyle = "black";
    ctx.clearRect(500, 5, 150, 30);
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 500, 25);

}

function countDown() {

    if (status == 1 || status == 2) {
        ctx.clearRect(900, 0, 100, 30);
        ctx.fillStyle = "black";
        time --;
        ctx.font = "15px Arial";
        if (time > 1) ctx.fillText(time + " seconds", 900, 25);
        else if (time == 1 || time == 0)
            ctx.fillText(time + " second", 900, 25);
        else {
            if (status == 2) {
            	// high score system, need to count high score when finish level 2
                if (score > localStorage.highScore1){
                    localStorage.highScore3 = localStorage.highScore2;
                    localStorage.highScore2 = localStorage.highScore1;
                    localStorage.highScore1 = score;
                }
                else if (score > localStorage.highScore2){
                    localStorage.highScore3 = localStorage.highScore2;
                    localStorage.highScore2 = score;
                }
                else if (score > localStorage.highScore3){
                    localStorage.highScore3 = score;
                }
                   
            }
            checkStatus('win');
        }
	// set the frequency of the new genrated black holes
        if (time % Math.floor(BLACKHOLE_APPEAR_FREQ / (2*status)) == 0) {
            drawRandomBlackhole();
}
    }
		
		// pause function
    if (paused) clearTimeout(countDown);
    else setTimeout(countDown, 1000);

}

function moveObjects() {

    if (status == 1 || status == 2) {
        ctx.clearRect(0, 40, 1000, 640);
        moveBlackhole();
        moveObject();
        if (shapes.length <= 0) {
            console.log("You lose!");
            // high score system, need when lose the game
            if (score > localStorage.highScore1){
            				console.log("count lose score");
                    localStorage.highScore3 = localStorage.highScore2;
                    localStorage.highScore2 = localStorage.highScore1;
                    localStorage.highScore1 = score;
                }
                else if (score > localStorage.highScore2){
                		console.log("count lose score");
                    localStorage.highScore3 = localStorage.highScore2;
                    localStorage.highScore2 = score;
                }
                else if (score > localStorage.highScore3){
                		console.log("count lose score");
                    localStorage.highScore3 = score;
                }
            checkStatus('lose');
        }
        if (paused) clearTimeout(moveObjects);
        else setTimeout(moveObjects, 1000 / GAME_SPEED);
    }
    else clearTimeout(moveObjects);
}

// FSM, 1 = level 1; 2 = level 2; 0 = start screen; 3 = transitional screen;
// 4 = lose screen; 5 = win screen;
function checkStatus(code) {

    if (status == 0) status = 1;
    else if (status == 1 && code == 'win') status = 3;
    else if (status == 1 && code == 'lose') status = 4;
    else if (status == 2 && code == 'win') status = 5;
    else if (status == 2 && code == 'lose') status = 4;
    else if (status == 3) status = 2;
    else if (status == 4) status = 0;
    else if (status == 5) status = 0;
    goToStatus();
}

function goToStatus() {
    clearScreen();
    if (status == 0) drawTransitionalScreen('BLACKHOLE', 'START');
    else if (status == 1) start();
    else if (status == 2) start();
    else if (status == 3) drawTransitionalScreen('LEVEL 1', 'NEXT');
    else if (status == 4) drawTransitionalScreen('YOU LOSE!', 'FINISH');
    else if (status == 5) drawTransitionalScreen('YOU WIN!', 'FINISH');
}

function getMousePos(event) {
    var rect = c.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

function isOnBlackhole(xBlackhole, yBlackhole, xSelected, ySelected) {
    return xBlackhole <= xSelected &&
        xSelected <= (xBlackhole + 100) &&
        yBlackhole <= ySelected &&
        ySelected <= (yBlackhole + 100)
}

function pause() {

    if (!paused) paused = true;
    else {
        paused = false;
        setTimeout(countDown, 1000);
        setTimeout(moveObjects, 1000 / GAME_SPEED);
    }
}

function moveBlackhole(){

    for (var i = 0; i < blackholes.length; i ++) {
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

    return xSelected > leftBoundary &&
        xSelected < rightBoundary &&
        ySelected > topBoundary &&
        ySelected < bottomBoundary
}

// decide the status of moving which can be move as usual, trap when close
// to black hole, absorb when being absorbed
function moveObject() {

    var i, j;
    for (i = 0; i < shapes.length; i ++) {
        /* If not trapped: Move as usual */
        if (shapes[i].trappedBy == null) move(i);
        /* Try to trap an object if in 100px of a blackhole */
        trap(i);
        /* If trapped: Absorb into the center */
        if (shapes[i].trappedBy != null) absorb(i);
    }
}

function trap(i) {
    for (j = 0; j < blackholes.length; j ++) {
        if (shapes[i] != null || shapes[i].trappedBy == null) {
            if (isInArea(blackholes[j].x, blackholes[j].y,
                    shapes[i].x, shapes[i].y) ||
                isInArea(blackholes[j].x, blackholes[j].y,
                    shapes[i].x + 50, shapes[i].y) ||
                isInArea(blackholes[j].x, blackholes[j].y,
                    shapes[i].x, shapes[i].y + 50) ||
                isInArea(blackholes[j].x, blackholes[j].y,
                    shapes[i].x + 50, shapes[i].y + 50)) {
                shapes[i].trappedBy = blackholes[j];
            }
        }
    }
}

function move(i) {

    if (shapes[i].x > 1000 - 50 || shapes[i].x < 0)
        shapes[i].xChange *= -1;
    if (shapes[i].y > 640 - 50 || shapes[i].y < 80)
        shapes[i].yChange *= -1;
    newX = shapes[i].x + shapes[i].xChange;
    newY = shapes[i].y + shapes[i].yChange;
    drawEachObject(newX, newY, shapes[i].obj);
    shapes[i].x = newX;
    shapes[i].y = newY;
}

function absorb(i) {

    var newX, blackholeSpeed;
    var xDistance = shapes[i].trappedBy.x - shapes[i].x;
    var yDistance = shapes[i].trappedBy.y - shapes[i].y;
    var angle = yDistance / xDistance;

    if (shapes[i].trappedBy.type == "blue")
        blackholeSpeed = BLUE_ABSORB_SPEED;
    else if (shapes[i].trappedBy.type == "purple")
        blackholeSpeed = PURPLE_ABSORB_SPEED;
    else if (shapes[i].trappedBy.type == "black")
        blackholeSpeed = BLACK_ABSORB_SPEED;

    if (xDistance > 0) newX = shapes[i].x + blackholeSpeed;
    else newX = shapes[i].x - blackholeSpeed;
    if (yDistance > 0) newY = shapes[i].y + blackholeSpeed;
    else newY = shapes[i].y - blackholeSpeed;

    drawEachObject(newX, newY, shapes[i].obj)
    shapes[i].x = newX;
    shapes[i].y = newY;

    /* If the object is already in the center */
    if (isEdible(i)) {
        eat(i);
        addScore(-50);
    }
}

function isFull(type, i) {

    if (shapes[i].trappedBy.type == "blue")
        return shapes[i].trappedBy.eaten == 3;
    if (shapes[i].trappedBy.type == "purple")
        return shapes[i].trappedBy.eaten == 2;
    if (shapes[i].trappedBy.type == "black")
        return shapes[i].trappedBy.eaten == 1;
}

function goAway(i) {

    blackholes.splice(blackholes.indexOf(shapes[i].trappedBy), 1);
    release(shapes[i].trappedBy);
}

/* Other trapped-but-not-eaten should be released after the blackhole disappears */
function release(bh) {

    for (i = 0; i < shapes.length; i++)
        if (shapes[i].trappedBy != null)
            if (shapes[i].trappedBy == bh)
                shapes[i].trappedBy = null;
}

function eat(i) {

    shapes[i].trappedBy.eaten += 1;
    if (isFull("blue", i)) goAway(i);
    else if (isFull("purple", i)) goAway(i);
    else if (isFull("black", i)) goAway(i);
    shapes.splice(i, 1);
}

function isEdible(i) {

    var offset;
    if (shapes[i].trappedBy.type == "blue")
        offset = BLUE_ABSORB_SPEED;
    else if (shapes[i].trappedBy.type == "purple")
        offset = PURPLE_ABSORB_SPEED;
    else if (shapes[i].trappedBy.type == "black")
        offset = BLACK_ABSORB_SPEED;
    return shapes[i].x <= shapes[i].trappedBy.x + offset &&
    shapes[i].x >= shapes[i].trappedBy.x - offset &&
    shapes[i].y <= shapes[i].trappedBy.y + offset &&
    shapes[i].y >= shapes[i].trappedBy.y - offset;
}

function drawRandomObject(object) {

    // Generate rand # btw 0-950
    var x = Math.floor(Math.random() * 951);
    // Generate rand # btw 80-590
    var y = Math.floor(80 + Math.random() * 511);
    // Generate rand # btw 1-10
    var xChange = Math.floor(Math.random() * 10 + 1);
    var yChange = Math.floor(Math.random() * 10 + 1);

    drawEachObject(x, y, object.obj);
    shapes.push(new Shape(x, y, xChange, yChange, object));
}

function drawEachObject(x, y, type) {

    if (type == 0) { // moon
        ctx.beginPath();
        ctx.fillStyle="#0000ff";
        ctx.moveTo(x,y);
        ctx.bezierCurveTo(x+33.8, y-19.5, x+50.7, y+13, x+32.5, y+32.5);//
        ctx.bezierCurveTo(x+36.4, y+18.2, x+28.6, y-5.2, x, y);//
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    if (type == 1) { // spaceship
        // Draw bottom
        ctx.beginPath();
        ctx.moveTo(x, y); 
        ctx.bezierCurveTo(x, y+5.6, x-11, y+10.2, x-24.8, y+10.2);
        ctx.bezierCurveTo(x-38.6, y+10.2, x-49.6, y+5.6, x-49.6, y); 
        ctx.bezierCurveTo(x-49.6, y-5.6, x-38.6, y-10.2, x-24.8, y-10.2);
        ctx.bezierCurveTo(x-11, y-10.2, x, y-5.6, x, y); 
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(111, 111, 100)";
        ctx.fill();

        //	Draw saucer top
        ctx.beginPath();
        ctx.moveTo(x-12.2, y-9.8);
        ctx.bezierCurveTo(x-12.2, y-7.2, x-18, y-5.2, x-25, y-5.2);
        ctx.bezierCurveTo(x-32, y-5.2,x-37.6, y-7.2, x-37.6, y-9.8);
        ctx.bezierCurveTo(x-37.6, y-12.2, x-32, y-14.4, x-25, y-14.4);
        ctx.bezierCurveTo(x-18, y-14.4, x-12.2, y-12.2, x-12.2, y-13.8); 
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(15, 233, 77)";
        ctx.fill();
    }

    if(type == 2){ //rocket
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x-2, y-18, x-5, y-27, x+10, y-35);
        ctx.bezierCurveTo(x+25, y-27, x+22, y-18, x+20, y); 
        ctx.lineTo(x+25,y+15);
        ctx.lineTo(x+18,y+05);
        ctx.lineTo(x+20,y+15);
        ctx.lineTo(x+14,y+05);
        ctx.lineTo(x+10,y+15);
        ctx.lineTo(x+06,y+05);
        ctx.lineTo(x,y+15);
        ctx.lineTo(x+2,y+5);
        ctx.lineTo(x-5,y+15);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(230, 50, 233)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x+10,y-15,5,0,2*Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(15, 255, 255)";
        ctx.fill();
        
    }

    if (type == 3){ // star
        ctx.beginPath();
        ctx.moveTo(x,y); //100, 100
        ctx.lineTo(x+5,y-20);
        ctx.lineTo(x+10,y);
        ctx.lineTo(x+30,y+5);
        ctx.lineTo(x+10,y+10);
        ctx.lineTo(x+05,y+30);
        ctx.lineTo(x+0,y+10);
        ctx.lineTo(x-20,y+5);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(60, 50, 200)";
        ctx.fill();
    }

    if (type == 4){ // Satellite
        ctx.beginPath();
        ctx.rect(x, y, 15, 5);
        ctx.rect(x+18, y-5, 8, 20);
        ctx.rect(x+29, y, 15, 5);
        ctx.moveTo(x+15,y+3);
        ctx.lineTo(x+18,y+3);
        ctx.moveTo(x+26,y+3);
        ctx.lineTo(x+29,y+3);
        ctx.moveTo(x+22,y-5);
        ctx.lineTo(x+22,y-10);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(10, 50, 2)";
        ctx.fill();
        
    }

    if (type == 5){ // Satellite2
        ctx.beginPath();
        ctx.rect(x, y, 15, 5);
        ctx.rect(x+18, y-5, 8, 30);
        ctx.rect(x+29, y, 15, 5);
        ctx.moveTo(x+15,y+3);
        ctx.lineTo(x+18,y+3);
        ctx.moveTo(x+26,y+3);
        ctx.lineTo(x+29,y+3);
        ctx.moveTo(x+22,y-5);
        ctx.lineTo(x+22,y-10);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(100, 200, 2)";
        ctx.fill();
        
    }

    if (type == 6){ // planet
        ctx.beginPath();
        ctx.arc(x+20,y+20,15,0,2*Math.PI);
        ctx.fillStyle = "rgb(30, 170, 233)";
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(x, y+20);
        ctx.arc(x+20,y+20,20,0,2*Math.PI);
        ctx.closePath();
        ctx.stroke();
        
    }

    if (type == 7) { // debris1
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+23, y+5);
        ctx.lineTo(x+28, y+27);
        ctx.lineTo(x, y+42);
        ctx.lineTo(x-10, y+29);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(107, 107, 107)";
        ctx.fill();
    }

    if (type == 8) { // star2
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+7.5, y+30);
        ctx.lineTo(x+25, y+45);
        ctx.lineTo(x, y+37.5);
        ctx.lineTo(x-25, y+45);
        ctx.lineTo(x-7.5, y+30);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(60, 50, 200)";
        ctx.fill();
    }

    if (type == 9) { //debris2
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+19, y+2);
        ctx.lineTo(x+7, y+21);
        ctx.lineTo(x+28, y+25);
        ctx.lineTo(x, y+49);
        ctx.lineTo(x-15, y+31);
        ctx.lineTo(x-8, y+22);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgb(183, 183, 183)";
        ctx.fill();
    }
}

function drawRandomBlackhole() {

    var x, y, i, type, isOverlapped;

    do {
        isOverlapped = false;
        /* Generate rand # btw 0-950 */
        x = Math.floor(Math.random() * 951);
        /* Generate rand # btw 40-590 */
        y = Math.floor(40 + Math.random() * 551);

        /* Generate rand # btw 1-14 */
        type = Math.floor(Math.random() * 14 + 1);
        /* 1-9      for blue    blackhole */
        /* 10-13    for purple  blackhole */
        /* 14       for black   blackhole */

        /* Dealing with overlapping */
        for (i = 0; i < blackholes.length; i ++) {

            /* If overlapped */
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
        /* If overlapped, find a new position until not overlapped */
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
