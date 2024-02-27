const UserService = require('../services/user.service')

const { findUsers, findUser, updateUser } = UserService;

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

    static getUser = async (req, res) => {
        try {
            const user = await findUser({ id: req.params.id });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static updateUserProfile = async (req, res) => {
        try {
            const userId = req.params.id;
            const updateData = req.body;

            // Remove the password field from updateData if it exists
            if (updateData.hasOwnProperty('password')) {
                delete updateData.password;
            }

            if (updateData.hasOwnProperty('role')) {
                delete updateData.role;

                return res.status(401).json({message:"You are not allowed to change your Role"});
            }

            const updatedUser = await updateUser(userId, updateData);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };


}

module.exports = UsersController;
