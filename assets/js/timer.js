class pomoTimer{
  constructor() {
    this.timerLengthMS = null;
    this.currentPositionMS = null;
    this.timerActive = false;
    this.pomodoros = 0;
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
   */
  addPomodoros(pomodoros) {
    this.pomodoros += pomodoros;
  }

  startTimer() {
    this.timerActive = true;
    this.setCurrentPositionMS(this.timerLengthMS);
    const timer = setInterval(() => {
      if (this.currentPositionMS > 0 && this.timerActive) {
        this.currentPositionMS -= 1000;
      } else {
        clearInterval(timer);
        this.timerActive = false;
        this.currentPositionMS = 0;
      }
    }, 1000);
  }

  stopTimer() {
    this.timerActive = false;
  }
}


window.onload = function() {
  document.querySelector("#startButton").addEventListener('click', () => {
    const timer = new pomoTimer();

    timer.setTimerLength(25 * 60 * 1000)
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
  });
};