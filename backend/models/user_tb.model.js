module.exports = (Sequelize, DataTypes) => {
    const user_tb = Sequelize.define('user_tb', {
        title: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        tel: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return user_tb
}
