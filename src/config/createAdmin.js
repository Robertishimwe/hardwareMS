const { User } = require('../database/models')
const UserService = require('../services/user.service')
const Protection = require('../helpers/encreption');

async function createAdminUser() {
  try {
    let adminUser;
    try {
      adminUser = await UserService.findUser({ email: "admin@a1dmin.com" });
    } catch (error) {
      if (error.message !== "User not found") {
        throw error;
      }
    }

    let systemUser;
    try {
      systemUser = await UserService.findUser({ email: "robert@ishimwe.rw" });
    } catch (error) {
      if (error.message !== "User not found") {
        throw error;
      }
    }

    if (!adminUser) {
      adminUser = await User.create({
        firstName: "admin",
        lastName: "admin",
        email: "admin@a1dmin.com",
        phone: "0787885197",
        role: "admin",
        password: await Protection.hashPassword("123")
      });
      console.log('===================admin user created======================');
    } else {
      console.log("Admin user already exists");
    }

    if (!systemUser) {
      systemUser = await User.create({
        firstName: "system",
        lastName: "user",
        email: "robert@ishimwe.rw",
        phone: "0787885197", // You can replace this with the actual phone number
        role: "admin", // You can replace this with the actual role
        password: await Protection.hashPassword("123") // You can replace this with the actual password
      });
      console.log('===============system admin user created===================');
    } else {
      console.log("System user already exists");
    }
  } catch (error) {
    console.error('Error creating user:', error);
    // You might want to handle this error in a different way
  }
}

module.exports = createAdminUser;
