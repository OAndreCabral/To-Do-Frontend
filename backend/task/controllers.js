const ToDo = [
    {
        id: 1,
        nome: "NeyMarlon",
        descricao: "tarefa de matematica",
        status: "a fazer"
    },
    {
        id: 2,
        nome: "Post Marlone",
        descricao: "escrever nova musica",
        status: "fazendo"
    },
    {
        id: 3,
        nome: "Marlon Jackson",
        descricao: "fazer o moonwalk",
        status: "feito"
    },
    {
        id: 4,
        nome: "Marklon Zuckerberg",
        descricao: "criar o FaceBahk",
        status: "fazendo"
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
        const { nome, descricao, status } = request.body;

        if (!nome || !descricao || !status) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios: 'nome', 'descricao' e 'status'." });
        }

        const newTask = {
            id: ToDo.length + 1,
            nome: nome,
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