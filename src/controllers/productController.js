const ProductService = require('../services/product.service');

class ProductController {
  static async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = await ProductService.createProduct(productData);
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      res.status(500).json({ error: 'Error creating product', details: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.productId;
      const product = await ProductService.findProduct({ id: productId });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = await ProductService.updateProduct(product, req.body);
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product', details: error.message });
    }
  }

  static async findProduct(req, res) {
    try {
      const productId = req.params.productId;
      const product = await ProductService.findProduct({ id: productId });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error finding product', details: error.message });
    }
  }

  static async findProducts(req, res) {
    try {
      const searchParams = req.query;
      const products = await ProductService.findProducts(searchParams);

      if (!products || products.length === 0) {
        return res.status(404).json({ error: 'Products not found' });
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error finding products', details: error.message });
    }
  }

}

module.exports = ProductController;
