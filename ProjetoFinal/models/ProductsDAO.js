const Product = require('./Product'); // Certifique-se de que o caminho está correto

class ProductsDAO {
  static async getFilteredProducts(filters) {
    try {
      return await Product.find(filters);
    } catch (error) {
      console.error('Erro ao buscar produtos filtrados:', error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      throw error;
    }
  }

  static async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      return await newProduct.save();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  }

  static async updateProduct(id, updateData) {
    try {
      return await Product.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }
}

module.exports = ProductsDAO;
