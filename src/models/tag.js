const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Tag",
  }
);

module.exports = Tag;
