const db = require('../models')
const role_tb = db.role_tb

// create role 
const createRole = async (req, res) => {
    try {
        // if (req.user.role !== 1) {
        //     return res.status(401).json({
        //         status_code: 401,
        //         msg: 'Unauthorized'
        //     })
        // }

        const { roleName } = req.body

        const newRole = await role_tb.create({ roleName })

        return res.status(201).json({
            status_code: 201,
            msg: 'Create role successfully',
            data: newRole
        })

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

// get all data role 
const getAllRoles = async (req, res) => {
    try {
        // if (req.user.role !== 1) {
        //     return res.status(401).json({
        //         status_code: 401,
        //         msg: 'Unauthorized'
        //     })
        // }
        const queryRoles = await role_tb.findAll({})

        return res.status(200).json({
            status_code: 200,
            msg: 'Get all data role successfully',
            data: queryRoles
        })
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}


module.exports = {
    createRole,
    getAllRoles
}
