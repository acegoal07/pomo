window.addEventListener('load', async() => {
   this.document.querySelector('todo-list')

   await fetch('assets/php/getTodos.php', {
      method: 'POST',
      body: new FormData().append("username", "jeff")
   })
   .then(response => response.json())
   .then(data => {
      console.log(data);
   })
   .catch(error => {
      console.error(error);
   });
});