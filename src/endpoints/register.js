const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDGEgXRyQulzwgYn8x7AFKEq4IPEcapPcc",
    authDomain: "trimtime-7a447.firebaseapp.com",
    projectId: "trimtime-7a447",
    storageBucket: "trimtime-7a447.firebasestorage.app",
    messagingSenderId: "1081064872621",
    appId: "1:1081064872621:web:f1d9903fd266fd1ea14424"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userRef = db.collection('users').doc(email);
    await userRef.set({
      name,
      email,
      password
    });

    res.status(201).send('Registro bem-sucedido');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send('Erro ao registrar usuário');
  }
});

module.exports = router;