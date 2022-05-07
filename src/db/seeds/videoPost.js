const { VideoPost } = require("../../models");
const videoPosts = require("../data/videoPost");

const videoPostSeeder = async () => {
  try {
    let myVideoPost;
    for (const videoPost of videoPosts) {
      myVideoPost = await VideoPost.create({
        caption: videoPost.caption,
        user_id: videoPost.user_id,
        video_path: videoPost.video_path,
      });
      for (const tag of videoPost.tags) {
        await myVideoPost.addTag(tag);
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log("Seed video post successfully");
};

module.exports = videoPostSeeder;
