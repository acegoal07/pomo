///////////////// Timer class //////////////////
class PomoTimer {
   constructor() {
      this.timerLengthMS = null;
      this.currentPositionMS = 0;
      this.timerActive = false;
      this.blurred = false;
      this.alarmActive = false;
   }

   /**
    * @param {int} msInput
    * @returns {PomoTimer}
    */
   setTimerLength(msInput) {
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
    * @returns {PomoTimer}
    */
   setCurrentPositionMS(ms) {
      this.currentPositionMS = ms;
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
    * @returns {PomoTimer}
    */
   setBlurred(bool) {
      this.blurred = bool;
      return this;
   }

   startTimer() {
      if (this.getCurrentPositionMS() === 0) {
         this.setCurrentPositionMS(this.timerLengthMS);
      }
      this.timerActive = true;
      const timer = setInterval(() => {
         if (this.isActive()) {
            if (this.getCurrentPositionMS() === 0 && !this.alarmActive) {
               this.timerActive = false;
               // this.playAlarm();
            }
            const actualValue = this.getCurrentPositionMS == 0 ? "00:00" : msToTime(this.getCurrentPositionMS());
            document.querySelector("#timer-text").innerHTML = actualValue;

            setTimerProgress(this.getCurrentPositionMS() / this.timerLengthMS);

            if (this.blurred) {
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
         if (!this.alarmActive) {
            alarmAudio.pause();
         }
      }, 100);
   }
}