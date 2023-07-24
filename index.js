import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var todoList = [];
var workTodoList = [];
var today = new Date();
var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var daysOfTheMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getTodayDate() {
    var todayDate = `${daysOfTheWeek[today.getDay()]}, ${daysOfTheMonth[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return todayDate;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        todoItems: todoList,
        date: getTodayDate()
    });
});

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        todoItems: workTodoList
    });
});

app.post('/add-todo', (req, res) => {
    var todo = req.body.todo;
    todoList.push(todo);
    res.redirect("/");
});

app.post('/add-todo-work', (req, res) => {
    var todo = req.body.todo;
    workTodoList.push(todo);
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});