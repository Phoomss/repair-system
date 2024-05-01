const db = require('../models')
const role_tb = db.role_tb

// create role 
const createRole = async (req, res) => {
    try {
        const { roleName } = req.body

        const newRole = await role_tb.create({ roleName })

        return res.status(201).json({
            status_code: 201,
            msg: 'Create role successfully',
            data: newRole
        })

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

module.exports = {
    createRole
}
