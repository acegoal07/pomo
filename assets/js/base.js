// Timer class caller
const timer = new pomoTimer();
// Focus listener
let doctitle = document.title;
window.onblur = function() {
  timer.setBlured(true);
};
window.onfocus = function() {
  timer.setBlured(false);
  document.title = doctitle;
};
// On load checker
window.addEventListener('load', () => {
  setTimerColor("var(--background-color)");

  /////////////// Todo popup ////////////////////////

  // Open todo popup button listner
  document.querySelector("#todo-add-button").addEventListener('click', () => {
    if (document.querySelector("#leaderboard").style.display === "block" || document.querySelector("#login").style.display === "block") { return; }
    const popup = document.querySelector("#popup");
    if (popup.style.display === "block") { return; }
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    popup.style.display = "block";
    document.querySelector("main").classList.add("blur-filter");
    document.querySelector("#todo-add-button").classList.remove("is-clickable");
    document.querySelector("#leaderboardButton").classList.remove("is-clickable");
    document.querySelector("#loginButton").classList.remove("is-clickable");
  });
  // Close todo popup button listern
  document.querySelector("#todo-close-popup").addEventListener('click', () => {
    const popup = document.querySelector("#popup");
    popup.style.animation = "popupCloseAnimation 0.5s forwards";
    setTimeout(function() {
      popup.style.display = "none";
    }, 500);
    document.querySelector("main").classList.remove("blur-filter");
    document.querySelector("#todo-add-button").classList.add("is-clickable");
    document.querySelector("#leaderboardButton").classList.add("is-clickable");
    document.querySelector("#loginButton").classList.add("is-clickable");
  });

  /////////////// Leaderboard popup ////////////////////////

  // Open leaderboard popup button
  document.querySelector("#leaderboardButton").addEventListener('click', () => {
    if (document.querySelector("#popup").style.display === "block" || document.querySelector("#login").style.display === "block") { return; }
    const popup = document.querySelector("#leaderboard");
    if (popup.style.display === "block") { return; }
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    popup.style.display = "block";
    document.querySelector("main").classList.add("blur-filter");
    document.querySelector("#todo-add-button").classList.remove("is-clickable");
    document.querySelector("#leaderboardButton").classList.remove("is-clickable");
    document.querySelector("#loginButton").classList.remove("is-clickable");
  });
  // Close leaderboard popup button
  document.querySelector("#leaderboard-close-popup").addEventListener('click', () => {
    const popup = document.querySelector("#leaderboard");
    popup.style.animation = "popupCloseAnimation 0.5s forwards";
    setTimeout(function() {
      popup.style.display = "none";
    }, 500);
    document.querySelector("main").classList.remove("blur-filter");
    document.querySelector("#todo-add-button").classList.add("is-clickable");
    document.querySelector("#leaderboardButton").classList.add("is-clickable");
    document.querySelector("#loginButton").classList.add("is-clickable");
  });

  /////////////// Login popup ////////////////////////

  // Open login popup button
  document.querySelector("#loginButton").addEventListener('click', () => {
    if (document.querySelector("#popup").style.display === "block" || document.querySelector("#leaderboard").style.display === "block") { return; }
    const popup = document.querySelector("#login");
    if (popup.style.display === "block") { return; }
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    popup.style.display = "block";
    document.querySelector("main").classList.add("blur-filter");
    document.querySelector("#todo-add-button").classList.remove("is-clickable");
    document.querySelector("#leaderboardButton").classList.remove("is-clickable");
    document.querySelector("#loginButton").classList.remove("is-clickable");
  });
  // Close login popup button
  document.querySelector("#login-close-popup").addEventListener('click', () => {
    const popup = document.querySelector("#login");
    popup.style.animation = "popupCloseAnimation 0.5s forwards";
    setTimeout(function() {
      popup.style.display = "none";
    }, 500);
    document.querySelector("main").classList.remove("blur-filter");
    document.querySelector("#todo-add-button").classList.add("is-clickable");
    document.querySelector("#leaderboardButton").classList.add("is-clickable");
    document.querySelector("#loginButton").classList.add("is-clickable");
  });

  /////////////// Popup function buttons ///////////////

  // Add todo button listner
  document.querySelector("#addTodoButton").addEventListener("click", () => {
    const todoInput = document.querySelector("#todo-input");
    const todoText = todoInput.value;

    if (todoText.trim() !== "") {
      const todoItemContainer = document.createElement("div");
      todoItemContainer.classList.add("todo-item-container");

      const checkbox = document.createElement("div");
      checkbox.classList.add("todo-checkbox");

      const todoTextElement = document.createElement("div");
      todoTextElement.classList.add("todo-text");
      todoTextElement.textContent = todoText;

      todoItemContainer.appendChild(checkbox);
      todoItemContainer.appendChild(todoTextElement);

      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      todoItem.appendChild(todoItemContainer);

      document.querySelector(".todo-list-container").appendChild(todoItem);

      todoInput.value = "";

      document.querySelector("#popup").style.display = "none";
      document.querySelector("main").classList.remove("blur-filter");
    }
  });

  /////////////// Timer Buttons ///////////////

  // Start timer button
  var pomodoros = 0;
  var index = 0;
  const times = [25, 5, 25, 5, 25, 5, 25, 15];
  let currentTime;

  document.querySelector("#startButton").addEventListener('click', () => {
    if (!timer.isActive()) {
      if (timer.getCurrentPositionMS() === 0) {
        setTimerColor("#64AB1F");
        currentTime = times[index] * 1000; // keeping it as 1000 and not 60000 just to make tests easier 
        timer.setTimerLength(currentTime)
          .startTimer();
      } else {
        timer.startTimer();
      }
      const halfWay = timer.timerLengthMS / 2;
      const quarterWay = timer.timerLengthMS / 4;
      const timeDisplay = setInterval(() => {
        if (timer.getCurrentPositionMS() === -1000) {
          clearInterval(timeDisplay);
          timer.stopTimer();
          timer.setCurrentPositionMS(0);
        } else if (timer.getCurrentPositionMS() < quarterWay) {
          setTimerColor("var(--background-color)");
        } else if (timer.getCurrentPositionMS() < halfWay) {
          setTimerColor("orange");
        }
      }, 1000);
    }
    if (index < 7) {
      index++;
    } else {
      index = 0;
      pomodoros++;
      document.querySelector('#pomCount').textContent = pomodoros;
    }
  });
  // Pause timer button
  document.querySelector("#pauseButton").addEventListener('click', () => {
    timer.stopTimer();
  });
});

/////////////// Additional functions ///////////////

/**
 * Timer count down function
 * @param {int} value
 */
function setCircleDashArray(value) {
  document.querySelector("#base-timer-path-remaining").setAttribute("stroke-dasharray", `${(value * 283).toFixed(0)} 283`);
}
/**
 * Timer colour function
 * @param {String} input
 */
function setTimerColor(input) {
  document.querySelector("#base-timer-path-remaining").style.stroke = input == null ? "green" : input;
}
/**
 * Miliseconds to timestamp
 * @param {Number} s
 * @returns {String}
 */
function msToTime(s) {
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms);
  return pad(mins) + ':' + pad(secs);
}