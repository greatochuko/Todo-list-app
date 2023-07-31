let todo = document.querySelectorAll("li span");
let checkbox = document.getElementsByClassName("checkbox");

for (i = 0; i < checkbox.length; i++) {
    let todoItem = todo[i];
    let checkboxID = checkbox[i].value;
    let todoForm = document.getElementById("form" + checkboxID);
    checkbox[i].addEventListener("click", () => {
        todoItem.classList.toggle("cancelled");
        console.log(checkboxID);
        todoForm.submit();
    });
}