const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const firebase = require('firebase/app');
require('firebase/firestore');

const secretKey = "trimtime-tokens"; // Chave secreta para gerar o token

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGEgXRyQulzwgYn8x7AFKEq4IPEcapPcc",
  authDomain: "trimtime-7a447.firebaseapp.com",
  projectId: "trimtime-7a447",
  storageBucket: "trimtime-7a447.firebasestorage.app",
  messagingSenderId: "1081064872621",
  appId: "1:1081064872621:web:f1d9903fd266fd1ea14424"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar o usuário no Firestore
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(401).send('Credenciais inválidas');
    }

    const user = doc.data();

    if (user.password === password) {
      // Gerar um token JWT
      const token = jwt.sign(user, secretKey, { expiresIn: '24h' });

      res.json({ token });
      res.status(200).send('Login bem-sucedido');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro ao fazer login');
  }
});

module.exports = router;