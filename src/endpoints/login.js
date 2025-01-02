const express = require('express');
const router = express.Router();

const users = [
  { username: 'jonathan', password: 'lindo', email: 'jonathan@example.com' } // Exemplo de usuário
];

// Rota de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Verificar se o usuário existe
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).send('Login bem-sucedido');
  } else {
    res.status(401).send('Credenciais inválidas');
  }
});

module.exports = router;