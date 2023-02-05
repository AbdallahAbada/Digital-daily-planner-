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







