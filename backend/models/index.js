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

sequelize.sync({ alter: true }).then(() => {
    console.log('Yes re-sync done!')
})

module.exports = db
