window.addEventListener('load', () => {
  const colours = {
    info: {
      color: "green"
    }
  }

  let remainingPathColour = colours.info.color; //this is here so i can make it go red when time is nearly up


  document.querySelector(".timerRing").insertAdjacentHTML("afterbegin", '<div class="baseTimer"><svg class="base-timerSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g class="baseTimerCircle"><circle class="timerPathElapsed" cx="50" cy="50" r="45" /><path id="base-timer-path-remaining" stroke-dasharray="283" class="path-remaining" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path></g></svg><span id="timer"> <h1 id="timerText">25:00</h1> </span></div>');
});

function setCircleDashArray(value) {
  const circleDashArray = `${(value * 283).toFixed(0)} 283`;
  document.querySelector("#base-timer-path-remaining").setAttribute("stroke-dasharray", circleDashArray);
}