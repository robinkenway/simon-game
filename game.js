gameStarts();
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 1;

// Start sequence ----------1
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  $("#level-title").text("level " + level++);
}

$(".btn").click(function(event) {

  var userChosenColour = (event.target.id);

  playSound(userChosenColour);
  animatePress(userChosenColour)

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(gamePattern.length);

});

// Check the answer of the user ---------
var i = 0;
function checkAnswer(currentLevel) {

  // If the sequence is wrong ---------
  if (userClickedPattern[i] !== gamePattern[i]) {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over").delay(100).queue(function(next) {
      $(this).removeClass("game-over");
      next();
    });

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    startOver();
  }

  if (userClickedPattern.length < currentLevel) {

    i++;

  } else if (userClickedPattern.length === gamePattern.length) {

  // Reset the user pattern sequence ----------
    i = 0;
    userClickedPattern = [];

  // Add next sequence
    setTimeout(function() {
      nextSequence()
      console.log(gamePattern);
    }, 1000);
    console.log("Success");

  } else {
    console.log("wrong");
    userClickedPattern = [];
  }

}

// Game Sound ---------

function playSound(name) {

  var gameSound = new Audio("sounds/" + name + ".mp3");
  gameSound.play();

}

// Animate button ---------

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
  });

}

// Once the game starts ---------
function gameStarts() {
  $(document).keypress(function(event) {

    var start = event.type;
    if (start == "keypress") {
      nextSequence();
      console.log(gamePattern);
    }

    $(document).off("keypress");

  });
}

// Restart the game ---------

function startOver() {
  console.log("wrong");
  gamePattern = [];
  userClickedPattern = [];
  level = 1;

  gameStarts();
}
