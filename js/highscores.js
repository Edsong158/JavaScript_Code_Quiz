document.addEventListener('DOMContentLoaded', function () {
    displayHighScores();
  });
  
  function displayHighScores() {
    var highScoresList = document.getElementById('highscores-list');
    highScoresList.innerHTML = ''; // Clear existing content
  
    var highScoresData = getHighScoresData();
  
    highScoresData.forEach((scoreData, index) => {
      var listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${scoreData.initials}: ${scoreData.score}`;
      highScoresList.appendChild(listItem);
    });
  }
  
  function clearHighScores() {
    // Clear the high scores data from localStorage
    localStorage.removeItem('highScoresData');
    alert('High scores cleared!');
    displayHighScores(); // Update the display after clearing
  }
  
  function getHighScoresData() {
    var storedData = localStorage.getItem('highScoresData');
    return storedData ? JSON.parse(storedData) : [];
  }
  