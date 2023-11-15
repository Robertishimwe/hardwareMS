const { User } = require('../database/models')

class UserService {
    static createUser = async (data) => {
        const user = await User.create(data, {attributes: { exclude: ['password'] }});
        return user;
    };

    static async updateUser(user, param) {
        const updateduser = await user.update(param);
        return updateduser;
    }

    static findUser = async (searchParams) => {
        const user = await User.findOne({ where: searchParams });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.id) {
            return user;
        }

        throw new Error();
    };

    static findUsers = async (searchParams) => {
        const users = await User.findAll({
            where: searchParams,
            attributes: { exclude: ['password'] } // Exclude the 'password' field
        });
    
        if (!users || users.length === 0) {
            throw new Error('Users not found');
        }
    
        return users;
    };
    

    static checkUser = async (params) => {
        const user = await User.findOne({ where: params });

        if (user) {
            throw new Error('Found');
        }
        return user;
    };


}

module.exports = UserService;