const {
  Inventory,
  Category,
  Product,
  UnitOfMeasurements,
  User,
} = require("../database/models");

class InventoryService {
  static async findAllStock(searchParams) {
    try {
      const inventories = await Inventory.findAll({
        where: searchParams,
        include: [
          {
            model: Product,
            as: "product",
            attributes: {
              exclude: [
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
      return inventories;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteInventory(id) {
    try {
      const inventory = await Inventory.findOne({ where: { id } });
      if (!inventory) {
        throw new Error("Inventory not found");
      }
      await inventory.destroy();
      return { message: "Inventory deleted successfully" };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = InventoryService;
