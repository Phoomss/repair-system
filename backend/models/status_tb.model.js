module.exports = (Sequelize, DataTypes) => {
    const status_tb = Sequelize.define('status_tb', {
        statusName: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    })

    return status_tb

}