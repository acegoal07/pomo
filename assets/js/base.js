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
    document.querySelector("#popup").style.display = "block";
    document.querySelector("main").classList.add("blur-filter");
    document.querySelector("#todo-add-button").classList.remove("is-clickable");
  });

  // document.querySelector("#startButton").addEventListener('click', () => {
  //   alert("Start button clicked");
  // });

  document.querySelector("#pauseButton").addEventListener('click', () => {
    alert("Stop button clicked");
  });

});

function togglePopup() {
  var popup = document.getElementById("popup");
  if (popup.style.display === "block") {
    popup.style.display = "none";
    document.querySelector("main").classList.remove("blur-filter");
  } else {
    popup.style.display = "block";
    document.querySelector("main").classList.add("blur-filter");
  }
}

// Needed for the popup 
function togglePopup() {
  var popup = document.getElementById("popup");
  var body = document.querySelector("main");
  if (popup.style.display === "block") {
    popup.style.display = "none";
    body.classList.remove("blur-filter");
  // } else {
  //   popup.style.display = "block";
  //   body.classList.add("blur-filter");
  }
}