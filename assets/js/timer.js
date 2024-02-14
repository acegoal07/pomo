///////////////// Timer class //////////////////
class pomoTimer{
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
   * @returns {int}
   */
  getPomodoros() {
    return this.pomodoros;
  }

  /**
   * @param {int} pomodoros
   * @returns {pomoTimer}
   */
  addPomodoros(pomodoros) {
    this.pomodoros += pomodoros;
    return this;
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
      if (this.currentPositionMS > 0 && this.timerActive) {
        var minuteValue = Math.floor(this.currentPositionMS / 60000);        
        var secondValue = Math.floor((this.currentPositionMS % 60000) / 1000);
        if (secondValue.toString().length === 1) {
          secondValue = secondValue + "0";
        }
        var actualValue = minuteValue + ":" + secondValue;
        document.querySelector("#timerText").innerHTML = actualValue;
        setCircleDashArray();
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
  document.querySelector("#startButton").addEventListener('click', () => {

    if (!timer.isActive()) {
      if (timer.getCurrentPositionMS() === 0) {
        timer.setTimerLength(25 * 60 * 1000)
          .startTimer();        
      } else {
        timer.startTimer();
      }
       const timeDisplay = setInterval(() => {
        if (timer.getCurrentPositionMS() === 0) {
          clearInterval(timeDisplay);
          timer.stopTimer();
        }
      }, 1000);     
    }
  });

  document.querySelector("#pauseButton").addEventListener('click', () => {
    timer.stopTimer();
  });
  
};

