const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

Comment.belongsTo(Comment, {
  foreignKey: "parent_id",
  onDelete: "cascade",
});

Comment.hasMany(Comment, {
  foreignKey: "parent_id",
  as: "children",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
});

module.exports = Comment;
