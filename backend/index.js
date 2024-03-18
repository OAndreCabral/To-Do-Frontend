const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (request, response) => {
    response.send("teste")
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na http://localhost:${PORT}`);
})