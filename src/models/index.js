const { DataTypes } = require("sequelize");
const sequelize = require("./dbInstance");
const User = require("./user");
const Conversation = require("./conversation");
const Relationship = require("./relationship");
const Message = require("./message");
const Call = require("./call");
const VideoPost = require("./video_post");
const Comment = require("./comment");
const Media = require("./media");
const Tag = require("./tag");
const Reaction = require("./reaction");

//user-conversation
sequelize.define(
  "user_conversation",
  {
    is_seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "user_conversation",
    timestamps: true,
  }
);

User.belongsToMany(Conversation, {
  through: "user_conversation",
  foreignKey: "user_id",
  onDelete: "cascade",
});

Conversation.belongsToMany(User, {
  through: "user_conversation",
  foreignKey: "conversation_id",
  onDelete: "cascade",
});

//user-message
User.hasMany(Message, {
  as: "messages",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

Message.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

//message-message
Message.belongsTo(Message, {
  as: "parent",
  foreignKey: "parent_id",
  onDelete: "cascade",
});

Message.hasOne(Message, {
  as: "children",
  foreignKey: "parent_id",
  onDelete: "cascade",
});

//conversation-message
Conversation.hasMany(Message, {
  as: "messages",
  foreignKey: {
    name: "conversation_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

//message-call
Message.hasOne(Call, {
  as: "call",
  foreignKey: {
    name: "message_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

//relationship-user
Relationship.belongsTo(User, {
  foreignKey: {
    name: "relate_id",
    allowNull: false,
  },
  as: "receive",
  onDelete: "cascade",
});

Relationship.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  as: "own",
  onDelete: "cascade",
});

//video_post - user
VideoPost.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
  as: "user",
});

User.hasMany(VideoPost, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
  as: "videoPosts",
});

//video_post - comment
VideoPost.hasMany(Comment, {
  foreignKey: {
    name: "video_post_id",
    allowNull: false,
  },
  as: "comments",
  onDelete: "cascade",
});

Comment.belongsTo(VideoPost, {
  foreignKey: {
    name: "video_post_id",
    allowNull: false,
  },
  as: "videoPost",
  onDelete: "cascade",
});

//video_post - tag
VideoPost.belongsToMany(Tag, {
  through: "video_tag",
  as: "tags",
  foreignKey: "video_post_id",
});

Tag.belongsToMany(VideoPost, {
  through: "video_tag",
  as: "videoPosts",
  foreignKey: "tag_id",
});

//reaction-user
Reaction.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

//reaction - video_post
Reaction.belongsTo(VideoPost, {
  foreignKey: "video_post_id",
  onDelete: "cascade",
});

//reaction-message
Message.hasMany(Reaction, {
  foreignKey: "message_id",
  onDelete: "cascade",
});

//reaction-comment
Reaction.belongsTo(Comment, {
  foreignKey: "comment_id",
  onDelete: "cascade",
});

//message-media
Media.belongsTo(Message, {
  foreignKey: "message_id",
  onDelete: "cascade",
});

Message.hasMany(Media, {
  foreignKey: "message_id",
  as: "media",
});

//media-comment
Media.belongsTo(Comment, {
  foreignKey: "comment_id",
  onDelete: "cascade",
});

Comment.hasMany(Media, {
  foreignKey: "comment_id",
  as: "media",
});

//comment-comment
Comment.belongsTo(Comment, {
  foreignKey: "parent_id",
  onDelete: "cascade",
});

Comment.hasMany(Comment, {
  foreignKey: "parent_id",
  as: "children",
});

//comment-user
Comment.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

User.hasMany(Comment, {
  as: "comments",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "cascade",
});

sequelize.sync();

module.exports = {
  sequelize,
  Relationship,
  User,
  Conversation,
  Message,
  Conversation,
  VideoPost,
  Comment,
  Media,
  Reaction,
  Call,
  Tag,
};
