window.onload = function () {



	// Init canvas
	window.c = document.getElementById("canvas");
	window.ctx = c.getContext("2d");

	// Params
	var heightOfDivider = 30;
	var level = 1;
	var score = 0;
	var time = 60;

	// Draw the line
	ctx.beginPath();
	ctx.moveTo(0, heightOfDivider);
	ctx.lineTo(1000, heightOfDivider);
	ctx.stroke();

	// Add Level
	ctx.font = "20px Arial";
    ctx.fillText("Level " + level, 10, 20); // Text, x, y

    // Add Score
    ctx.fillText("Score: " + score, 500, 20);

    // Add Pause
    ctx.font = "15px Arial";
    ctx.fillText("PAUSE", 700, 20);
    ctx.rect(690, 5, 70, 20); 
    ctx.stroke();

    // Install the functionality of pause
    // ??

    // Add time left
    ctx.fillText(time + " seconds", 900, 20);
    // 1 second (no "s")??
}

