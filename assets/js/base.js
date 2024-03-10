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
// Onload handler
window.addEventListener('load', () => {
   /////////////// Onload changes ///////////////
   if (!getNotificationPermission() && !isIOS()) {
      Notification.requestPermission();
   }
   setTimerColor("var(--background-color)");
   document.querySelector("#base-timer-path-remaining").classList.add("path-remaining-transition");

   /////////////// Todo popup ///////////////
   // Open todo popup button listener
   document.querySelector("#todo-add-button").addEventListener('click', () => {
      if (document.querySelector("#leaderboard-popup").style.display === "block" || document.querySelector("#login-popup").style.display === "block") { return; }
      const popup = document.querySelector("#todo-popup");
      if (popup.style.display === "block") { return; }
      popup.style.animation = "popupOpenAnimation 0.5s forwards";
      popup.style.display = "block";
   });
   // Close todo popup button listener
   document.querySelector("#todo-close-popup").addEventListener('click', () => {
      const popup = document.querySelector("#todo-popup");
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
   });
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

   /////////////// Leaderboard popup ///////////////
   // Open leaderboard popup button
   document.querySelector("#leaderboardButton").addEventListener('click', () => {
      if (document.querySelector("#todo-popup").style.display === "block" || document.querySelector("#login-popup").style.display === "block") { return; }
      const popup = document.querySelector("#leaderboard-popup");
      if (popup.style.display === "block") { return; }
      popup.style.animation = "popupOpenAnimation 0.5s forwards";
      popup.style.display = "block";
   });
   // Close leaderboard popup button
   document.querySelector("#leaderboard-close-popup").addEventListener('click', () => {
      const popup = document.querySelector("#leaderboard-popup");
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
   });
   // Switch between all time and weekly leaderboard
   document.querySelector("#leaderboard-switch-button").addEventListener('click', () => {
   });

   /////////////// Login popup ///////////////
   // Open login popup button
   document.querySelector("#loginButton").addEventListener('click', () => {
      if (document.querySelector("#todo-popup").style.display === "block" || document.querySelector("#leaderboard-popup").style.display === "block") { return; }
      const popup = document.querySelector("#login-popup");
      if (popup.style.display === "block") { return; }
      popup.style.animation = "popupOpenAnimation 0.5s forwards";
      popup.style.display = "block";
   });
   // Close login popup button
   document.querySelector("#login-close-popup").addEventListener('click', () => {
      const popup = document.querySelector("#login-popup");
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
   });
   // Registration page switch button
   document.querySelector("#goToRegister").addEventListener('click', (event) => {
      event.preventDefault();
      // Remove all elements from the page
      document.querySelector("#registrationPage").classList.remove("hide");
      document.querySelector("#loginPage").classList.add("hide");
   });
   // Login page switch button
   document.querySelector("#goToLogin").addEventListener('click', (event) => {
      event.preventDefault();
      // Remove all elements from the page
      document.querySelector("#registrationPage").classList.add("hide");
      document.querySelector("#loginPage").classList.remove("hide");
   });
   // Login submit button
   document.querySelector("#loginForm").addEventListener('submit', (event) => {
      event.preventDefault();
   });

   /////////////// Timer Buttons ///////////////
   // Start timer button
   let pomodoros = 0;
   let index = 0;
   const times = [25, 5, 25, 5, 25, 5, 25, 15];
   let currentTime;

   document.querySelector("#startButton").addEventListener('click', () => {
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
               } else {
                  index = 0;
                  pomodoros++;
                  document.querySelector('#pomoCounter').textContent = pomodoros;
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
   document.querySelector("#base-timer-path-remaining").setAttribute.bind(document.querySelector("#base-timer-path-remaining"))("stroke-dasharray", `${(value * 283).toFixed(0)} 283`);
}
/**
 * Timer colour function
 * @param {String} input
 */
function setTimerColor(input) {
   document.querySelector("#base-timer-path-remaining").style.stroke = input == null ? "green" : input;
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