let loginForm;

window.addEventListener('load', () => {
   loginForm = document.querySelector('#login-form')
   loginForm.addEventListener('submit', authentication());
});

function authentication() {
   fetch('assets/php/login.php', {
      method: 'POST',
      body: new FormData(loginForm)
   }).then(response => {
      if (response.ok) {
         response.json()
      }
   }).then(data => {
      console.log(data);
   }).catch(error => {
      console.log(error)
   });
}