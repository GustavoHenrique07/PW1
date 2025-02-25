const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, required: true }, // Masculino, Feminino ou Infantil
  imagem: { type: String, required: true }, // URL da imagem do produto
});

module.exports = mongoose.model('Product', productSchema);
