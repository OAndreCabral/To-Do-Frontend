// @ts-nocheck
const todoContainer = document.querySelector(".todoContainer");
const inputTodo = document.getElementById("inputToDo");
const addTodo = document.getElementById("addBotton");

const modalBG = document.querySelector(".modalBackground");
const closeModal = document.querySelector(".closeModal");
const editTodoName = document.getElementById("editTodoName");
const editTodoCompleted = document.getElementById("editTodoComplete");
const saveTodo = document.getElementById("saveTodo")

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

async function postTodo() {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descricao: inputTodo.value,
            })
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteTodo(todoElement) {
    try {
        const deleteUrl = url + "/" + todoElement.id;
        const response = await fetch(deleteUrl, {
            method: "DELETE",
        });
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function putTodo(todoElement) {
    try {
        let putUrl = url + "/" + todoElement.id;
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: todoElement.id,
                descricao: editTodoName.value,
                status: editTodoCompleted.checked,
            })
        };
        const response = await fetch(putUrl, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function openModal(todoElement) {
    editTodoName.value = todoElement.descricao
    editTodoCompleted.checked = todoElement.status
    modalBG.style.display = "block";
    closeModal.addEventListener("click", () => {
        modalBG.style.display = "none";
    });
    saveTodo.addEventListener("click", () => {
        modalBG.style.display = "none";
        putTodo(todoElement);
    })
}

async function displayTodos(todoList) {
    todoList.forEach((todoElement) => {
        let todo = document.createElement("div")
        todo.classList.add("todo");

        let todoInfo = document.createElement("div")
        todoInfo.classList.add("todoInfo");

        let todoButton = document.createElement("form")
        todoButton.classList.add("todoButton");

        let todoCompleted = document.createElement("input")
        todoCompleted.classList.add("todoCompleted");
        todoCompleted.setAttribute("type", "checkbox");
        todoCompleted.checked = todoElement.status;

        let todoDescription = document.createElement("p");
        todoDescription.classList.add("todoDescription");
        todoDescription.innerHTML = todoElement.descricao;

        let todoEdit = document.createElement("button");
        todoEdit.classList.add("todoEdit");
        todoEdit.innerHTML = "Editar"
        todoEdit.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(todoElement)
        });

        let todoDelete = document.createElement("button")
        todoDelete.classList.add("todoDelete")
        todoDelete.innerHTML = "Deletar"
        todoDelete.addEventListener("click", (event) => {
            deleteTodo(todoElement)
        });

        todoInfo.appendChild(todoCompleted);
        todoInfo.appendChild(todoDescription);
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
        displayTodos(todoArray);
    })
    .catch((error) => {
        console.log(error);
    });

addTodo.addEventListener("click", () => {
    if (inputTodo.value != "") {
        postTodo();
    }
});