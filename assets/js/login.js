let loginForm;

window.addEventListener('load', () => {
   loginForm = document.querySelector('#login-form')
   loginForm.addEventListener('submit', authentication());
});

function authentication() {
   const formData = new FormData(loginForm);

   fetch('assets/php/login.php', {
      method: 'POST',
      body: formData
   })
   .then(response => {
      if (response.ok) {
         response.json()
      }
   })
   .then(data => {
      console.log(data);
   })
   .catch(error => {
      console.log(error) 
   });
}