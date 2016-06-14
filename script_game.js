var context;
var minX = 100;
var maxX = 900;
var minY = 100;
var maxY = 600;
var mindx = -1.2;
var maxdx = 1.2;
var x1=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y1=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx1=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy1=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x2=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y2=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx2=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy2=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x3=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y3=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx3=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy3=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x4=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y4=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx4=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy4=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x5=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y5=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx5=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy5=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x6=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y6=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx6=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy6=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x7=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y7=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx7=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy7=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x9=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y9=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx9=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy9=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x10=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y10=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx10=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy10=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var x8=Math.floor(Math.random() * (maxX - minX + 1)) + minX+0.7;
var y8=Math.floor(Math.random() * (maxY - minY + 1)) + minY+0.7;
var dx8=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;
var dy8=Math.floor(Math.random() * (maxdx - mindx + 1)) + mindx+0.7;



window.onload = function() {
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");

	drawInfo();
	setInterval(drawObjects,10);
	drawObjects();
}


function drawInfo() {
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");

	context.beginPath();
	context.moveTo(0,40);
	context.lineTo(1000,40);
	context.stroke();

}

var objects = new Array();

var Shape = function(x,y,dx,dy){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
}

objects.push(new Shape(x1,y1,dx1,dy1));
objects.push(new Shape(x2,y2,dx2,dy2));
objects.push(new Shape(x3,y3,dx3,dy3));
objects.push(new Shape(x4,y4,dx4,dy4));
objects.push(new Shape(x5,y5,dx5,dy5));
objects.push(new Shape(x6,y6,dx6,dy6));
objects.push(new Shape(x7,y7,dx7,dy7));
objects.push(new Shape(x8,y8,dx8,dy8));
objects.push(new Shape(x9,y9,dx9,dy9));
objects.push(new Shape(x10,y10,dx10,dy10));

function drawObjects() {
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");

		context.clearRect(0,40,1000,640);

		for (var i = 0; i < objects.length; i++){
			var temp = objects[i];
			if (i == 0) { // moon
				context.beginPath();
				context.fillStyle="#0000ff";
				context.moveTo(temp.x,temp.y);
				context.bezierCurveTo(temp.x+33.8, temp.y-19.5, temp.x+50.7, temp.y+13, temp.x+32.5, temp.y+32.5);//
				context.bezierCurveTo(temp.x+36.4, temp.y+18.2, temp.x+28.6, temp.y-5.2, temp.x, temp.y);//
				context.closePath();
				context.fill();
				if (temp.x<0||temp.x>970) temp.dx =- temp.dx;
				if (temp.y<50||temp.y>620) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 1) { // spaceship
				// Draw bottom
				context.beginPath();
				context.moveTo(temp.x, temp.y); //28.4, 16.9
				context.bezierCurveTo(temp.x, temp.y+5.6, temp.x-11, temp.y+10.2, temp.x-24.8, temp.y+10.2); //28.4, 19.7, 22.9, 22.0, 16.0, 22.0
				context.bezierCurveTo(temp.x-38.6, temp.y+10.2, temp.x-49.6, temp.y+5.6, temp.x-49.6, temp.y); //9.1, 22.0, 3.6, 19.7, 3.6, 16.9
				context.bezierCurveTo(temp.x-49.6, temp.y-5.6, temp.x-38.6, temp.y-10.2, temp.x-24.8, temp.y-10.2); //3.6, 14.1, 9.1, 11.8, 16.0, 11.8
				context.bezierCurveTo(temp.x-11, temp.y-10.2, temp.x, temp.y-5.6, temp.x, temp.y); //22.9, 11.8, 28.4, 14.1, 28.4, 16.9
				context.closePath();
				context.fillStyle = "rgb(111, 111, 100)";
				context.fill();

				//	Draw saucer top
				context.beginPath();
				context.moveTo(temp.x-12.2, temp.y-9.8); //22.3, 12.0
				context.bezierCurveTo(temp.x-12.2, temp.y-7.2, temp.x-18, temp.y-5.2, temp.x-25, temp.y-5.2); //22.3, 13.3, 19.4, 14.3, 15.9, 14.3
				context.bezierCurveTo(temp.x-32, temp.y-5.2,temp.x-37.6, temp.y-7.2, temp.x-37.6, temp.y-9.8); //12.4, 14.3, 9.6, 13.3, 9.6, 12.0
				context.bezierCurveTo(temp.x-37.6, temp.y-12.2, temp.x-32, temp.y-14.4, temp.x-25, temp.y-14.4); //9.6, 10.8, 12.4, 9.7, 15.9, 9.7
				context.bezierCurveTo(temp.x-18, temp.y-14.4, temp.x-12.2, temp.y-12.2, temp.x-12.2, temp.y-13.8); //19.4, 9.7, 22.3, 10.8, 22.3, 12.0
				context.closePath();
				context.fillStyle = "rgb(15, 233, 77)";
				context.fill();
				if (temp.x<40||temp.x>1000) temp.dx =- temp.dx;
				if (temp.y<57||temp.y>630) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if(i == 2){ //rocket
				context.beginPath();
				context.moveTo(temp.x, temp.y);
				context.bezierCurveTo(temp.x-2, temp.y-18, temp.x-5, temp.y-27, temp.x+10, temp.y-35);
				context.bezierCurveTo(temp.x+25, temp.y-27, temp.x+22, temp.y-18, temp.x+20, temp.y); //9.1, 22.0, 3.6, 19.7, 3.6, 16.9
				context.lineTo(temp.x+25,temp.y+15);
				context.lineTo(temp.x+18,temp.y+05);
				context.lineTo(temp.x+20,temp.y+15);
				context.lineTo(temp.x+14,temp.y+05);
				context.lineTo(temp.x+10,temp.y+15);
				context.lineTo(temp.x+06,temp.y+05);
				context.lineTo(temp.x,temp.y+15);
				context.lineTo(temp.x+2,temp.y+5);
				context.lineTo(temp.x-5,temp.y+15);
				context.closePath();
				context.fillStyle = "rgb(230, 50, 233)";
				context.fill();

				context.beginPath();
				context.arc(temp.x+10,temp.y-15,5,0,2*Math.PI);
				context.fillStyle = "rgb(15, 255, 255)";
				context.fill();
				if (temp.x<0||temp.x>980) temp.dx =- temp.dx;
				if (temp.y<90||temp.y>630) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 3){ // star
				context.beginPath();
				context.moveTo(temp.x,temp.y); //100, 100
				context.lineTo(temp.x+5,temp.y-20);
				context.lineTo(temp.x+10,temp.y);
				context.lineTo(temp.x+30,temp.y+5);
				context.lineTo(temp.x+10,temp.y+10);
				context.lineTo(temp.x+05,temp.y+30);
				context.lineTo(temp.x+0,temp.y+10);
				context.lineTo(temp.x-20,temp.y+5);
				context.closePath();
				context.fillStyle = "rgb(60, 50, 200)";
				context.fill();
				if (temp.x<0||temp.x>970) temp.dx =- temp.dx;
				if (temp.y<60||temp.y>620) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 4){ // Satellite
				context.beginPath();
				context.rect(temp.x, temp.y, 15, 5);
				context.rect(temp.x+18, temp.y-5, 8, 20);
				context.rect(temp.x+29, temp.y, 15, 5);
				context.fillStyle = "rgb(10, 50, 2)";
				context.fill();
				context.moveTo(temp.x+15,temp.y+3);
				context.lineTo(temp.x+18,temp.y+3);
				context.moveTo(temp.x+26,temp.y+3);
				context.lineTo(temp.x+29,temp.y+3);
				context.moveTo(temp.x+22,temp.y-5);
				context.lineTo(temp.x+22,temp.y-10);
				context.stroke();
				if (temp.x<10||temp.x>960) temp.dx =- temp.dx;
				if (temp.y<60||temp.y>620) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 5){ // Satellite2
				context.beginPath();
				context.rect(temp.x, temp.y, 15, 5);
				context.rect(temp.x+18, temp.y-5, 8, 30);
				context.rect(temp.x+29, temp.y, 15, 5);
				context.fillStyle = "rgb(100, 200, 2)";
				context.fill();
				context.moveTo(temp.x+15,temp.y+3);
				context.lineTo(temp.x+18,temp.y+3);
				context.moveTo(temp.x+26,temp.y+3);
				context.lineTo(temp.x+29,temp.y+3);
				context.moveTo(temp.x+22,temp.y-5);
				context.lineTo(temp.x+22,temp.y-10);
				context.stroke();
				if (temp.x<10||temp.x>960) temp.dx =- temp.dx;
				if (temp.y<60||temp.y>620) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 6){ // planet

				context.beginPath();
				context.arc(temp.x+20,temp.y+20,15,0,2*Math.PI);
				context.fillStyle = "rgb(30, 170, 233)";
				context.fill();
				context.moveTo(temp.x, temp.y+20);
				context.arc(temp.x+20,temp.y+20,20,0,2*Math.PI);
				context.stroke();
				context.closePath();

				if (temp.x<5||temp.x>970) temp.dx =- temp.dx;
				if (temp.y<42||temp.y>610) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 7) { // debris1
				context.beginPath();
				context.moveTo(temp.x, temp.y);
				context.lineTo(temp.x+23, temp.y+5);
				context.lineTo(temp.x+28, temp.y+27);
				context.lineTo(temp.x, temp.y+42);
				context.lineTo(temp.x-10, temp.y+29);
				context.closePath();
				context.fillStyle = "rgb(107, 107, 107)";
				context.fill();
				if (temp.x<5||temp.x>970) temp.dx =- temp.dx;
				if (temp.y<42||temp.y>610) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 8) { // star2
				context.beginPath();
				context.moveTo(temp.x, temp.y);
				context.lineTo(temp.x+7.5, temp.y+30);
				context.lineTo(temp.x+25, temp.y+45);
				context.lineTo(temp.x, temp.y+37.5);
				context.lineTo(temp.x-25, temp.y+45);
				context.lineTo(temp.x-7.5, temp.y+30);
				context.closePath();
				context.fillStyle = "rgb(60, 50, 200)";
				context.fill();
				if (temp.x<5||temp.x>970) temp.dx =- temp.dx;
				if (temp.y<42||temp.y>610) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}

			if (i == 9) { //debris2
				context.beginPath();
				context.moveTo(temp.x, temp.y);
				context.lineTo(temp.x+19, temp.y+2);
				context.lineTo(temp.x+7, temp.y+21);
				context.lineTo(temp.x+28, temp.y+25);
				context.lineTo(temp.x, temp.y+49);
				context.lineTo(temp.x-15, temp.y+31);
				context.lineTo(temp.x-8, temp.y+22);
				context.closePath();
				context.fillStyle = "rgb(183, 183, 183)";
				context.fill();
				if (temp.x<5||temp.x>980) temp.dx =- temp.dx;
				if (temp.y<42||temp.y>600) temp.dy =- temp.dy;
				temp.x += temp.dx;
				temp.y += temp.dy;
			}
		}


}
