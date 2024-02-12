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
        this.breakLengthMS;
        this.currentPositionMS;
    }

    startTimer() {
        this.currentPositionMS = this.workLengthMS;
        this.timer = setInterval(() => {
            this.currentPositionMS -= 1000;
            if (this.currentPositionMS <= 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }
}