window.addEventListener('load', () => {
   document.querySelector('#login-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      await fetch('assets/php/login.php', {
         method: 'POST',
         body: new FormData(document.forms["login-form"])
      }).then(response => {
         console.log(response);
         return response.text();
      }).then(data => {
         console.log(data);
      }).catch(error => {
         console.log(error);
      });
      const popup = document.querySelector("#login-popup");
      popup.style.animation = "popupCloseAnimation 0.5s forwards";
      setTimeout(function () {
         popup.style.display = "none";
      }, 500);
      event.target.reset();
   });
});