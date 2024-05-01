module.exports = (Sequelize, DataTypes) => {
    const case_tb = Sequelize.define('case_tb', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        caseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caseDetails: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },
        caseLocat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        caseTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        techId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateAssign: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeAssign: {
            type: DataTypes.TIME,
            allowNull: false
        },
        dateStartTech: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeStartTech: {
            type: DataTypes.TIME,
            allowNull: false
        },
        dateClose: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeClose: {
            type: DataTypes.TIME,
            allowNull: false
        },

    })

    return case_tb

}