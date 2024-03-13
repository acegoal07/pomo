const timer=new PomoTimer,docTitle=document.title;function setTimerProgress(e){document.querySelector("#timer-path-remaining").setAttribute.bind(document.querySelector("#timer-path-remaining"))("stroke-dasharray",`${(283*e).toFixed(0)} 283`)}window.onblur=function(){timer.setBlurred(!0)},window.onfocus=function(){timer.setBlurred(!1),document.title=docTitle},window.ondragstart=function(){return!1},window.ondrop=function(){return!1},window.addEventListener("load",(()=>{getNotificationPermission()||isIOS()||Notification.requestPermission(),setTimerColor("var(--background-color)"),document.querySelector("#timer-path-remaining").classList.add("path-remaining-transition"),document.querySelector("#todo-add-button").addEventListener("click",(()=>{const e=document.querySelector("#todo-popup");e.style.animation="popupOpenAnimation 0.5s forwards",e.style.display="flex"})),document.querySelector("#todo-close-popup").addEventListener("click",(()=>{const e=document.querySelector("#todo-popup");e.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){e.style.display="none"}),500)})),document.querySelector("#addTodoButton").addEventListener("click",(e=>{e.preventDefault();const o=document.querySelector("#todo-input"),t=o.value;if(""!==t.trim()){const e=document.createElement("div");e.classList.add("todo-item-container");const r=document.createElement("div");r.classList.add("todo-text"),r.textContent=t,e.appendChild(r);const n=document.createElement("div");n.classList.add("todo-item"),n.appendChild(e),document.querySelector(".todo-list-container").appendChild(n),o.value="";const i=document.querySelector("#todo-popup");i.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){i.style.display="none"}),500)}})),document.querySelector("#leaderboardButton").addEventListener("click",(()=>{const e=document.querySelector("#leaderboard-popup");e.style.animation="popupOpenAnimation 0.5s forwards",e.style.display="flex"})),document.querySelector("#leaderboard-close-popup").addEventListener("click",(()=>{const e=document.querySelector("#leaderboard-popup");e.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){e.style.display="none"}),500)})),document.querySelector("#leaderboard-switch-button").addEventListener("click",(()=>{document.querySelector("#leaderboard-all-time").classList.contains("hide")?(document.querySelector("#leaderboard-all-time").classList.remove("hide"),document.querySelector("#leaderboard-weekly").classList.add("hide")):(document.querySelector("#leaderboard-all-time").classList.add("hide"),document.querySelector("#leaderboard-weekly").classList.remove("hide"))})),document.querySelector("#loginButton").addEventListener("click",(()=>{const e=document.querySelector("#login-popup");e.style.animation="popupOpenAnimation 0.5s forwards",e.style.display="flex"})),document.querySelector("#login-close-popup").addEventListener("click",(()=>{const e=document.querySelector("#login-popup");e.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){e.style.display="none"}),500)})),document.querySelector("#go-to-registration").addEventListener("click",(()=>{document.querySelector("#registration-page").classList.remove("hide"),document.querySelector("#login-page").classList.add("hide")})),document.querySelector("#login-form").addEventListener("submit",(e=>{e.preventDefault(),e.target.reset();const o=document.querySelector("#login-popup");o.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){o.style.display="none"}),500)})),document.querySelector("#go-to-login").addEventListener("click",(()=>{document.querySelector("#registration-page").classList.add("hide"),document.querySelector("#login-page").classList.remove("hide")})),document.querySelector("#registration-form").addEventListener("submit",(e=>{e.preventDefault(),e.target.reset();const o=document.querySelector("#login-popup");o.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){o.style.display="none"}),500)}));let e=0,o=0;const t=[25,5,25,5,25,5,25,15];let r,n=0;document.querySelector("#startButton").addEventListener("click",(()=>{if(!timer.isActive()){0===timer.getCurrentPositionMS()?(setTimerColor("var(--accent-color)"),r=1e3*t[o],timer.setTimerLength(r).startTimer()):timer.startTimer();const i=timer.timerLengthMS/2,s=timer.timerLengthMS/4,c=setInterval((()=>{if(-1e3===timer.getCurrentPositionMS()){if(clearInterval(c),timer.stopTimer(),timer.setCurrentPositionMS(0),getNotificationPermission()&&!1===document.hasFocus()){const e=new Notification("Pomo Timer",{title:"Pomo Timer",body:""+(25===t[o]?"Its time for your break comeback and start the timer":"Your break has finished comeback!"),lang:"en-GB",icon:"assets/images/favi.webp"});e.onclick=function(){window.focus(),e.close()},e.onshow=function(){setTimeout((()=>{e.close()}),5e3)},e.onerror=function(e){}}o<7?(o++,n+=12.5,setPomoCounterProgress(n)):(o=0,e++,n=0,document.querySelector("#pomodoro-counter").textContent=e)}else timer.getCurrentPositionMS()<s?setTimerColor("var(--background-color)"):timer.getCurrentPositionMS()<i&&setTimerColor("orange")}),1e3)}})),document.querySelector("#pauseButton").addEventListener("click",(()=>{timer.stopTimer()}))}));const pomodoroCounterCircle=document.querySelector("#counter-circle"),pomodoroCounterRadius=pomodoroCounterCircle.r.baseVal.value,pomodoroCounterCircumference=2*pomodoroCounterRadius*Math.PI;function setPomoCounterProgress(e){pomodoroCounterCircle.style.strokeDashoffset=pomodoroCounterCircumference-e/100*pomodoroCounterCircumference}function setTimerColor(e){document.querySelector("#timer-path-remaining").style.stroke=null==e?"green":e}function msToTime(e){function o(e,o){return("00"+e).slice(-(o=o||2))}const t=(e=(e-e%1e3)/1e3)%60;return`${o((e=(e-t)/60)%60)}:${o(t)}`}function getNotificationPermission(){return!isIOS()&&"granted"===Notification.permission}function isIOS(){const e=navigator.userAgent.toLowerCase();return!(!/iphone/.exec(e)&&!/ipad/.exec(e))||!!["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platforms)}pomodoroCounterCircle.style.strokeDasharray=`${pomodoroCounterCircumference} ${pomodoroCounterCircumference}`,pomodoroCounterCircle.style.strokeDashoffset=`${pomodoroCounterCircumference}`;