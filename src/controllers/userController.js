const UserService = require('../services/user.service')

const { findUsers, findUser, updateUser } = UserService;

class UsersController {

    //get all users
    static getAllUsers = async (req, res) => {
        try {
            const users = await findUsers();
            const filteredUsers = users.filter(user => user.email !== 'robert@ishimwe.rw');
            res.status(200).json(filteredUsers);
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
            const { id, role } = req.user;
    
            // Only the owner of the profile or an admin can edit the profile
            if (role !== 'admin' && id !== userId) {
                return res.status(403).json({ message: 'You are not authorized to edit this profile' });
            }
    
            // Only the owner of the profile or an admin can modify the password
            if (updateData.hasOwnProperty('password') && role !== 'admin' && id !== userId) {
                return res.status(403).json({ message: 'You are not authorized to modify the password' });
            }
    
            // Only an admin can modify the role
            if (updateData.hasOwnProperty('role') && role !== 'admin') {
                return res.status(403).json({ message: 'You are not authorized to modify the role' });
            }
    
            // Remove the password field from updateData if it exists and the user is not authorized to modify it
            if (updateData.hasOwnProperty('password') && role !== 'admin' && id !== userId) {
                delete updateData.password;
            }
    
            // Remove the role field from updateData if it exists and the user is not authorized to modify it
            if (updateData.hasOwnProperty('role') && role !== 'admin') {
                delete updateData.role;
            }
    
            const updatedUser = await updateUser(userId, updateData);
            delete updatedUser.password;
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    


}

module.exports = UsersController;
