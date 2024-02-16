// On load checker
window.addEventListener('load', () => {
  // Open todo popup button listner
  document.querySelector("#todo-add-button").addEventListener('click', () => {
    const popup = document.querySelector("#popup");
    popup.style.animation = "popupOpenAnimation 0.5s forwards";
    popup.style.display = "block";
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
  // Add todo button listner
  document.querySelector("#addTodoButton").addEventListener("click", () => {
    const todoInput = document.querySelector("#todo-input");
    const todoText = todoInput.value;

    if (todoText.trim() !== "") {
      const todoItemContainer = document.createElement("div");
      todoItemContainer.classList.add("todo-item-container");

      const checkbox = document.createElement("div");
      checkbox.classList.add("todo-checkbox");

      const todoTextElement = document.createElement("div");
      todoTextElement.classList.add("todo-text");
      todoTextElement.textContent = todoText;

      todoItemContainer.appendChild(checkbox);
      todoItemContainer.appendChild(todoTextElement);

      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      todoItem.appendChild(todoItemContainer);

      document.querySelector(".todo-list-container").appendChild(todoItem);

      todoInput.value = "";

      document.querySelector("#popup").style.display = "none";
      document.querySelector("main").classList.remove("blur-filter");
    }
  });
});
// Timer count down function
function setCircleDashArray(value) {
  document.querySelector("#base-timer-path-remaining").setAttribute("stroke-dasharray", `${(value * 283).toFixed(0)} 283`);
}
// Timer colour function (i have an idea)
/**
 * @param {String} input
 */
function setTimerColor(input) {
  document.querySelector("#base-timer-path-remaining").style.stroke = input == null ? "green" : input;
}