const CategoryService = require("../services/category.service");

const {
  createCategory,
  updateCategory,
  findCategory,
  findCategories,
  checkCategory,
  deleteCategory
} = CategoryService;

class CategoryController {
  static createCategory = async (req, res) => {
    try {
      const check = {
        categoryName: req.body.name,
        // Add other fields you want to check for uniqueness
      };
      await checkCategory(check);
      const category = await createCategory({
        categoryName: req.body.name,
        // Add other fields from request body needed for category creation
      });
      return res
        .status(201)
        .json({ message: "Category added successfully", category });
    } catch (error) {
      if (error.message === "Category found") {
        return res.status(409).json({ error: "Category already exists" });
      }
      res.status(500).json({ error: error.message });
    }
  };

  static getAllCategories = async (req, res) => {
    try {
      const categories = await findCategories();
      return res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await findCategory({ id });
      return res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await findCategory({ id });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const updatedCategory = await updateCategory(category, req.body);
      return res
        .status(200)
        .json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await findCategory({ id });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      await deleteCategory(id);
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = CategoryController;
