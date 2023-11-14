const { Product, sequelize, Inventory } = require('../database/models');




const addProduct = async (data, userId) => {
    


    try {
        

        // Start a transaction
        const createdProduct = await sequelize.transaction(async (t) => {
            // Create the product within the transaction
            const product = await Product.create(data, { transaction: t });

            // Create the corresponding Inventory entry within the same transaction
            await Inventory.create(
                {
                    productId: product.id,
                    quantity: 0,
                    unitId: product.unit_id,
                    lastUpdatedBy: 1, // Replace with actual user ID
                    lastRestockDate: new Date(),
                },
                { transaction: t }
            );

            return product;
        });

        console.log('New product created:', createdProduct.toJSON());
    } catch (error) {
        console.error('Transaction failed:', error);
    }








}

module.exports = addProduct