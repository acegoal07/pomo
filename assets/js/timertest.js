const { pomoTimer } = require("./timer");

const timer = new pomoTimer();

timer.setTimerLength(25 * 60 * 100)
   .startTimer();

console.log(timer);

const test = setInterval(() => {
   console.log(timer.getCurrentPosition());
   console.log(timer.getCurrentPositionMS());
   if (timer.getCurrentPositionMS() === 1491000) {
      clearInterval(test);
      timer.stopTimer();
      console.log(timer);
   }
}, 1000);