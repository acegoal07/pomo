const timer = new pomoTimer();
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
  // Open todo popup button listner
  document.querySelector("#todo-add-button").addEventListener('click', () => {
    const popup = document.querySelector("#popup");
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    popup.style.display = "block";
    document.querySelector("main").classList.add("blur-filter");
    document.querySelector("#todo-add-button").classList.remove("is-clickable");
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
  });
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
  // Leaderboard button listner
  document.querySelector("#leaderboardButton").addEventListener('click', () => {
    const weekly = document.querySelector('.weekly-grid-section');
    weekly.style.display = 'none';

    const allTime = document.querySelector('.allTime-grid-section')
    allTime.style.display = 'none';
    const toDo = document.querySelector('.todo-container');
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
  });
  // Start timer button
  document.querySelector("#startButton").addEventListener('click', () => {
    if (!timer.isActive()) {
      if (timer.getCurrentPositionMS() === 0) {
        setTimerColor("#64AB1F");
        timer.setTimerLength(10000)
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
  });
  // Pause timer button
  document.querySelector("#pauseButton").addEventListener('click', () => {
    timer.stopTimer();
  });
  //open login button
  document.querySelector("#loginButton").addEventListener('click', () => {
    document.querySelector('#login').style.display = 'block';
    document.querySelector("main").classList.add("blur-filter");
  })
  //close login button
  document.querySelector("#login-close-popup").addEventListener('click', () => {
    document.querySelector('#login').style.display = 'none';
    document.querySelector("main").classList.remove("blur-filter");
  });
});
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