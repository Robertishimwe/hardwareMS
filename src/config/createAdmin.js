const { User } = require('../database/models')
const UserService = require('../services/user.service')
const Protection = require('../helpers/encreption');

async function createAdminUser() {
    const adminUser = await UserService.findUser({  email: "admin@a1dmin.com" });
    const systemUser = await UserService.findUser({ email: "robert@ishimwe.rw" });

    if (adminUser && systemUser) {
        console.log("Admin and system users already exist");
        return;
    }

    try {
        if (!adminUser) {
            const newAdminUser = await User.create({
                firstName: "admin",
                lastName: "admin",
                email: "admin@a1dmin.com",
                phone: "0787885197",
                role: "admin",
                password: await Protection.hashPassword("123")
            });
            console.log('New admin user created:', newAdminUser.toJSON());
        }

        if (!systemUser) {
            const newSystemUser = await User.create({
                firstName: "system",
                lastName: "user",
                email: "robert@ishimwe.rw",
                phone: "0787885197", // You can replace this with the actual phone number
                role: "admin", // You can replace this with the actual role
                password: await Protection.hashPassword("123") // You can replace this with the actual password
            });
            console.log('New system user created:', newSystemUser.toJSON());
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // You might want to handle this error in a different way
    }
}

module.exports = createAdminUser;
