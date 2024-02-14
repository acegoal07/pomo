window.addEventListener('load', () => {
  // Open todo popup button listner
  document.querySelector("#todo-add-button").addEventListener('click', () => {
    const popup = document.querySelector("#popup");
    popup.style.display = "block";
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    document.querySelector("main").classList.add("blur-filter");
    document.querySelector("#todo-add-button").classList.remove("is-clickable");
  });
  // Close todo popup button listern
  document.querySelector("#todo-close-popup").addEventListener('click', () => {
    const popup = document.querySelector("#popup");
    popup.style.animation = "popupCloseAnimation 0.5s forwards";
    setTimeout(function() {
      popup.style.display = "none";
    }, 500);
    document.querySelector("main").classList.remove("blur-filter");
    document.querySelector("#todo-add-button").classList.add("is-clickable");
  });
});