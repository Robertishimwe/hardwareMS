const UserService = require('../services/user.service')

const { findUsers, findUser } = UserService;

class UsersController {

    //get all users
    static getAllUsers = async (req, res) => {
        try {
            const users = await findUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };


}

module.exports = UsersController;
