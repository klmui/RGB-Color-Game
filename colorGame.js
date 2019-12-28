var numSquares = 6;
var colors = [];
var pickedColor;
var squares = $(".square");
var colorDisplay = $("#colorDisplay");
var messageDisplay = $("#message");
var h1 = $("h1");
var resetButton = $("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

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

resetButton.on("click", function() {
	reset();
})

function changeColors(color){
	//change each color to match given color
	squares.css("background", color);
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

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

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

