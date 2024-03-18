import express from "express";
import task from "./task/routes.js"

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/tasks", task)

app.listen(PORT, () => {
    console.log(`Servidor rodando na http://localhost:${PORT}`);
});