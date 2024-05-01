const dbConfig = require('../configs/dbconfig')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database....')
    })
    .catch(err => {
        console.error(`Error connecting to the database: ${err}`);
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user_tb = require('./user_tb.model')(sequelize, DataTypes)
db.role_tb = require('./role_tb.model')(sequelize, DataTypes)
db.status_tb = require('./status_tb.model')(sequelize, DataTypes)
db.case_tb = require('./case_tb.model')(sequelize, DataTypes)

// one to one (one user have a one role) 
db.user_tb.belongsTo(db.role_tb, {
    foreignKey: 'roleId',
    as: 'role_tbs'
})
db.role_tb.hasOne(db.user_tb, {
    foreignKey: 'roleId',
    as: 'user_tbs'
})

// one to many (one case have a many status)
db.case_tb.belongsTo(db.status_tb, {
    foreignKey: 'statusId',
    as: 'status_tbs'
})
db.status_tb.hasMany(db.case_tb, {
    foreignKey: 'statusId',
    as: 'case_tbs'
})

// one to many (one tech has many cases)
db.user_tb.hasMany(db.case_tb, {
    foreignKey: 'techId',
    as: 'tech_cases'
});
// one to many (one case belongs to one tech)
db.case_tb.belongsTo(db.user_tb, {
    foreignKey: 'techId',
    as: 'case_tech'
});

// one to many (one user has many cases)
db.user_tb.hasMany(db.case_tb, {
    foreignKey: 'userId',
    as: 'user_cases'
});
// one to many (one case belongs to one user)
db.case_tb.belongsTo(db.user_tb, {
    foreignKey: 'userId',
    as: 'case_user'
});

sequelize.sync({ alter: true }).then(() => {
    console.log('Yes re-sync done!')
})

module.exports = db
