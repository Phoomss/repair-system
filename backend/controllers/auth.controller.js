const { comparePassword, hashPassword } = require('../helpers/authHelper')
const db = require('../models')
const user_tb = db.user_tb
const role_tb = db.role_tb

const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' });


// login
const login = async (req, res) => {
    try {
        const { login, password } = req.body

        if (!login || !password) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Plese provide both email or username and password'
            })
        }

        let whereClause;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
            whereClause = { email: login };
        } else {
            whereClause = { username: login };
        }

        let userWithdentifier = await findUser(whereClause)

        if (!userWithdentifier) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Invalid username/email'
            })
        }

        const matchPassword = await comparePassword(password, userWithdentifier.password)

        if (!matchPassword) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Incorrect password'
            })
        }

        const jwtToken = jwt.sign({
            id: userWithdentifier.id,
            email: userWithdentifier.email,
            username: userWithdentifier.username,
            password: userWithdentifier.password,
            role: userWithdentifier.role
        },
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            status_code: 200,
            msg: 'Welcome back!',
            data: {
                username: userWithdentifier.username,
                email: userWithdentifier.email,
                role: userWithdentifier.role,
                token: jwtToken
            }
        })

    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const findUser = async (whereClause) => {
    try {
        return await user_tb.findOne({ where: whereClause });
    } catch (error) {
        console.error("Error finding user: ", error);
        return null;
    }
};

// register
const register = async (req, res) => {
    try {
        const { title, fullName, tel, email, username, password, roleId } = req.body

        const alreadyExistsEmail = await user_tb.findOne({ where: { email } })
        const alreadyExistsUsername = await user_tb.findOne({ where: { username } })
        const alreadyExistsTel = await user_tb.findOne({ where: { tel } })

        if (alreadyExistsEmail) {
            return res.status(409).json({
                status_code: 409,
                message: 'Email already exists'
            });
        }
        if (alreadyExistsUsername) {
            return res.status(409).json({
                status_code: 409,
                message: 'Username already exists'
            });
        }
        if (alreadyExistsTel) {
            return res.status(409).json({
                status_code: 409,
                message: 'Telephone number already exists'
            });
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new user_tb({
            title,
            fullName,
            tel,
            email,
            username,
            password: hashedPassword,
            roleId
        })

        await newUser.save()

        return res.status(200).json({
            status_code: 200,
            msg: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

// create admin
const createAdmin = async (req, res) => {
    try {
        const { title, fullName, tel, email, username, password, roleId } = req.body

        const alreadyExistsEmail = await user_tb.findOne({ where: { email } })
        const alreadyExistsUsername = await user_tb.findOne({ where: { username } })
        const alreadyExistsTel = await user_tb.findOne({ where: { tel } })

        if (alreadyExistsEmail) {
            return res.status(409).json({
                status_code: 409,
                message: 'Email already exists'
            });
        }
        if (alreadyExistsUsername) {
            return res.status(409).json({
                status_code: 409,
                message: 'Username already exists'
            });
        }
        if (alreadyExistsTel) {
            return res.status(409).json({
                status_code: 409,
                message: 'Telephone number already exists'
            });
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new user_tb({
            title,
            fullName,
            tel,
            email,
            username,
            password: hashedPassword,
            roleId: 1
        })

        await newUser.save()

        return res.status(200).json({
            status_code: 200,
            msg: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

module.exports = {
    login,
    register,
    createAdmin
}