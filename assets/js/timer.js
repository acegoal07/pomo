///////////////// Timer class //////////////////
class pomoTimer {
  constructor() {
    this.timerLengthMS = null;
    this.currentPositionMS = 0;
    this.timerActive = false;
    this.blured = false;
    this.alarmActive = false;
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
    const timer = setInterval(() => {
      if (this.isActive()) {
        if (this.getCurrentPositionMS() === 0 && !this.audioActive) {
          this.timerActive = false;
          // this.playAlarm();
        }
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
    // this.alarmActive = false;
  }

  stopTimer() {
    this.timerActive = false;
  }

  playAlarm() {
    const alarmAudio = new Audio('assets/sounds/digitalAlarm.wav');
    alarmAudio.addEventListener("ended", () => {
      this.alarmActive = false;
      console.log("Audio ended TEST");
    })
    alarmAudio.play();
    this.alarmActive = true;
    setInterval(() => {
      if (!this.audioActive) {
        alarmAudio.pause();
      }
    }, 10);
  }
}