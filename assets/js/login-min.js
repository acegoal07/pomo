window.addEventListener("load",(()=>{const e=document.querySelector("#login-form");e.addEventListener("submit",(async()=>{await fetch("assets/php/login.php",{method:"POST",body:new FormData(e)}).then((e=>{if(e.ok)return e.json()})).then((e=>{})).catch((e=>{}))}))}));