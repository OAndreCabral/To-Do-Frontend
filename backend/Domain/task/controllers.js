const ToDo = [
    {
        id: 1,
        descricao: "tarefa de matematica",
        status: false
    },
    {
        id: 2,
        descricao: "escrever nova musica",
        status: false
    },
    {
        id: 3,
        descricao: "fazer o moonwalk",
        status: false
    },
    {
        id: 4,
        descricao: "criar o FaceBahk",
        status: false
    }
]

function listTask(_request, response) {
    response.send(ToDo)
};

function listOneTask(request, response) {
    try {

        const id = parseInt(request.params.id);

        const item = ToDo.find(todo => todo.id === id);

        if (!item) {
            return response.send(404).json({ error: "Item não encontrado" });
        }

        response.json(item);

    } catch (error) {
        console.log(error);
    }

};

function createTask(request, response) {
    try {
        const { descricao, status } = request.body;
        if (!descricao) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios: 'descrição', 'status' " });
        }

        const newTask = {
            id: ToDo.length + 1,
            descricao: descricao,
            status: status
        };
        ToDo.push(newTask);

        response.json(newTask);

    } catch (error) {
        console.log(error);
    }
}

function updateTask(request, response) {
    try {
        const id = parseInt(request.params.id);
        const { nome, descricao, status } = request.body;

        const index = ToDo.findIndex(todo => todo.id === id);
        if (index === -1) {
            return response.status(404).json({ error: "Tarefa não encontrada" });
        }

        ToDo[index] = { id, nome, descricao, status };

        response.json(ToDo[index]);

    } catch (error) {
        console.log(error);
    }
}

function deleteTask(request, response) {
    try {
        const id = parseInt(request.params.id);
        const index = ToDo.findIndex(todo => todo.id === id);
        if (index === -1) {
            return response.status(404).json({ error: "Tarefa não encontrada" });
        }
        const deletedTask = ToDo.splice(index, 1);
        response.json({ message: "deletado", status: deletedTask })
    } catch (error) {
        console.log(error);
    }
}

export default {
    listTask,
    listOneTask,
    createTask,
    updateTask,
    deleteTask,
}