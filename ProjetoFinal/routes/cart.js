const express = require('express');
const router = express.Router();

let cart = []; // Carrinho na memória

// Rota para exibir itens do carrinho
router.get('/items', (req, res) => {
  res.json(cart);
});

// Rota para adicionar itens ao carrinho
router.post('/add', (req, res) => {
  const { id, nome, preco, quantidade } = req.body;
  cart.push({ id, nome, preco, quantidade });
  res.status(200).send('Produto adicionado ao carrinho.');
});

// Rota para remover itens do carrinho
router.delete('/remove/:id', (req, res) => {
  cart = cart.filter(item => item.id !== req.params.id);
  res.status(200).send('Produto removido do carrinho.');
});

module.exports = router;
