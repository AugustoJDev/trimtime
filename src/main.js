const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Dados fictícios de usuários
const users = [
  { username: 'jonathan', password: 'lindo' } // Senha: 'password'
];

// Middleware para permitir o uso de JSON no corpo da requisição
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Verificar se o usuário existe
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(400).send('Usuário não encontrado');
  }

  // Comparar a senha com o hash
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // Gerar o token
      const token = jwt.sign({ username: user.username }, 'secreta_chave', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(400).send('Senha incorreta');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
