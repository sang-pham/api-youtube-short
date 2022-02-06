const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");

class Friendship extends Model {}

Friendship.init(
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
    modelName: "Friendship",
  }
);

Friendship.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Friendship.belongsTo(User, {
  foreignKey: "addressee_id",
  onDelete: "cascade",
});

module.exports = Friendship;
