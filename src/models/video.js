const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");
const Tag = require("./tag");

class Video extends Model {}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.TEXT,
    },
    path: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Video",
  }
);

Video.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

User.hasMany(Video, {
  foreignKey: "user_id",
  as: "videos",
});

Video.belongsToMany(Tag, {
  through: "videos_tags",
  foreignKey: "video_id",
});

Tag.belongsToMany(Video, {
  through: "videos_tags",
  foreignKey: "tag_id",
});

module.exports = Video;
