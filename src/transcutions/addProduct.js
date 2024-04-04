// const { Product, sequelize, Inventory } = require("../database/models");

// const addProduct = async (data, userId) => {
//   try {
//     // Start a transaction
//     const createdProduct = await sequelize.transaction(async (t) => {
//       // Create the product within the transaction
//       const product = await Product.create(data, { transaction: t });

//       // Create the corresponding Inventory entry within the same transaction
//       await Inventory.create(
//         {
//           productId: product.id,
//           quantity: 0,
//           minimumStockLevel: 10,
//           unitId: product.unit_id,
//           lastUpdatedBy: 1, // Replace with actual user ID
//           lastRestockDate: new Date(),
//         },
//         { transaction: t }
//       );

//       return product;
//     });

//     console.log("New product created:", createdProduct.toJSON());
//   } catch (error) {
//     console.error("Transaction failed:", error);
//     throw new Error(`Transaction failed: ${error}`);
//   }
// };

// module.exports = addProduct;




























// const { Product, sequelize, Inventory } = require("../database/models");

// const addProduct = async (data, userId) => {
//   try {
//     // Start a transaction
//     const createdProduct = await sequelize.transaction(async (t) => {
//       // Create the product within the transaction
//       const product = await Product.create(data, { transaction: t });

//       // Create the corresponding Inventory entry within the same transaction
//       await Inventory.create(
//         {
//           productId: product.id,
//           quantity: 0,
//           minimumStockLevel: 10,
//           unitId: product.unit_id,
//           lastUpdatedBy: userId, // Use the provided user ID
//           lastRestockDate: new Date(),
//           buyingPrice: data.buying_price, // Add the new buying price field
//           sellingPrice: data.selling_price, // Add the new selling price field
//           supplierId: data.supplier_id, // Add the new supplier ID field
//         },
//         { transaction: t }
//       );

//       return product;
//     });

//     console.log("New product created:", createdProduct.toJSON());
//   } catch (error) {
//     console.error("Transaction failed:", error);
//     throw new Error(`Transaction failed: ${error}`);
//   }
// };

// module.exports = addProduct;

















const { Product, sequelize, Inventory } = require("../database/models");

const addProduct = async (data, userId) => {

  console.log("===========================data====================",data.buying_price)
  try {
    // Start a transaction
    const createdProduct = await sequelize.transaction(async (t) => {
      // Create the product within the transaction
      const product = await Product.create({
        product_name: data.product_name,
        description: data.description,
        category: data.category,
        unit_id: data.unit_id,
      }, { transaction: t });

      // Create the corresponding Inventory entry within the same transaction
      await Inventory.create(
        {
          productId: product.id,
          quantity: 0,
          minimumStockLevel: 10,
          unitId: product.unit_id,
          lastUpdatedBy: userId, // Use the provided user ID
          lastRestockDate: new Date(),
          buying_price: data.buying_price, // Add the new buying price field
          selling_price : data.selling_price, // Add the new selling price field
          supplier_id: data.supplier_id, // Add the new supplier ID field
        },
        { transaction: t }
      );

      return product;
    });

    console.log("New product created:", createdProduct.toJSON());
  } catch (error) {
    console.error("Transaction failed:", error);
    throw new Error(`Transaction failed: ${error}`);
  }
};

module.exports = addProduct;

