require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

const db = {}

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: '3306',
    logging: false,
})

db.sequelize = sequelize

db.Cat = sequelize.define("Cat", {
    petName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.5,
    },
}, {
    timestamps: false
})

db.Hobby = sequelize.define("Hobby", {
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM(['Play', 'Feed', 'Relax', 'Other']),
        defaultValue: 'Other',
        allowNull: false,
    }
})

// m2m relationship Cat : Hobby
db.Cat.belongsToMany(db.Hobby, { through: 'cat_hobbies' })
db.Hobby.belongsToMany(db.Cat, { through: 'cat_hobbies' })

module.exports = db