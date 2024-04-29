// Timer class caller
const timer = new PomoTimer();
// Focus listener
const docTitle = document.title;
window.onblur = function() {
  timer.setBlurred(true);
};
window.onfocus = function() {
  timer.setBlurred(false);
  document.title = docTitle;
};
// Disable drag and drop
window.ondragstart = function() {
  return false;
};
window.ondrop = function() {
  return false;
};
// Onload handler
window.addEventListener("load", async () => {
  /////////////// Onload changes ///////////////
  if (!getNotificationPermission() && !isIOS()) {
    Notification.requestPermission();
  }
  setTimerColor("var(--background-color)");
  document.querySelector("#timer-circle-progress").classList.add("timer-circle-progress-transition");

  /////////////// Universal Popup functions ///////////////
  // Popup open listener
  const popupOpenFunction = (element) => {
    const popup = document.querySelector(`#${element.getAttribute("data-popup-open-target")}`);
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
  const todoPopupOpenFunction = (element) => {
    popupOpenFunction(element);
    document.querySelector("#task-input").value = element.querySelector(".todo-text").textContent.trim();
  };
  document.querySelectorAll("[data-popup-open-target]").forEach((element) => {
    if (element.getAttribute("data-target-popup-type") === "todo-item-popup") {
      element.addEventListener("click", () => {
        todoPopupOpenFunction(element);
      });
    } else {
      element.addEventListener("click", () => {
        popupOpenFunction(element);
      });
    }
  });
  // Popup close listener
  const popupCloseFunctionByID = (ID) => {
    const popup = document.querySelector(`#${ID}`);
    popup.style.animation = "popupCloseAnimation 0.5s forwards";
    setTimeout(function() {
      popup.style.display = "none";
    }, 500);
    document.body.style.overflow = "auto";
  }
  document.querySelectorAll("[data-popup-close-target]").forEach((element) => {
    element.addEventListener("click", () => {
      const popup = document.querySelector(`#${element.getAttribute("data-popup-close-target")}`);
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function() {
        popup.style.display = "none";
      }, 500);
      document.body.style.overflow = "auto";
    });
  });

  /////////////// Todo popup functions ///////////////
  // Add todo button listener
  document.querySelector("#todo-add-task").addEventListener("click", (event) => {
    event.preventDefault();
    const todoInput = document.querySelector("#todo-input");
    const todoText = todoInput.value;

    if (todoText.trim() !== "") {
      const todoItemContainer = document.createElement("div");
      todoItemContainer.classList.add("todo-item-container");

      const todoTextElement = document.createElement("div");
      todoTextElement.classList.add("todo-text");
      todoTextElement.textContent = todoText;

      todoItemContainer.appendChild(todoTextElement);

      const todoItem = document.createElement("div");
      todoItem.setAttribute("data-popup-open-target", "todo-item-popup");
      todoItem.setAttribute("data-target-popup-type", "todo-item-popup");
      todoItem.setAttribute("data-task-id", "");
      todoItem.classList.add("todo-item");
      todoItem.addEventListener("click", (element) => {
        todoPopupOpenFunction(element.target);
      });
      todoItem.appendChild(todoItemContainer);

      document.querySelector(".todo-list-container").appendChild(todoItem);

      todoInput.value = "";

      popupCloseFunctionByID("todo-popup");
    }
  });
  // Todo item delete button
  document.querySelector("#todo-item-delete").addEventListener("click", (event) => {
    event.preventDefault();
      console.log("Delete button clicked");

      const form = new FormData();
      form.append("taskID", document.querySelector("#todo-item-popup").getAttribute("data-task-id-storage"));

      await fetch("assets/php/removeTodos.php", 
         {
            method: "POST",
            body: form
         }
      )
      .then(response => response.json())
      .then(data => {
         if (data.success) {
            loadTodos();
         }
      })
      .catch(error => console.log(error));

    popupCloseFunctionByID("todo-item-popup");
  });

  var saveButton = document.querySelector("#todo-item-save");
  saveButton.classList.add("hide");

  var textArea = document.querySelector("#task-input.todo-textarea");
  textArea.addEventListener("keyup", function(event) {
    saveButton.classList.remove("hide");
    if (popup.style.display = "none") {
      saveButton.classList.add("hide");
    }
  })

  // Todo Save button
  document.querySelector("#todo-item-save").addEventListener("click", (event) => {

    event.preventDefault();
    popupCloseFunctionByID("todo-item-popup");
  });
  // Load todos on load
  const loadTodos = async () => {
    const form = new FormData();
    form.append('username', getCookie('username'));

    await fetch('assets/php/getTodos.php', {
      method: 'POST',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        document.querySelector("#todo-list").querySelectorAll("*").forEach(n => n.remove());
        data.todos.forEach(todo => {
          const divTodoItem = document.createElement('div');
          divTodoItem.classList.add('todo-item');
          divTodoItem.setAttribute('data-popup-open-target', 'todo-item-popup');
          divTodoItem.setAttribute('data-target-popup-type', 'todo-item-popup');
          divTodoItem.setAttribute('data-task-id', todo.taskID);

          const divTodoItemContainer = document.createElement('div');
          divTodoItemContainer.classList.add('todo-item-container');
          divTodoItem.appendChild(divTodoItemContainer);

          const divTodoItemText = document.createElement('div');
          divTodoItemText.classList.add('todo-text');
          divTodoItemText.textContent = todo.taskName;
          divTodoItemContainer.appendChild(divTodoItemText);

          divTodoItem.addEventListener("click", (element) => todoPopupOpenFunction(element.target));
          document.querySelector('#todo-list').appendChild(divTodoItem);



        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  if (getCookie('username') !== null) {
    loadTodos();
  }

  /////////////// Leaderboard popup functions ///////////////
  // Leaderboard switch button
  document.querySelector("#leaderboard-switch-button").addEventListener("click", () => {
    if (document.querySelector("#leaderboard-all-time").classList.contains("hide")) {
      document.querySelector("#leaderboard-all-time").classList.remove("hide");
      document.querySelector("#leaderboard-weekly").classList.add("hide");
    } else {
      document.querySelector("#leaderboard-all-time").classList.add("hide");
      document.querySelector("#leaderboard-weekly").classList.remove("hide");
    }
  });

  /////////////// Login popup functions ///////////////
  // Login page switch button
  document.querySelector("#go-to-registration").addEventListener("click", () => {
    // Remove all elements from the page
    document.querySelector("#registration-page").classList.remove("hide");
    document.querySelector("#login-page").classList.add("hide");
  });
  // Login submit button
  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await fetch('assets/php/login.php', {
      method: 'POST',
      body: new FormData(event.target)
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Error with the response from the database');
      }
    }).then(data => {
      if (data["success"] === true) {
        setCookie('username', data["username"]);
        loadTodos();
        popupCloseFunctionByID("login-popup");
        event.target.reset();
      } else {
        console.log(data);
        console.log("Login failed");
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  });
  // Registration page switch button
  document.querySelector("#go-to-login").addEventListener("click", () => {
    // Remove all elements from the page
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.remove("hide");
  });
  // Registration submit button
  document.querySelector("#registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    popupCloseFunctionByID("login-popup");
    event.target.reset();
  });

  /////////////// Timer Buttons ///////////////
  // Start timer button
  let pomodoros = 0;
  let index = 0;
  const times = [25, 5, 25, 5, 25, 5, 25, 15];
  let currentTime;
  let pomoProgress = 0;
  document.querySelector("#timer-start-button").addEventListener("click", () => {
    if (!timer.isActive()) {
      if (timer.getCurrentPositionMS() === 0) {
        setTimerColor("var(--accent-color)");
        currentTime = times[index] * 1000; // Needs to be switched back to 60000 when testing is finished
        timer.setTimerLength(currentTime).startTimer();
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
          if (getNotificationPermission() && document.hasFocus() === false) {
            const notification = new Notification("Pomo Timer", {
              title: "Pomo Timer",
              body: `${times[index] === 25 ? "Its time for your break comeback and start the timer" : "Your break has finished comeback!"}`,
              lang: "en-GB",
              icon: "assets/images/favi.webp"
            });
            notification.onclick = function() {
              window.focus();
              notification.close();
            };
            notification.onshow = function() {
              setTimeout(() => {
                notification.close();
              }, 5000);
            };
            notification.onerror = function(error) {
              console.log("Notification error: " + error);
            };
          }
          if (index < 7) {
            index++;
            pomoProgress = pomoProgress + 12.5;
            setPomoCounterProgress(pomoProgress);
          } else {
            index = 0;
            pomodoros++;
            pomoProgress = 0;
            document.querySelector("#pomodoro-counter").textContent =
              pomodoros;
          }
        } else if (timer.getCurrentPositionMS() < quarterWay) {
          setTimerColor("var(--background-color)");
        } else if (timer.getCurrentPositionMS() < halfWay) {
          setTimerColor("orange");
        }
      }, 1000);
    }
  });
  // Pause timer button
  document.querySelector("#timer-pause-button").addEventListener("click", () => {
    timer.stopTimer();
  });
});

/////////////// Additional functions ///////////////
/**
 * Timer count down function
 * @param {int} value
 */
function setTimerProgress(value) {
  document.querySelector("#timer-circle-progress").setAttribute.bind(document.querySelector("#timer-circle-progress"))("stroke-dasharray", `${(value * 283).toFixed(0)} 283`);
}
const pomodoroCounterCircle = document.querySelector("#counter-circle");
const pomodoroCounterRadius = pomodoroCounterCircle.r.baseVal.value;
const pomodoroCounterCircumference = pomodoroCounterRadius * 2 * Math.PI;
pomodoroCounterCircle.style.strokeDasharray = `${pomodoroCounterCircumference} ${pomodoroCounterCircumference}`;
pomodoroCounterCircle.style.strokeDashoffset = `${pomodoroCounterCircumference}`;
/**
 * Pomo counter progress function
 * @param {Number} percent
 */
function setPomoCounterProgress(percent) {
  pomodoroCounterCircle.style.strokeDashoffset = pomodoroCounterCircumference - (percent / 100) * pomodoroCounterCircumference;
}
/**
 * Timer colour function
 * @param {String} input
 */
function setTimerColor(input) {
  document.querySelector("#timer-circle-progress").style.stroke = input == null ? "green" : input;
}
/**
 * Milliseconds to timestamp
 * @param {Number} s
 * @returns {String}
 */
function msToTime(s) {
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;

  return `${pad(mins)}:${pad(secs)}`;
}
/**
 * Notification permission getter
 * @returns {Boolean}
 */
function getNotificationPermission() {
  if (isIOS()) {
    return false;
  }
  return Notification.permission === "granted";
}
/**
 * Check if the user is using an iOS device
 * @returns {Boolean}
 */
function isIOS() {
  const browserInfo = navigator.userAgent.toLowerCase();

  if (/iphone/.exec(browserInfo) || /ipad/.exec(browserInfo)) {
    return true;
  }

  return !![
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platforms);
}
/**
 * setCookie
 * Stores a cookie with the name and value that's provided
 * @param {String} name The name of the cookie
 * @param {any} value The value of the cookie
 * @param {"Strict" | "Lax" | "None"} SameSite The type of SameSite to use
 */
const setCookie = function(name, value, SameSite = "Strict") {
  const date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value || ""}; expires=${date.toString()}; SameSite=${SameSite}; path=/`;
}
/**
 * deleteCookie
 * Deletes the cookie with the provided name
 * @param {String} name The name of the cookie
 */
const deleteCookie = function(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
/**
 * getCookie
 * Get's the value of the cookie with the provided name
 * @param {String} name The name of the cookie
 * @returns {any} The value of the cookie
 */
const getCookie = function(name) {
  const nameEQ = name + "=";
  for (let cookie of document.cookie.split(';')) {
    while (cookie.startsWith(' ')) {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}
