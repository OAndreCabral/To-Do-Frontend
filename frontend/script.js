// @ts-nocheck
const todoContainer = document.querySelector(".todoContainer");
const inputTodo = document.getElementById("inputToDo");
const addTodo = document.getElementById("addBotton");

let todoArray = [];

const url = "http://localhost:3000/tasks/todos";

async function getTodos() {
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data;
    } catch (error) {
        return error;
    }
}

async function displayTodos(todoList) {
    todoList.forEach((todoElement) => {
        console.log("element:", todoElement);

        let todo = document.createElement("div")
        todo.classList.add("todo");

        let todoInfo = document.createElement("div")
        todoInfo.classList.add("todoInfo");

        let todoButton = document.createElement("form")
        todoButton.classList.add("todoButton");

        let todoCompleted = document.createElement("input")
        todoCompleted.classList.add("todoCompleted");
        todoCompleted.setAttribute("type", "checkbox");
        todoCompleted.checked = todoElement.completed;

        let todoName = document.createElement("p");
        todoName.classList.add("todoName");
        todoName.innerHTML = todoElement.nome;

        let todoEdit = document.createElement("button");
        todoEdit.classList.add("todoEdit");
        todoEdit.innerHTML = "Editar"
        todoEdit.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Open Modal");
        });

        let todoDelete = document.createElement("button")
        todoDelete.classList.add("todoDelete")
        todoDelete.innerHTML = "Deletar"
        todoDelete.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Delete Todo");
        });

        todoInfo.appendChild(todoCompleted);
        todoInfo.appendChild(todoName);
        todoButton.appendChild(todoEdit);
        todoButton.appendChild(todoDelete);

        todo.appendChild(todoInfo);
        todo.appendChild(todoButton);

        todoContainer.appendChild(todo)
    })
}

getTodos()
    .then(todoList => {
        todoArray = todoList
        console.log(todoArray);
        displayTodos(todoArray);
    })
    .catch((error) => {
        console.log(error);
    });
