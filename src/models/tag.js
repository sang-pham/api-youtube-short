const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Tag extends Model { }

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamp: false
  }
);

module.exports = Tag;
