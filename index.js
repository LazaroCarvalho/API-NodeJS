const app = require('./config/custom-express');

// Adicionando uma porta a aplicação
app.listen(3000, () => {

    console.log("Porta 3000 funcionando!");
    
})