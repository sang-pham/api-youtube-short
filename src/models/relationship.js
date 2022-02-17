const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Relationship extends Model {}

Relationship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(["follow", "block"]),
    },
  },
  {
    sequelize,
    modelName: "Relationship",
    tableName: "relationships",
    timestamps: true,
  }
);

module.exports = Relationship;
