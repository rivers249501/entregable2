const { DataTypes } = require('sequelize')

const { sequelize} = require('../util/database')

const Comment = sequelize.define('comment', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "active"
    }
})

module.exports = { Comment }

