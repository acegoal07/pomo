window.addEventListener('load', () => {
   const loginForm = document.querySelector('#login-form');
   loginForm.addEventListener('submit', async () => {
      await fetch('assets/php/login.php', {
         method: 'POST',
         body: new FormData(loginForm)
      }).then(response => {
         if (response.ok) {
            console.log(response);
            return response.json();
         }
      }).then(data => {
         console.log(data);
      }).catch(error => {
         console.log(error);
      });
   });
});