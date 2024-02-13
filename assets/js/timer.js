// Timer needs to be 25 minutes, 5 minutes x 4 then 15 minutes

const work = 25 * 60;
const shortBreak = 5 * 60;
const longBreak = 15 * 60;

let timer;

const pomodoros = 0;

function timer(time) {
  timer = time;
  setTimeout(() => {
    timer--;
    if (timer > 0) {
        timer(timer);
    }
  }, 1000);
}

function startPomodoro() {
  timer(work);
  timer(shortBreak);
  timer(work);
  timer(shortBreak);
  timer(work);
  timer(shortBreak);
  timer(work);
  timer(longBreak);
  pomodoros++;
}

//testing timer
console.log(timer(shortBreak));






exports.pomoTimer= class {
  constructor() {
    this.workLengthMS;
    this.currentWorkPositionMS;
    this.breakLengthMS;
    this.currentBreakPositionMS;
    this.timerActive = false;
    this.pomodoros = 0;
  }

  /**
   * @param {Boolean} isDefault
   * @param {int} customInput
   * @returns {pomoTimer}
   */
  setWorkTimer(isDefault = true, customInput = null) {
    if (isDefault && customInput === null) {
      this.workLengthMS = 25 * 60 * 1000;
    } else if (customInput !== null) {
      alert("Custom input should be null as isDefault is true!!!")
    } else {
      this.workLengthMS = customInput * 60 * 1000;
    }
    return this;
  }

  /**
   * @param {Boolean} isDefault
   * @param {int} customInput
   * @returns {pomoTimer}
   */
  setBreakTimer(isDefault = true, customInput = null) {
    if (isDefault && customInput === null) {
      this.BreakLengthMS = 5 * 60 * 1000;
    } else if (customInput !== null) {
      alert("Custom input should be null as isDefault is true!!!")
    } else {
      this.breakLengthMS = customInput * 60 * 1000;
    }
    return this;
  }

  /**
   * @returns {int}
   */
  getCurrentWorkPositionMS() {
    return this.currentWorkPositionMS;
  }

  /**
   * @returns {int}
   */
  getCurrentWorkPosition() {
    return (this.currentWorkPositionMS / 1000) * 60;
  }

  /**
   * @param {int} ms
   */
  setCurrentWorkPositionMS(ms) {
    this.currentWorkPositionMS = ms;
  }

  /**
   * @returns {int}
   */
  getCurrentBreakPositionMS() {
    return this.currentBreakPositionMS;
  }

  /**
   * @returns {int}
   */
  getCurrentBreakPosition() {
    return (this.currentBreakPositionMS / 1000) * 60;
  }

  /**
   * @param {int} ms
   */
  setCurrentBreakPositionMS(ms) {
    this.currentBreakPositionMS = ms;
  }

  /**
   * @returns {int}
   */
  getPomodoros() {
    return this.pomodoros;
  }

  /**
   * @param {int} pomodoros
   */
  addPomodoros(pomodoros) {
    this.pomodoros += pomodoros;
  }

  startTimer() {
    this.timerActive = true;
    do {
      let workTimer = setInterval(() => {
        if (this.currentWorkPositionMS <= 0) {
          clearInterval(workTimer);
          this.startBreakTimer();
        } else {
          this.currentWorkPositionMS -= 1000;
        }
      }, 1000);
    } while (this.currentWorkPositionMS > 0 && this.timerActive);
  }

  // Create a function to stop the timer
  stopTimer() {
    this.timerActive = false;
  }
}