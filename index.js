const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

app.get('/', (req, res) => {
    res.send(
        "<h1>Minha primeira rota do EXPRESS</h1>"
    );
});