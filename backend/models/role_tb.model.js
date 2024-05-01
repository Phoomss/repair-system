module.exports = (Sequelize, DataTypes) => {
    const role_tb = Sequelize.define('role_tb', {
        roleName: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    })

    return role_tb

}