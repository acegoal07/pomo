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
}
window.ondrop = function () {
   return false;
}
// Onload handler
window.addEventListener('load', () => {
   /////////////// Onload changes ///////////////
   if (!getNotificationPermission() && !isIOS()) {
      Notification.requestPermission();
   }
   setTimerColor("var(--background-color)");
   document.querySelector("#timer-circle-progress").classList.add("timer-circle-progress-transition");

   /////////////// Universal Popup functions ///////////////
   // Popup open listener
   document.querySelectorAll("[data-popup-open-target]").forEach((element) => {
      element.addEventListener('click', () => {
         const popup = document.querySelector(`#${element.getAttribute("data-popup-open-target")}`);
         popup.style.animation = "popupOpenAnimation 0.5s forwards";
         popup.style.display = "flex";
      });
   });
   // Popup close listener
   document.querySelectorAll("[data-popup-close-target]").forEach((element) => {
      element.addEventListener('click', () => {
         const popup = document.querySelector(`#${element.getAttribute("data-popup-close-target")}`);
         popup.style.animation = "popupCloseAnimation 0.5s forwards";
         setTimeout(function () {
            popup.style.display = "none";
         }, 500);
      });
   });

   /////////////// Todo popup functions ///////////////
   // Add todo button listener
   document.querySelector("#addTodoButton").addEventListener("click", (event) => {
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
         todoItem.classList.add("todo-item");
         todoItem.appendChild(todoItemContainer);

         document.querySelector(".todo-list-container").appendChild(todoItem);

         todoInput.value = "";

         const popup = document.querySelector("#todo-popup");
         popup.style.animation = "popupCloseAnimation 0.5s forwards";
         setTimeout(function () {
            popup.style.display = "none";
         }, 500);
      }
   });

   /////////////// Leaderboard popup functions ///////////////
   // Leaderboard switch button
   document.querySelector("#leaderboard-switch-button").addEventListener('click', () => {
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
   document.querySelector("#go-to-registration").addEventListener('click', () => {
      // Remove all elements from the page
      document.querySelector("#registration-page").classList.remove("hide");
      document.querySelector("#login-page").classList.add("hide");
   });
   // Login submit button
   document.querySelector("#login-form").addEventListener('submit', (event) => {
      event.preventDefault();
      event.target.reset();
      const popup = document.querySelector("#login-popup");
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
   });
   // Registration page switch button
   document.querySelector("#go-to-login").addEventListener('click', () => {
      // Remove all elements from the page
      document.querySelector("#registration-page").classList.add("hide");
      document.querySelector("#login-page").classList.remove("hide");
   });
   // Registration submit button
   document.querySelector("#registration-form").addEventListener('submit', (event) => {
      event.preventDefault();
      event.target.reset();
      const popup = document.querySelector("#login-popup");
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
   });

   /////////////// Timer Buttons ///////////////
   // Start timer button
   let pomodoros = 0;
   let index = 0;
   const times = [25, 5, 25, 5, 25, 5, 25, 15];
   let currentTime;
   let pomoProgress = 0;
   document.querySelector("#timer-start-button").addEventListener('click', () => {
      if (!timer.isActive()) {
         if (timer.getCurrentPositionMS() === 0) {
            setTimerColor("var(--accent-color)");
            currentTime = times[index] * 1000; // Needs to be switched back to 60000 when testing is finished
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
                  }
               }
               if (index < 7) {
                  index++;
                  pomoProgress = pomoProgress + 12.5;
                  setPomoCounterProgress(pomoProgress);
               } else {
                  index = 0;
                  pomodoros++;
                  pomoProgress = 0;
                  document.querySelector('#pomodoro-counter').textContent = pomodoros;
               }
            } else if (timer.getCurrentPositionMS() < quarterWay) {
               setTimerColor("var(--background-color)");
            } else if (timer.getCurrentPositionMS() < halfWay) {
               setTimerColor("orange");
            } else {
               void (0);
            }
         }, 1000);
      }
   });
   // Pause timer button
   document.querySelector("#timer-pause-button").addEventListener('click', () => {
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
const pomodoroCounterCircle = document.querySelector('#counter-circle');
const pomodoroCounterRadius = pomodoroCounterCircle.r.baseVal.value;
const pomodoroCounterCircumference = pomodoroCounterRadius * 2 * Math.PI;
pomodoroCounterCircle.style.strokeDasharray = `${pomodoroCounterCircumference} ${pomodoroCounterCircumference}`;
pomodoroCounterCircle.style.strokeDashoffset = `${pomodoroCounterCircumference}`;
/**
 * Pomo counter progress function
 * @param {Number} percent
 */
function setPomoCounterProgress(percent) {
   pomodoroCounterCircle.style.strokeDashoffset = pomodoroCounterCircumference - percent / 100 * pomodoroCounterCircumference;
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
      return ('00' + n).slice(-z);
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

   return !!(['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platforms));
}