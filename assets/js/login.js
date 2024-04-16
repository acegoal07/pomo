window.addEventListener('load', function() {
   const loginForm = document.querySelector('#login-form');

   loginForm.addEventListener('submit', evt => authentication(evt));
});

async function authentication(evt) {
   evt.preventDefault();

   const formData = new FormData(evt.target);

   await fetch('assets/php/login.php', {
      method: 'POST',
      body: formData
   }).then(response => response.json())
   .then(data => {
      console.log(data);
   });
}