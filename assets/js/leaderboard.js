let weekly;
let allTime;

window.addEventListener('load', () => {
  const leaderboardButton = document.querySelector("#leaderboardButton");
  leaderboardButton.addEventListener('click', loadLeaderboard);

document.querySelector('.to-do-container').insertAdjacentHTML('beforeend', '<div class="leader-grid"><div class="weekly-grid-section"><div class="grid-container"><h1>Weekly</h1><p class="leaderEntry">Leader yay</p> </div></div></div>');

document.querySelector('.timer-grid-section').insertAdjacentHTML('beforeend', '<div class="leader-grid"><div class="allTime-grid-section"><div class="grid-container"><h1>All Time</h1><p class="leaderEntry">Leader yay</p> </div></div></div>');

  weekly = document.querySelector('.weekly-grid-section');
  weekly.style.display = 'none';

  allTime = document.querySelector('.allTime-grid-section')
  allTime.style.display = 'none';
});

function loadLeaderboard() {
  const toDo = document.querySelector('.todo-grid-section');
  const timer = document.querySelector('.timer-container');

  if (toDo.style.display != 'none') {
    toDo.style.display = 'none';
    timer.style.display = 'none';
    weekly.style.display = 'block';
    allTime.style.display = 'block';
  } else {
    toDo.style.display = 'block';
    timer.style.display = 'block';
    weekly.style.display = 'none';
    allTime.style.display = 'none';
  }
}