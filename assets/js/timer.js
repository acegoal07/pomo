///////////////// Timer class //////////////////
class pomoTimer {
  constructor() {
    this.timerLengthMS = null;
    this.currentPositionMS = 0;
    this.timerActive = false;
    this.pomodoros = 0;
    this.blured = false;
  }

  /**
   * @param {int} msInput
   * @returns {pomoTimer}
   */
  setTimerLength(msInput) {
    if (msInput < 0 || msInput === null) {
      throw new Error("Timer length must be greater than 0");
    }
    this.timerLengthMS = msInput;
    return this;
  }

  /**
   * @returns {int}
   */
  getCurrentPositionMS() {
    return this.currentPositionMS;
  }

  /**
   * @returns {int}
   */
  getCurrentPosition() {
    return (this.currentPositionMS / 1000) * 60;
  }

  /**
   * @param {int} ms
   */
  setCurrentPositionMS(ms) {
    this.currentPositionMS = ms;
  }

  /**
   * @returns {boolean}
   */
  isActive() {
    return this.timerActive;
  }

  /**
   * @param {boolean} bool
   * @returns {pomoTimer}
   */
  setBlured(bool) {
    this.blured = bool;
    return this;
  }

  startTimer() {
    if (this.getCurrentPositionMS() === 0) {
      this.setCurrentPositionMS(this.timerLengthMS);
    }
    this.timerActive = true;
    this.currentPositionMS -= 1000;
    const timer = setInterval(() => {
      if (this.isActive()) {
        if (this.getCurrentPositionMS() === 0) { this.timerActive = false; }
        const actualValue = this.getCurrentPositionMS === 0 ? "00:00" : msToTime(this.getCurrentPositionMS());
        document.querySelector("#timerText").innerHTML = actualValue;

        setCircleDashArray(this.getCurrentPositionMS() / this.timerLengthMS);

        if (this.blured) {
          document.title = actualValue;
        }
        this.currentPositionMS -= 1000;
      } else {
        clearInterval(timer);
        this.timerActive = false;
      }
    }, 1000);
  }

  stopTimer() {
    this.timerActive = false;
  }
}

///////////////// Eventhandlers and stuff //////////////////

const timer = new pomoTimer();

let doctitle = document.title;
window.onblur = function() {
  timer.setBlured(true);
};
window.onfocus = function() {
  timer.setBlured(false);
  document.title = doctitle;
};

window.onload = function() {
  // Start timer button
  document.querySelector("#startButton").addEventListener('click', () => {
    if (!timer.isActive()) {
      if (timer.getCurrentPositionMS() === 0) {
        timer.setTimerLength(10000)
          .startTimer();
        setTimerColor("green");
      } else {
        timer.startTimer();
      }
      const halfWay = timer.timerLengthMS / 2;
      const timeDisplay = setInterval(() => {
        if (timer.getCurrentPositionMS() === -1000) {
          clearInterval(timeDisplay);
          timer.stopTimer();
          timer.setCurrentPositionMS(0);
        } else if (timer.getCurrentPositionMS() === halfWay) {
          setTimerColor("blue");
        }
      }, 1000);
    }
  });
  // Pause timer button
  document.querySelector("#pauseButton").addEventListener('click', () => {
    timer.stopTimer();
  });
};

// Miliseconds to timestamp
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

  return hrs > 0 ? pad(hrs) + ':' + pad(mins) + ':' + pad(secs) : pad(mins) + ':' + pad(secs);
}