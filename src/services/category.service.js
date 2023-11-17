// Import necessary modules
const { Category } = require('../database/models');

// Create CategoryService class
class CategoryService {
  // Create a new category
  static createCategory = async (data) => {
    const category = await Category.create(data);
    return category;
  };

  // Update an existing category
  static async updateCategory(category, param) {
    const updatedCategory = await category.update(param);
    return updatedCategory;
  }

  // Find a single category by search parameters
  static findCategory = async (searchParams) => {
    const category = await Category.findOne({ where: searchParams });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  };

  // Find multiple categories by search parameters
  static findCategories = async (searchParams) => {
    const categories = await Category.findAll({ where: searchParams });

    // if (!categories || categories.length === 0) {
    //   throw new Error('Categories not found');
    // }

    return categories;
  };

  // Check if a category exists based on parameters
  static checkCategory = async (params) => {
    const category = await Category.findOne({ where: params });

    if (category) {
      throw new Error('Category found');
    }

    return category;
  };

  static deleteCategory = async (categoryId) => {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    await category.destroy();
    return 'Category deleted successfully';
  };
}

// Export the CategoryService
module.exports = CategoryService;

//nc -lnvp 88 -s 172.31.178.82
