const { Product, Category, Supplier, UnitOfMeasurements, } = require("../database/models");

class ProductService {
  static async createProduct(data) {
    try {
      const product = await Product.create(data);
      return product;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  static async updateProduct(product, param) {
    try {
      const updatedProduct = await product.update(param);
      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  static async findProduct(searchParams) {
    try {
      const product = await Product.findOne({ where: searchParams });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    } catch (error) {
      throw new Error(`Error finding product. ${error.message}`);
    }
  }

  static async findProducts(searchParams) {
    try {
      const products = await Product.findAll({
        where: searchParams,
        include: [
          { model: Category, as: 'category' },
          { model: Supplier, as: 'supplier' },
          { model: UnitOfMeasurements, as: 'unitOfMeasurement' },
        ],
      });
  
      return products;
    } catch (error) {
      throw new Error("Error finding products");
    }
  }

  static async checkProduct(params) {
    try {
      const product = await Product.findOne({ where: params });

      if (product) {
        throw new Error("Product found");
      }

      return product;
    } catch (error) {
      throw new Error(`Error checking product${error}`);
    }
  }

  static async deleteProduct(searchParams) {
    try {
      const product = await Product.findOne({ where: searchParams });

      if (!product) {
        throw new Error("Product not found");
      }

      await product.destroy();

      return { message: "Product deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting product. ${error.message}`);
    }
  }
}

module.exports = ProductService;
