// const { Inventory } = require('../database/models');

// class InventoryService {

//   static async findAllStock(searchParams) {
//     try {
//       const inventories = await Inventory.findAll({ where: searchParams, include: [{ model: product }] });
//       return inventories;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

// }

// module.exports = InventoryService;

// const { Inventory, Product, UnitOfMeasurements, User } = require('../database/models'); // Import the necessary models

// class InventoryService {
//   static async findAllStock(searchParams) {
//     try {
//       const inventories = await Inventory.findAll({
//         where: searchParams,
//         include: [
//           {
//             model: Product, // Include the Product model
//             as: 'product', // Use the alias defined in the associations
//             include: [
//               // Include other associations of Product if needed
//               {
//                 model: UnitOfMeasurements, // Include the UnitOfMeasurements model
//                 as: 'unit', // Use the alias defined in the associations
//               },
//             ],
//           },
//           {
//             model: UnitOfMeasurements, // Include the UnitOfMeasurements model directly for Inventory
//             as: 'unit', // Use the alias defined in the associations
//           },
//           {
//             model: User, // Include the User model directly for Inventory
//             as: 'User', // Use the alias defined in the associations
//           },
//         ],
//       });
//       return inventories;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }

// module.exports = InventoryService;

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
                "id",
                "unit_id",
                "createdAt",
                "updatedAt",
                "supplier_id",
              ], // Exclude unnecessary fields from Product
            },
            // include: [
            //   {
            //     model: UnitOfMeasurements,
            //     as: 'unit',
            //     attributes: {
            //       exclude: ['id','createdAt', 'updatedAt'], // Exclude unnecessary fields from UnitOfMeasurements
            //     },
            //   },
            // ],
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
            "lastUpdatedBy",
            "lastRestockDate",
            "createdAt",
            "updatedAt",
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
