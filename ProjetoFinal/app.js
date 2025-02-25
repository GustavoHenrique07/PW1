const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ProductsDAO = require('./models/ProductsDAO');

require('dotenv').config();

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');

const app = express();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => console.log('✅ Conectado ao MongoDB'));
mongoose.connection.on('error', (err) => console.error('❌ Erro ao conectar no MongoDB:', err));

// Configuração do EJS e arquivos estáticos
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para processar JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota da página inicial
app.get('/', (req, res) => {
  res.render('index', { title: "ShopClothes" }); // Passa o título corretamente
});

// Definição de Rotas
app.use('/products', productsRouter); // Rota para produtos
app.use('/', indexRouter);  // Rota para outras páginas, se necessário

// Middleware para erro 404 - Página não encontrada
app.use((req, res, next) => {
  res.status(404).render('error', { 
    title: "Página Não Encontrada",
    message: "Ops! A página que você procura não existe.", 
    error: { status: 404 } 
  });
});

// Middleware de tratamento de erros genéricos
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    title: "Erro no Servidor",
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {} // Mostra mais detalhes no modo dev
  });
});

module.exports = app;
