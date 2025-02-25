const express = require('express');
const router = express.Router();

// Página Sobre Nós
router.get('/aboutus', (req, res) => {
  res.render('aboutus', { title: 'Sobre Nós' });
});

// Página Contato
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contato' });
});

// Processar formulário de contato
router.post('/contact', (req, res) => {
  const { nome, email, mensagem } = req.body;
  console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`);
  res.render('contact', { title: 'Contato', message: 'Mensagem enviada com sucesso!' });
});

module.exports = router;
