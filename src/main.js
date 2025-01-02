const express = require('express');
const path = require('path');
const app = express();

const users = [
  { username: 'jonathan', password: 'lindo' } // Senha: 'password'
];

// Middleware para permitir o uso de JSON no corpo da requisição
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Verificar se o usuário existe
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).send('Login bem-sucedido');
  } else {
    res.status(401).send('Credenciais inválidas');
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});