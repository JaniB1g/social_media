const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments",{
        comments:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    })
    return Comments;
}