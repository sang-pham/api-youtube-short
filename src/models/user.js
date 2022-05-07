const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

const PROTECTED_ATTRIBUTES = ['hash_password', 'role'];


class User extends Model {
  fullName() {
    return [this.first_name, this.last_name].join(' ');
  }

  toJSON() {
    // hide protected fields
    let attributes = Object.assign({}, this.get());
    for (let a of PROTECTED_ATTRIBUTES) {
      delete attributes[a];
    }
    return attributes;
  }
}



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
    },
    status: {
      type: DataTypes.INTEGER
    },
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
