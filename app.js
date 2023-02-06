// SELECT ELEMENTS
const todoInput = document.querySelector('.todo-input');
const submitBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const finishedTodo = document.querySelector('.finished-todo')

// EVENTLLISTNER
document.addEventListener('DOMContentLoaded', getTodo)
submitBtn.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", moveTodo)


// FUNCTION
// ADD TODO
function addTodo(e) {
    e.preventDefault();
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}

// REMOVE TODO
function deleteTodo(e) {
    todoItem = e.target;
    if (todoItem.classList[0] === "trash-btn") {
        const todo = todoItem.parentElement;
        removeLocalTodos(todo);
        todo.remove()
    }
}

// MOVE THE FINISHED TODO
function moveTodo(e) {
    todoItem = e.target;
    if (todoItem.classList[0] === "complete-btn") {
        // CREATE A list item with the finished todo

        const finishedItem = document.querySelector('li')
        finishedTodo.classList.add("fin-li")
        finishedTodo.appendChild(finishedItem)
        const todo = todoItem.parentElement;
        todoItem.parentElement.remove()
        removeLocalTodos(todo);
        console.log(todo)
    }
}

// SAVE UNFINISHED PLAN IN THE STORAGE WHEN CLOSING THE WINDOW
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos[todos.length] = todo
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // ADD TODO TO LOCAL STORAGE
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todo.children[0].innerText)
    // console.log(todos.indexOf(todo.children[0].innerText))
    const indexOfTodo = todos.indexOf(todo.children[0].innerText)
    // console.log(indexOfTodo)
    todos.splice(indexOfTodo, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// WEATHER FORCATING SECTION
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
// let icon = document.querySelector(".icon");
const kelvin = 273;

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // API ID
            const api = "6d055e39ee237af35ca066f35474e9df";
            // API URL
            const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;

            // CALLING THE API
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
                    summary.textContent = data.weather[0].description;
                    loc.textContent = data.name + "," + data.sys.country;
                })
        })
    }
})

// DISPLAY THE DIGITAL CLOCK
setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours()
    let min = time.getMinutes()
    let am_pm = "Am"
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    let currentTime = hour + ":" + min;
    let digiClock = document.getElementById("clock");
    digiClock.textContent = currentTime
}





