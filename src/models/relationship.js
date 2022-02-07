const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Relationship extends Model { }

Relationship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(["follow", "friend", "block"]),
    },
  },
  {
    sequelize,
    modelName: "Relationship",
    tableName: "relationships",
    timestamps: false
  }
);


module.exports = Relationship;
