window.addEventListener('DOMContentLoaded', async() => {

   const form = new FormData();
   form.append('username', 'jeff');

   await fetch('assets/php/getTodos.php', {
      method: 'POST',
      body: form
   })
   .then(response => {
      console.log(response);
      return response.json();
   })
   .then(data => {
      data.todos[0].forEach(todo => {
         console.log(todo);
      });
   })
   .catch(error => {
      console.error('Error:', error);
   });
});