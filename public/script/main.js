let todo = document.querySelectorAll("li span");
let checkbox = document.getElementsByClassName("checkbox");

for (i = 0; i < checkbox.length; i++) {
    let todoItem = todo[i];
    checkbox[i].addEventListener("click", () => {
        todoItem.classList.toggle("cancelled");
    });
}