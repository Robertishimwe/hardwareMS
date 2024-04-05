const { Product, Category, Supplier,Inventory, UnitOfMeasurements } = require("../database/models");

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
          { model: Category, as: 'productCategory' },
          { model: UnitOfMeasurements, as: 'unit' },
        ],
      });
  
      return products;
    } catch (error) {
      console.log(error)
      throw new Error("Error finding products", error);
    }
  }

  static async getProducts(searchParams) {
    try {
      const products = await Inventory.findAll({
        where: searchParams,
        include: [
          {
            model: Product,
            as: "product",
            attributes: {
              exclude: [
                "id",
                "unit_id",
                "createdAt",
                "supplier_id",
              ], // Exclude unnecessary fields from Product
            },
            include: [
              {
                model: Category,
                as: 'productCategory',
                attributes: {
                  exclude: ['id', 'createdAt', 'updatedAt'], // Exclude unnecessary fields from Category
                },
              },
              { model: UnitOfMeasurements, as: 'unit' },
            ],
          },
          {
            model: User,
            as: "User",
            attributes: {
              exclude: [
                "password",
                "createdAt",
                "updatedAt",
                "phone",
                "role",
                "id",
              ], // Exclude sensitive fields from User
            },
          },
          {
            model: UnitOfMeasurements,
            as: "unit",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"], // Exclude unnecessary fields from UnitOfMeasurements in Inventory
            },
          },
        ],
        attributes: {
          exclude: [
            "productId",
            "unitId",
            "createdAt",
          ], // Exclude redundant fields from Inventory
        },
      });
      return products;
    } catch (error) {
      throw new Error(error);
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
