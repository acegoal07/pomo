// window.addEventListener('load', () => {
//   document.querySelector(".timerRing").insertAdjacentHTML("afterbegin", '<div class="baseTimer"><svg class="base-timerSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g class="baseTimerCircle"><circle class="timerPathElapsed" cx="50" xy="50" r="45" /><path id="base-timer-path-remaining" stroke-dasharray="283" class="path-remaining ${remainingPathColour}" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path></g></svg><span id="timer"> <h1 id="timerText">25:00</h1> </span></div>');

// const colours = {
//   info: {
//     color: "green"
//   }
// }

// let remainingPathColour = colours.info.color;

  
// });

// function setCircleDashArray() {
//   const circleDashArray = '${( actualValue * FULL_DASH_ARRAY )}';
//   document.querySelector("#base-timer-path-remaining").setAttribute("stroke-dasharray", circleDashArray);
// }



window.addEventListener('load', () => {
  const colours = {
    info: {
      color: "green"
    }
  }

  let remainingPathColour = colours.info.color;

  document.querySelector(".timerRing").insertAdjacentHTML("afterbegin", '<div class="baseTimer"><svg class="base-timerSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g class="baseTimerCircle"><circle class="timerPathElapsed" cx="50" cy="50" r="45" /><path id="base-timer-path-remaining" stroke-dasharray="283" class="path-remaining ${remainingPathColour}" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path></g></svg><span id="timer"> <h1 id="timerText">25:00</h1> </span></div>');
});

function setCircleDashArray(actualValue, FULL_DASH_ARRAY) {
  const circleDashArray = `${(actualValue * FULL_DASH_ARRAY)}`;
  document.querySelector("#base-timer-path-remaining").setAttribute("stroke-dasharray", circleDashArray);
}
