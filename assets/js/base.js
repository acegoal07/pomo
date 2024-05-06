// Timer class caller
const timer = new PomoTimer();
// Focus listener
const docTitle = document.title;
window.onblur = function () {
   timer.setBlurred(true);
};
window.onfocus = function () {
   timer.setBlurred(false);
   document.title = docTitle;
};
// Disable drag and drop
window.ondragstart = function () {
   return false;
};
window.ondrop = function () {
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
   // Popup open functions
   const popupOpenFunction = (element) => {
      const popup = document.querySelector(`#${element.getAttribute("data-popup-open-target")}`);
      popup.style.animation = "popupOpenAnimation 0.5s forwards";
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
   };
   const todoPopupOpenFunction = (element) => {
      popupOpenFunction(element);
      document.querySelector("#task-input").value = element.querySelector(".todo-text").textContent.trim();
      document.querySelector("#todo-item-popup").setAttribute("data-task-id-storage", element.getAttribute("data-task-id"));
      document.querySelector("#todo-item-save").classList.add("hide");
   };
   // Popup open listener and setter
   document.querySelectorAll("[data-popup-open-target]").forEach((element) => {
      if (element.getAttribute("data-target-popup-type") === "todo-item-popup") {
         element.addEventListener("click", () => {
            todoPopupOpenFunction(element);
         });
      } else if (element.getAttribute("data-target-popup-type") === "information-popup") {
         element.addEventListener("click", () => {
            popupOpenFunction(element);
            const flkty = Flickity.data(document.querySelector('.main-carousel'));
            for (let i = 0; i < 50; i++) {
               flkty.resize();
            }
         });
      } else if (element.getAttribute("data-target-popup-type") === "create-todo-popup") {
         element.addEventListener("click", () => {
            if (getCookie('username') !== null) {
               popupOpenFunction(element);
            }
         });
      } else {
         element.addEventListener("click", () => {
            popupOpenFunction(element);
         });
      }
   });
   // Popup close functions
   const popupCloseFunctionByID = (ID) => {
      const popup = document.querySelector(`#${ID}`);
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
      document.body.style.overflow = "auto";
   };
   // Popup close listener and setter
   document.querySelectorAll("[data-popup-close-target]").forEach((element) => {
      element.addEventListener("click", () => {
         const popup = document.querySelector(`#${element.getAttribute("data-popup-close-target")}`);
         popup.style.animation = "popupCloseAnimation 0.5s forwards";
         setTimeout(function () {
            popup.style.display = "none";
         }, 500);
         document.body.style.overflow = "auto";
      });
   });

   /////////////// Todo popup functions ///////////////
   // Add todo button listener
   document.querySelector("#todo-add-task").addEventListener("click", async (event) => {
      event.preventDefault();
      const todoInput = document.querySelector("#todo-input");
      const todoText = todoInput.value;
      const form = new FormData();
      form.append("requestType", "createTodo");
      form.append("username", getCookie('username'));
      form.append("taskContent", todoText);
      await fetch("assets/php/database.php",
         {
            method: "POST",
            body: form
         }
      )
         .then(response => response.json())
         .then(data => {
            if (data.success) {
               loadTodos();
               todoInput.value = "";
               popupCloseFunctionByID("todo-popup");
            } else {
               console.log("Error creating task: " + data);
            }
         })
         .catch(error => console.log(error));
   });
   // Todo item delete button
   document.querySelector("#todo-item-delete").addEventListener("click", async (event) => {
      event.preventDefault();
      const form = new FormData();
      form.append("requestType", "deleteTodo");
      form.append("taskID", document.querySelector("#todo-item-popup").getAttribute("data-task-id-storage"));
      await fetch("assets/php/database.php",
         {
            method: "POST",
            body: form
         }
      )
         .then(response => response.json())
         .then(data => {
            if (data.success) {
               loadTodos();
            } else {
               console.log("Failed to delete todo: " + data);
            }
         })
         .catch(error => console.log(error));
      popupCloseFunctionByID("todo-item-popup");
   });
   // Todo Save button
   document.querySelector("#todo-item-save").addEventListener("click", async (event) => {
      event.preventDefault();
      const form = new FormData();
      form.append("requestType", "editTodo");
      form.append("taskID", document.querySelector("#todo-item-popup").getAttribute("data-task-id-storage"));
      form.append("taskContent", document.querySelector("#task-input").value);
      await fetch("assets/php/database.php", {
         method: "POST",
         body: form
      })
         .then(response => response.json())
         .then(() => {
            popupCloseFunctionByID("todo-item-popup");
            loadTodos();
         })
         .catch(error => console.error('Error saving changes to todo:', error));
   });
   // Todo input keyup listener
   document.querySelector("#task-input").addEventListener("keyup", () => {
      if (document.querySelector("#todo-item-popup").style.display === "flex") {
         document.querySelector("#todo-item-save").classList.remove("hide");
      }
   })

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

   /////////////// User onload auto login ///////////////
   if (getCookie('username') !== null) {
      document.querySelector("#todo-create-button").classList.remove("disabled");
      document.querySelector("#login-page").classList.add("hide");
      document.querySelector("#user-page").classList.remove("hide");
      setPomoCounter(getCookie('fullPomoScore'), getCookie('partialPomoScore'));
      loadTodos();
   }

   /////////////// User popup functions ///////////////
   // Login page switch button
   document.querySelector("#go-to-registration").addEventListener("click", () => {
      // Remove all elements from the page
      document.querySelector("#registration-page").classList.remove("hide");
      document.querySelector("#login-page").classList.add("hide");
   });
   // Login submit button
   document.querySelector("#login-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      form.append('requestType', 'login');
      await fetch('assets/php/database.php', {
         method: 'POST',
         body: form
      }).then(response => {
         if (response.ok) {
            return response.json();
         } else {
            console.log('Error with the response from the database');
         }
      }).then(data => {
         if (data["success"] === true) {
            if (getCookie('username') === null) {
               document.querySelector("#todo-create-button").classList.remove("disabled");
            }
            setCookie('username', form.get('username'));
            setCookie('fullPomoScore', data.fullPomoScore);
            setCookie('partialPomoScore', data.partialPomoScore);
            setPomoCounter(data.fullPomoScore, data.partialPomoScore);
            loadTodos();
            popupCloseFunctionByID("login-popup");
            document.querySelector("#login-page").classList.add("hide");
            document.querySelector("#user-page").classList.remove("hide");
            event.target.reset();
         } else {
            console.log("Login failed: " + data);
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
   // Change password submit button
   document.querySelector("#change-password-form").addEventListener("submit", (event) => {
      event.preventDefault();
      event.target.reset();
      popupCloseFunctionByID("login-popup");
   });
   // Logout button
   document.querySelector("#user-logout-button").addEventListener("click", (event) => {
      event.preventDefault();
      deleteCookie('username');
      deleteCookie('fullPomoScore');
      deleteCookie('partialPomoScore');
      popupCloseFunctionByID("login-popup");
      resetPomoCounter();
      loadTodos();
      document.querySelector("#todo-create-button").classList.add("disabled");
      document.querySelector("#user-page").classList.add("hide");
      document.querySelector("#login-page").classList.remove("hide");
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
            currentTime = times[index] * 60000;
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
                  notification.onclick = function () {
                     window.focus();
                     notification.close();
                  };
                  notification.onshow = function () {
                     setTimeout(() => {
                        notification.close();
                     }, 5000);
                  };
                  notification.onerror = function (error) {
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
                  document.querySelector("#pomodoro-counter").textContent = pomodoros;
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

/////////////// Timer functions ///////////////
/**
 * Set timer progress
 * @param {int} value
 */
function setTimerProgress(value) {
   document.querySelector("#timer-circle-progress").setAttribute.bind(document.querySelector("#timer-circle-progress"))("stroke-dasharray", `${(value * 283).toFixed(0)} 283`);
}
/**
 * Timer colour function
 * @param {String} input
 */
function setTimerColor(input) {
   document.querySelector("#timer-circle-progress").style.stroke = input == null ? "green" : input;
}

/////////////// Pomo Counter functions ///////////////
/**
 * Set pomo counter
 * @param {Integer} fullPomoScore
 * @param {Integer} partialPomoScore
 */
const setPomoCounter = (fullPomoScore, partialPomoScore) => {
   document.querySelector("#pomodoro-counter").textContent = fullPomoScore;
   setPomoCounterProgress(12.5 * partialPomoScore);
};
/**
 * Reset pomo counter
 */
const resetPomoCounter = () => {
   document.querySelector("#pomodoro-counter").textContent = "0";
   setPomoCounterProgress(0);
};
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

/////////////// Todo functions ///////////////
/**
 * Load todos
 */
const loadTodos = async () => {
   const form = new FormData();
   form.append('requestType', 'getTodos')
   form.append('username', getCookie('username'));
   await fetch('assets/php/database.php', {
      method: 'POST',
      body: form
   })
      .then(response => response.json())
      .then(data => {
         document.querySelector("#todo-list").querySelectorAll("*").forEach(n => n.remove());
         if (data.success) {
            if (data.todos) {
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

                  divTodoItem.addEventListener("click", () => todoPopupOpenFunction(divTodoItem));
                  document.querySelector('#todo-list').appendChild(divTodoItem);
               });
            }
         } else {
            console.log('Failed to load todos: ' + data);
         }
      })
      .catch(error => {
         console.error('Error:', error);
      });
};

/////////////// Helper functions ///////////////
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
const setCookie = function (name, value, SameSite = "Strict") {
   const date = new Date();
   date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
   document.cookie = `${name}=${value || ""}; expires=${date.toString()}; SameSite=${SameSite}; path=/`;
}
/**
 * deleteCookie
 * Deletes the cookie with the provided name
 * @param {String} name The name of the cookie
 * @param {"Strict" | "Lax" | "None"} SameSite The type of SameSite to use
 */
const deleteCookie = function (name, SameSite = "Strict") {
   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=${SameSite}; path=/;`;
}
/**
 * getCookie
 * Get's the value of the cookie with the provided name
 * @param {String} name The name of the cookie
 * @returns {any} The value of the cookie
 */
const getCookie = function (name) {
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