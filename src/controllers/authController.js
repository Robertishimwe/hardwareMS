const Protection = require('../helpers/encreption');
const UserService = require('../services/user.service')
const Token = require('../helpers/token')

const { createUser, checkUser, findUser, findUsers } = UserService;
const { generateToken } = Token

class UserController {


    static createUser = async (req, res) => {
        try {
            // check if a user is in the database
            const check = {
                email: req.body.email,
            };

            await checkUser(check);

            // Hash the Password
            const hashedPassword = Protection.hashPassword(req.body.password);

            const user = await createUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                password: hashedPassword,
            });

            return res.status(201).json({ message: "User was created successful", user: user })
        } catch (error) {
            if (error.message === 'Found') {
                return res.status(409).json({ error: 'user with provided email already exists' });
            }
            res.status(500).json({ error: error.message });
        }
    };

    static login = async (req, res) => {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        };

        // await findUser({ email: userData.email })
        // const authuser = await findUser({ email: userData.email })
        // console.log(authuser)

        try {
            await findUser({ email: userData.email })
            const authuser = await findUser({ email: userData.email })
            console.log(authuser)
            const doesPasswordMatch = await Protection.checkPassword(
                userData.password,
                authuser.password
            );
            console.log(">>>>>>>>", doesPasswordMatch)
            if (doesPasswordMatch) {
                const tokenPackage = { id: authuser.id, role: authuser.role, email: authuser.email };
                console.log(tokenPackage)
                const token = await generateToken(
                    tokenPackage,
                    "xxxxxxxxHSMSxxxxxxxx",
                    '1d'
                );
                console.log(token)
                return res.set('token', token).status(200).send({ message: "logged in successful", token: token });
            } 
            else {
                res.status(400).send({ Message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).send({ error: error.toString() });
        }


    };


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

module.exports = UserController;
