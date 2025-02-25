const express = require('express');
const router = express.Router();
const ProductsDAO = require('../models/ProductsDAO'); // Classe DAO para interagir com o banco de dados

// Rota para listar produtos com filtros e pesquisa
router.get('/', async (req, res) => {
  try {
    const { category, query } = req.query; // Captura categoria e termo de pesquisa
    const filters = {};

    // Filtro por categoria
    if (category && category !== 'Todos') {
      filters.categoria = category;
    }

    // Filtro por pesquisa
    if (query) {
      filters.$or = [
        { nome: { $regex: query, $options: 'i' } },
        { descricao: { $regex: query, $options: 'i' } },
      ];
    }

    const products = await ProductsDAO.getFilteredProducts(filters); // Obtém produtos filtrados
    res.render('products', {
      title: 'Nossos Produtos',
      products, // Passa os produtos para o EJS
      selectedCategory: category || 'Todos', // Categoria selecionada
      query: query || '', // Termo de pesquisa
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.render('error', {
      message: 'Erro ao buscar produtos',
      error,
    });
  }
});

// ✅ Rota para buscar um único produto pelo ID
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductsDAO.getProductById(req.params.id);
    if (product) {
      res.render('productDetail', {
        title: product.nome,
        product,
      });
    } else {
      res.status(404).render('error', {
        message: 'Produto não encontrado',
        error: { status: 404 },
      });
    }
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).render('error', {
      message: 'Erro ao buscar produto',
      error,
    });
  }
});

// ✅ Rota para adicionar um novo produto
router.post('/add', async (req, res) => {
  try {
    const newProduct = await ProductsDAO.addProduct(req.body);
    res.status(201).json({
      message: 'Produto adicionado com sucesso',
      product: newProduct,
    });
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto' });
  }
});

// ✅ Rota para atualizar um produto pelo ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductsDAO.updateProduct(req.params.id, req.body);
    if (updatedProduct) {
      res.json({
        message: 'Produto atualizado com sucesso',
        product: updatedProduct,
      });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
});

// ✅ Rota para deletar um produto pelo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProduct = await ProductsDAO.deleteProduct(req.params.id);
    if (deletedProduct) {
      res.json({ message: 'Produto removido com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
});

module.exports = router;
