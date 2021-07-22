let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let startGame = false;
let level = 0;

//Press Any Key to Start
$(document).on("keypress", function () {
  if (!startGame) {
    $("#score-title").text(`Score ${level}`);
    nextSequence();
    startGame = true;
  }
});

//Press Button To Start (alternative for mobile)
$(".btn-start").on("click", function () {
  if (!startGame) {
    $("#score-title").text(`Score ${level}`);
    nextSequence();
    startGame = true;
  }
});

const playSound = function (name) {
  const colorSound = new Audio(`sounds/${name}.mp3`);
  colorSound.play();
};

const animatePress = function (currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  startGame = false;
};

const wrongAnswer = function () {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $(`body`).removeClass("game-over");
  }, 200);
  $("#score-title").text(`Game Over! Press A Key To Restart`);
  startOver();
};

const nextSequence = function () {
  userClickedPattern = [];

  //Random Color Chosen
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Flash Chosen Color
  $(`#${randomChosenColor}`).fadeOut().fadeIn();

  //Sounds
  playSound(randomChosenColor);

  //Score Counter
  $("#score-title").text(`Score ${level}`);
  level++;
};

//Check Answers
const checkAnswer = function (userAnswer) {
  //Check if most recent user answer matches game pattern answer
  if (userClickedPattern[userAnswer] === gamePattern[userAnswer]) {
    console.log("Success");
    //Are both patterns the same length?
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 2000);
    }
  } else {
    console.log("Wrong");
    wrongAnswer();
    startOver();
  }
};

//User Buttons Pressed
$(".btn").on("click", function (e) {
  const userChosenColor = $(e.target).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //Pass in index of last user answer
  checkAnswer(userClickedPattern.length - 1);
});
