const express = require('express');
const router = express.Router();

// Importar rotas
const loginRoute = require('./login');
const registerRoute = require('./register');

// Usar rotas
router.use(loginRoute);
router.use(registerRoute);

module.exports = router;