var startButton = document.querySelector('#start');
var questionWrap = document.querySelector('.question-wrap');
var choicesContainer = document.querySelector('.choices');
var answerAlert = document.querySelector('.answer-alert');
var scoreData = document.querySelector('.score-data');
var scoreResults = document.querySelector('#score-Results');
var initialInput = document.querySelector('#initial-input');
var saveScoreButton = document.querySelector('#save-score');
var timeOutput = document.querySelector('#time-output');
var startWrap = document.querySelector('.start-wrap');


var currentQuestionIndex = 0;
var timer = 0;
var timeLeft = 60;
var clicked = false;
var score = 0;



// Function to start the quiz
function startQuiz() {
  timeLeft = 60;
  currentQuestionIndex = 0;
  startWrap.classList.add('hide');
  questionWrap.classList.remove('hide');
  showQuestion();
  startTimer();
}

// Function to display a question
function showQuestion() {
  var currentQuestionObj = questions[currentQuestionIndex];
  var questionText = document.querySelector('.question-text');
  questionText.innerText = currentQuestionObj.questionText;
  choicesContainer.innerHTML = '';
  for (var i = 0; i < currentQuestionObj.choices.length; i++) {
    var choiceBtn = document.createElement('button');
    choiceBtn.innerText = currentQuestionObj.choices[i];
    choicesContainer.append(choiceBtn);
  }
  
}

// Function to handle choice click
function handleChoiceClick(event) {
  var selectedChoice = event.target.textContent;
  if (selectedChoice !== undefined && selectedChoice !== null) {
    checkAnswer(event)
  }
  
}

// Function to check the answer
function checkAnswer(event) {
  if (clicked) {
    return;
  }
  
  var currentQuestionObj = questions[currentQuestionIndex];
  var el = event.target;
  if (el.tagName === 'BUTTON') {
    var userAnswer = el.innerText;
    var answerAlert = document.querySelector('.answer-alert');
    
    if (userAnswer === currentQuestionObj.correctAnswer) {
      answerAlert.innerText = 'Correct!';
      
      answerAlert.classList.add('show');
    } else {
      answerAlert.innerText = 'Wrong';
      answerAlert.classList.add('show');
      timeLeft = (timeLeft - 10) < 0 ? 0 : timeLeft - 10;
    }
    clicked = true
    
    setTimeout(function () {
      answerAlert.classList.remove('show');
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length) {
        endGame();
      } else {
        showQuestion();
        clicked = false
      }
    }, 1500)
  }
}

// Function to end the quiz
function endGame() {
  clearInterval(timer);
  questionWrap.classList.add('hide');
  scoreResults.textContent = `Your final score is ${timeLeft}.`;
  scoreData.classList.remove('hide');
}

// Function to start the timer
function startTimer() {
  timeOutput.innerText = 'Time : ' + timeLeft
  timer = setInterval(function () {
    if ((timeLeft - 1) > 0) {
      timeLeft--;
    }
    timeOutput.innerText = 'Time: ' + timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  },1000);
}



// Function to save the score
function saveScore() {
  var initialInput = document.querySelector('#initial-input');
  var initialsValue = initialInput.value;
  var rawData = localStorage.getItem('highscores');
  var highScore = JSON.parse(rawData) || [];

  highScore.push({
    initials: initialsValue,
    score: timeLeft
  });
  localStorage.setItem('highscore', JSON.stringify(highScore));
  window.location = './highscores.html';
  
  if (initials !== '') {
    
    alert(`Score saved! Initials: ${initials}, Score: ${timeLeft}`);
  } else {
    alert('Please enter your initials before saving.');
  }
}



startButton.addEventListener('click', startQuiz);

choicesContainer.addEventListener('click', handleChoiceClick);

saveScoreButton.addEventListener('click', saveScore);



