const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Reaction extends Model { }

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(["like", "love", "haha", "wow", "sad", "angry"]),
    },
  },
  {
    sequelize,
    modelName: "Reaction",
    tableName: "reactions",
    timestamp: false
  }
);



module.exports = Reaction;
