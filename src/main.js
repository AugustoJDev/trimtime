const express = require('express');
const path = require('path');
const app = express();

// Middleware para permitir o uso de JSON no corpo da requisição
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Importar e usar rotas
const endpoints = require('./endpoints');
app.use(endpoints);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});