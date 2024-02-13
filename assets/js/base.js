// Out of tab message
let doctitle = document.title;
window.onblur = function() {
  document.title = 'Come back!';
};
window.onfocus = function() {
  document.title = doctitle;
};

window.addEventListener('load', () => {
  document.querySelector("#todo-add-button").addEventListener('click', () => {
    alert("Add button clicked");
  });

  document.querySelector("#startButton").addEventListener('click', () => {
    alert("Start button clicked");
  });

  document.querySelector("#stopButton").addEventListener('click', () => {
    alert("Stop button clicked");
  });
  
});