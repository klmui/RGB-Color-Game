var numSquares = 6;
var colors = [];
var pickedColor;

// jQuery Selectors
var squares = $(".square");
var colorDisplay = $("#colorDisplay");
var messageDisplay = $("#message");
var h1 = $("h1");
var resetButton = $("#reset");
var modeButtons = $(".mode");


init();

// Initialize game
function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

// Sets up the buttons for easy, medium, and hard modes
function setupModeButtons(){
	modeButtons.on("click", function() {
		modeButtons.removeClass("selected");
		this.classList.add("selected");
		// Sets the number of squares to the difficulty selected by the user
		if (this.textContent === "Easy") {
			numSquares = 3;
		} else if (this.textContent === "Medium") {
			numSquares = 6;
		} else {
			numSquares = 9;
		}
		reset();
	});
}

// Logic for each square
function setupSquares(){
	squares.on("click", function() {
		//grab color of clicked square
		var clickedColor = this.style.background;
		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.text("Correct!");
			resetButton.text("Play Again?");
			changeColors(clickedColor);
			h1.css("background", String(clickedColor));
		} else {
			this.style.background = "#232323";
			messageDisplay.text("Try Again");
		}
	});
}

// Logic for the reset button
function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.text(String(pickedColor));
	resetButton.text("New Colors");
	messageDisplay.text("");
	//change colors of squares	
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares.get(i).setAttribute("style", "background:" + String(colors[i]) + "; display: block;");
		} else {
			squares.get(i).setAttribute("style", "display: none");
		}
	}
	h1.css("background", "steelblue");
}

// jQuery event listener for reset button
resetButton.on("click", function() {
	reset();
})

// When the correct square is picked, all change to the specified color
function changeColors(color){
	//change each color to match given color
	squares.css("background", color);
}

// Picks a random color from the colors array to be the correct color
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Generates a number of random colors based on the difficulty and stores them in an array
function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

// Generates random values for R, G, and B
function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

