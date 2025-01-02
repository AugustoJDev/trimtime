const express = require('express');
const router = express.Router();

const users = [
  { username: 'jonathan', password: 'lindo', email: 'jonathan@example.com' } // Exemplo de usuário
];

// Rota para verificar se o e-mail já está registrado
router.post('/api/check-email', (req, res) => {
  const { email } = req.body;
  const emailExists = users.some(user => user.email === email);
  res.json({ exists: emailExists });
});

module.exports = router;