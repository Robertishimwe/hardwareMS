const { User } = require('../database/models')
const UserService = require('../services/user.service')
const Protection = require('../helpers/encreption');

async function createAdminUser() {
    const adminuser = UserService.findUser({ role: "admin" })
    if (adminuser) {
       
        console.log("admin already exist")
        return
    };
    try {
        const newUser = await User.create({
            firstName: "admin",
            lastName: "admin",
            email: "admin@a1dmin.com",
            phone: "0787885197",
            role: "admin",
            password: await Protection.hashPassword("123")
        });
        console.log('New user created:', newUser.toJSON());

        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // You might want to handle this error in a different way
    }
}

module.exports = createAdminUser