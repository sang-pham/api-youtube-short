const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING, //mean VARCHAR(255)
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING, //mean VARCHAR(255)
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hash_password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    description: {
      type: DataTypes.TEXT,
    },
    avatar_path: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    indexes: [
      { fields: ["first_name", "last_name"] },
      { fields: ["user_name"] },
    ],
  }
);


module.exports = User;
