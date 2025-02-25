const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB com sucesso!');

    // Remove todos os produtos existentes
    await Product.deleteMany();

    // Dados fixos de produtos
    const produtos = [];

    // Categorias e Tipos
    const categorias = ['Masculino', 'Feminino', 'Infantil'];
    const tiposMasculinoEInfantil = ['Camisas', 'Calças', 'Shorts', 'Sapatos'];
    const tiposFeminino = ['Camisas', 'Calças', 'Shorts', 'Sapatos', 'Vestidos'];

    // Masculino e Infantil (10 produtos cada)
    categorias.filter((categoria) => categoria !== 'Feminino').forEach((categoria) => {
      tiposMasculinoEInfantil.forEach((tipo) => {
        for (let i = 1; i <= 2; i++) {
          produtos.push({
            nome: `${tipo} ${categoria} ${i}`,
            descricao: `Descrição da ${tipo} ${categoria} ${i}`,
            preco: Math.random() * 100 + 10, // Preço entre 10 e 110
            imagem: `https://via.placeholder.com/300?text=${tipo}+${categoria}+${i}`, // Imagem placeholder
            categoria,
            tipo,
            estoque: Math.floor(Math.random() * 20 + 1), // Estoque entre 1 e 20
          });
        }
      });
    });

    // Feminino (10 produtos, incluindo vestidos)
    tiposFeminino.forEach((tipo) => {
      for (let i = 1; i <= 2; i++) {
        produtos.push({
          nome: `${tipo} Feminino ${i}`,
          descricao: `Descrição da ${tipo} Feminino ${i}`,
          preco: Math.random() * 100 + 10, // Preço entre 10 e 110
          imagem: `https://via.placeholder.com/300?text=${tipo}+Feminino+${i}`, // Imagem placeholder
          categoria: 'Feminino',
          tipo,
          estoque: Math.floor(Math.random() * 20 + 1), // Estoque entre 1 e 20
        });
      }
    });

    // Inserindo produtos no banco de dados
    await Product.insertMany(produtos);
    console.log('Banco de dados populado com sucesso com 30 produtos!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
