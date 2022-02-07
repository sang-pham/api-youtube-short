const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Media extends Model { }

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    file_name: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM(["video", "image", "file"]),
    },
  },
  {
    sequelize,
    modelName: "Media",
    tableName: "media"
  }
);


module.exports = Media;
