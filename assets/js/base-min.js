const timer=new PomoTimer,docTitle=document.title;function setTimerProgress(e){document.querySelector("#timer-circle-progress").setAttribute.bind(document.querySelector("#timer-circle-progress"))("stroke-dasharray",`${(283*e).toFixed(0)} 283`)}window.onblur=function(){timer.setBlurred(!0)},window.onfocus=function(){timer.setBlurred(!1),document.title=docTitle},window.ondragstart=function(){return!1},window.ondrop=function(){return!1},window.addEventListener("load",(()=>{getNotificationPermission()||isIOS()||Notification.requestPermission(),setTimerColor("var(--background-color)"),document.querySelector("#timer-circle-progress").classList.add("timer-circle-progress-transition"),document.querySelectorAll("[data-popup-open-target]").forEach((e=>{e.addEventListener("click",(()=>{const t=document.querySelector(`#${e.getAttribute("data-popup-open-target")}`);t.style.animation="popupOpenAnimation 0.5s forwards",t.style.display="flex"}))})),document.querySelectorAll("[data-popup-close-target]").forEach((e=>{e.addEventListener("click",(()=>{const t=document.querySelector(`#${e.getAttribute("data-popup-close-target")}`);t.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){t.style.display="none"}),500)}))})),document.querySelector("#addTodoButton").addEventListener("click",(e=>{e.preventDefault();const t=document.querySelector("#todo-input"),o=t.value;if(""!==o.trim()){const e=document.createElement("div");e.classList.add("todo-item-container");const r=document.createElement("div");r.classList.add("todo-text"),r.textContent=o,e.appendChild(r);const i=document.createElement("div");i.setAttribute("data-popup-open-target","todo-item-popup"),i.classList.add("todo-item"),i.appendChild(e),document.querySelector(".todo-list-container").appendChild(i),t.value="";const n=document.querySelector("#todo-popup");n.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){n.style.display="none"}),500)}})),document.querySelector("#leaderboard-switch-button").addEventListener("click",(()=>{document.querySelector("#leaderboard-all-time").classList.contains("hide")?(document.querySelector("#leaderboard-all-time").classList.remove("hide"),document.querySelector("#leaderboard-weekly").classList.add("hide")):(document.querySelector("#leaderboard-all-time").classList.add("hide"),document.querySelector("#leaderboard-weekly").classList.remove("hide"))})),document.querySelector("#go-to-registration").addEventListener("click",(()=>{document.querySelector("#registration-page").classList.remove("hide"),document.querySelector("#login-page").classList.add("hide")})),document.querySelector("#login-form").addEventListener("submit",(e=>{e.preventDefault(),e.target.reset();const t=document.querySelector("#login-popup");t.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){t.style.display="none"}),500)})),document.querySelector("#go-to-login").addEventListener("click",(()=>{document.querySelector("#registration-page").classList.add("hide"),document.querySelector("#login-page").classList.remove("hide")})),document.querySelector("#registration-form").addEventListener("submit",(e=>{e.preventDefault(),e.target.reset();const t=document.querySelector("#login-popup");t.style.animation="popupCloseAnimation 0.5s forwards",setTimeout((function(){t.style.display="none"}),500)}));let e=0,t=0;const o=[25,5,25,5,25,5,25,15];let r,i=0;document.querySelector("#timer-start-button").addEventListener("click",(()=>{if(!timer.isActive()){0===timer.getCurrentPositionMS()?(setTimerColor("var(--accent-color)"),r=1e3*o[t],timer.setTimerLength(r).startTimer()):timer.startTimer();const n=timer.timerLengthMS/2,s=timer.timerLengthMS/4,c=setInterval((()=>{if(-1e3===timer.getCurrentPositionMS()){if(clearInterval(c),timer.stopTimer(),timer.setCurrentPositionMS(0),getNotificationPermission()&&!1===document.hasFocus()){const e=new Notification("Pomo Timer",{title:"Pomo Timer",body:""+(25===o[t]?"Its time for your break comeback and start the timer":"Your break has finished comeback!"),lang:"en-GB",icon:"assets/images/favi.webp"});e.onclick=function(){window.focus(),e.close()},e.onshow=function(){setTimeout((()=>{e.close()}),5e3)},e.onerror=function(e){}}t<7?(t++,i+=12.5,setPomoCounterProgress(i)):(t=0,e++,i=0,document.querySelector("#pomodoro-counter").textContent=e)}else timer.getCurrentPositionMS()<s?setTimerColor("var(--background-color)"):timer.getCurrentPositionMS()<n&&setTimerColor("orange")}),1e3)}})),document.querySelector("#timer-pause-button").addEventListener("click",(()=>{timer.stopTimer()}))}));const pomodoroCounterCircle=document.querySelector("#counter-circle"),pomodoroCounterRadius=pomodoroCounterCircle.r.baseVal.value,pomodoroCounterCircumference=2*pomodoroCounterRadius*Math.PI;function setPomoCounterProgress(e){pomodoroCounterCircle.style.strokeDashoffset=pomodoroCounterCircumference-e/100*pomodoroCounterCircumference}function setTimerColor(e){document.querySelector("#timer-circle-progress").style.stroke=null==e?"green":e}function msToTime(e){function t(e,t){return("00"+e).slice(-(t=t||2))}const o=(e=(e-e%1e3)/1e3)%60;return`${t((e=(e-o)/60)%60)}:${t(o)}`}function getNotificationPermission(){return!isIOS()&&"granted"===Notification.permission}function isIOS(){const e=navigator.userAgent.toLowerCase();return!(!/iphone/.exec(e)&&!/ipad/.exec(e))||!!["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platforms)}pomodoroCounterCircle.style.strokeDasharray=`${pomodoroCounterCircumference} ${pomodoroCounterCircumference}`,pomodoroCounterCircle.style.strokeDashoffset=`${pomodoroCounterCircumference}`;