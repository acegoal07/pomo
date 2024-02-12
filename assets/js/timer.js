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






exports.timer_class = class {
  constructor() {
    this.workLengthMS;
    this.currentWorkPositionMS;
    this.breakLengthMS;
    this.currentBreakPositionMS;
  }

  /**
   * @param {Boolean} isDefault
   * @param {int} customInput
   * @returns {exports.timer_class}
   */
  setWorkTimer(isDefault == true, customInput) {
    if (isDefault) {
      this.workLengthMS = 25 * 60 * 1000;
    } else {
      this.workLengthMS = customInput * 60 * 1000;
    }
    return this;
  }

  /**
   * @param {Boolean} isDefault
   * @param {int} customInput
   * @returns {exports.timer_class}
   */
  setBreakTimer(isDefault == true, customInput) {
    if (isDefault) {
      this.BreakeLengthMS = 5 * 60 * 1000;
    } else {
      this.breakLenghtMS = customInput * 60 * 1000;
    }
    return this;
  }

  /**
   * returns {int}
   */
  getCurrentPositionMS() {
    return this.currentPositionMS;
  }

  /**
   * returns {int}
   */
  getCurrentPosition() {
    return (this.currentPositionMS / 1000) * 60;
  }

  /**
   * @param {int} ms
   */
  setCurrentWorkPositionMS(ms) {
    this.currentPositionMS = ms;
  }

  /**
   * @param {int} ms
   */
  setCurrentBreakPositionMS(ms) {
    this.currentBreakPositionMS = ms;
  }
}