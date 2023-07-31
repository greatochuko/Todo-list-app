import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
var todoList = ["Cook Food", "Eat Food"];
var workTodoList = [];
var today = new Date();
var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var daysOfTheMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getTodayDate() {
    var todayDate = `${daysOfTheWeek[today.getDay()]}, ${daysOfTheMonth[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return todayDate;
}

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const itemSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Read a book"
})

const item2 = new Item({
    name: "Go to Church"
})

const item3 = new Item({
    name: "Eat food"
})

const defaultItems = [item1, item2, item3];

/* Item.insertMany(defaultItems).then(() => {
    console.log("Items inserted Successfully!");
}) */

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async(req, res) => {
    const todoListItems = await Item.find()
    res.render("index.ejs", {
        todoItems: todoListItems,
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
    const newTodoItem = new Item({
        name: todo
    })
    newTodoItem.save();
    res.redirect("/");
});

app.post("/delete", async(req, res) => {
    var itemID = req.body.todoItem;
    await Item.deleteOne({ _id: itemID });
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