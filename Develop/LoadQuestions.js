var questionTitle = document.querySelector("#question");
var MC1 = document.querySelector(".MC1");
var MC2 = document.querySelector(".MC2");
var MC3 = document.querySelector(".MC3");
var MC4 = document.querySelector(".MC4");
var QuestionIndex = 0;

var timerElement = document.querySelector("#timer");
var timeLeft = 60;
var timePassed = 0;
var timer;

var scoreElement = document.querySelector('#score');
var score = 0;
var submitElement = document.querySelector("#submit");
var scoreContainer = document.querySelector('.scoreContainer')


function hideElement (hide){
  hide.style.display = "none";
}

function displayElement (show){
  show.style.display = "block";
}

var questions = [
  {
      question: "The condition in an if / else statment is enclosed with _______.",
      responses: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
      answer: "Curly Brackets"
  },
  {
      question: "String values must be enclosed within ________ when being assigned to variaables.",
      responses: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
      answer: "Quotes"
  },
  {
      question: "Arrays in JavaScript can be used to store _______.",
      responses: ["Number of strings", "Other Arrays", "Booleans", "All of the above"],
      answer: "All of the above"
  },
  {
      question: "Commonly used data types Do Not include:",
      responses: ["Strings", "Alerts", "Booleans", "Numbers"], 
      answer: "Alerts"
  },
]

window.onload = function (){
  hideElement(scoreContainer)
  submitElement.addEventListener('click', saveScores);
}

// Starting the Game
function startGame(){
  LoadQuestion();
  startTimer();
}

// Loading Question on Screen
function LoadQuestion(){
  var Question = questions[QuestionIndex];
  questionTitle.textContent = Question.question;
  MC1.textContent = questions[QuestionIndex].responses[0];
  MC2.textContent = questions[QuestionIndex].responses[1];
  MC3.textContent = questions[QuestionIndex].responses[2];
  MC4.textContent = questions[QuestionIndex].responses[3];

  MC1.addEventListener('click', handleMCSelection);
  MC2.addEventListener('click', handleMCSelection);
  MC3.addEventListener('click', handleMCSelection);
  MC4.addEventListener('click', handleMCSelection);
}

function handleMCSelection(event){
  checkAnswer(event.target);

  QuestionIndex ++
  LoadQuestion();
}
// Timer Functions
function startTimer() {
  timerElement.textContent = timeLeft;
  interval = setInterval(function () {
      timePassed++;
      timerElement.textContent = timeLeft - timePassed;
      if (timeLeft - timePassed <= 0){
          timerStop();
          finishGame();
      }
  }, 1000);
}

function timerStop(){
  clearInterval(interval);
}


// Checking Answer, subtracting if incorrect.
function checkAnswer(answer) {
  if (QuestionIndex == 3){
      finishGame();
      score = timeLeft;
      return;
  }    
  if (questions[QuestionIndex].answer == answer.textContent) {
      
  }
  else {
      timePassed += 10;
  }

  if (timeLeft <= 0){
      timerStop();
      finishGame();
  }
};


function saveScores() {
  var InitialsInput = document.querySelector('.Initial')
      var player = {
          Initial: InitialsInput.value,
          score: score
      };
  localStorage.setItem('player', JSON.stringify(player));
}

// Game Completetion
function finishGame (){
  timerStop();
  hideElement(questionTitle);
  hideElement(MC1);
  hideElement(MC2);
  hideElement(MC3);
  hideElement(MC4);
  displayElement(scoreContainer);
}
startGame();
