
let scores, roundScore, activePlayer, gamePlaying

initGame();

//Button New Game
document.querySelector('.btn-new').addEventListener('click', initGame);

//Show and Hide the rules
document.querySelector('.btn-start').addEventListener('click', () => {
  document.querySelector('.rules').classList.remove('fadeInDown');
  document.querySelector('.rules').classList.add('fadeOutDown')
});

// Button to show the rules 

document.querySelector('.btn-rules').addEventListener('click', () =>{
document.querySelector('.rules').classList.remove('fadeOutDown');
document.querySelector('.rules').classList.add('fadeInDown');
});

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying){
    // Generates a ramdom number between 1 and 6;
    let dice1 = Math.floor(Math.random() * 6) +1;
    let dice2 = Math.floor(Math.random() * 6) +1;

    // Display the result, showing the equivalent dice figure
    document.querySelector('.dice-1').style.display = 'block';
    document.querySelector('.dice-1').src = `dice-${dice1}.png`;

    document.querySelector('.dice-2').style.display = 'block';
    document.querySelector('.dice-2').src = `dice-${dice2}.png`;

    // If the dice rolls a number different than 1, add the value to the round score
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2
      document.getElementById(`current-${activePlayer}`).innerText = roundScore;
    } else {
      setTimeout(nextPlayer, 0500);
    }

    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).innerText = scores[activePlayer];
      setTimeout(nextPlayer, 0500);
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying){
    scores[activePlayer]  += roundScore;

    document.getElementById(`score-${activePlayer}`).innerText = scores[activePlayer];

    //get the input value
    let input, winningScore;
    input = document.querySelector('.input-winning').value
  
    if (input) {
      winningScore = input
    } else {
      winningScore = 100
    }

    if (scores[activePlayer] >= winningScore) {
      document.getElementById(`name-${activePlayer}`).innerText = 'Winner!';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function initGame() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0; // player 1 = 0, player 2 = 1
  gamePlaying = true;

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.getElementById('name-0').innerText = 'Player 1';
  document.getElementById('name-1').innerText = 'Player 2';
  document.getElementById('score-0').innerText = '0';
  document.getElementById('score-1').innerText = '0';
  document.getElementById('current-0').innerText = '0';
  document.getElementById('current-1').innerText = '0';

  document.querySelector('.input-winning').value = '';

}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  

  document.getElementById('current-0').innerText = '0';
  document.getElementById('current-1').innerText = '0';

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}