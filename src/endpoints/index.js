const express = require('express');
const router = express.Router();

// Importar rotas
const loginRoute = require('./login');
const checkEmailRoute = require('./checkEmail');

// Usar rotas
router.use(loginRoute);
router.use(checkEmailRoute);

module.exports = router;