const appConst = require("../constants");
const AWS = require("aws-sdk");
const fs = require("fs");
const { path } = require("express/lib/application");
const { VideoPost, Tag } = require("../models");
// import {Readable, ReadableOptions} from "stream";

const ID = appConst.s3Key.keyID;
const SECRET = appConst.s3Key.keySecret;
const BUCKET_NAME = "mobilehihi";
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const mediaUpload = async (req, res) => {
  // Read content from the x1
  //   let { description } = req.body;
  try {
    // let userId = Number(req.auth.id);
    // let user = await User.findOne({
    //   where: {
    //     id: userId,
    //   },
    // });
    // const fileContent = fs.createReadStream(file.path);
    // Setting up S3 upload parameters
    // const params = {
    //   Bucket: BUCKET_NAME,
    //   Key: file.filename, // File name you want to save as in S3
    //   Body: fileContent,
    //   ACL: 'public-read',
    // };

    // Uploading files to the bucket
    // await s3.upload(params, function (err, data) {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log(`File uploaded successfully. ${data.Location}`);
    //   return res.status(200).json({
    //     url: data.Location,
    //   });
    // });
    const file = req.file;
    let userId = Number(req.auth.id);
    let { caption, tags } = req.body;
    let videoPost = await VideoPost.create({
      user_id: userId,
      caption,
      video_path: file.path,
    });

    let myTag;
    if(tags) {
      tags = tags.split(",").map((tag) => tag.trim());
    }
    if (tags && tags.length) {
      for (const tag of tags) {
        if (tag) {
          myTag = await Tag.findOne({
            where: {
              name: tag,
            },
          });
          if (!myTag) {
            myTag = await Tag.create({
              name: tag,
            });
          }
          await videoPost.addTag(myTag);
        }
      }
    }

    return res.status(200).json({
      videoPost,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  mediaUpload,
};
// export class SmartStream extends Readable {
//     _currentCursorPosition = 0; // Holds the current starting position for our range queries
//     _s3DataRange = 2048 * 1024; // Amount of bytes to grab (I have jacked this up HD video files)
//     _maxContentLength; // Total number of bites in the file
//     _s3; // AWS.S3 instance
//     _s3StreamParams; // Parameters passed into s3.getObject method

//     constructor(
//         parameters,
//         maxLength,
//         // You can pass any ReadableStream options to the NodeJS Readable super class here
//         // For this example we wont use this, however I left it in to be more robust
//         nodeReadableStreamOptions
//     ) {
//         super(nodeReadableStreamOptions);
//         this._maxContentLength = maxLength;
//         this._s3 = s3;
//         this._s3StreamParams = parameters;
//     }

//     _read() {
//         if (this._currentCursorPosition > this._maxContentLength) {
//             // If the current position is greater than the amount of bytes in the file
//             // We push null into the buffer, NodeJS ReadableStream will see this as the end of file (EOF) and emit the 'end' event
//             this.push(null);
//         } else {
//             // Calculate the range of bytes we want to grab
//             const range = this._currentCursorPosition + this._s3DataRange;
//             // If the range is greater than the total number of bytes in the file
//             // We adjust the range to grab the remaining bytes of data
//             const adjustedRange =
//                 range < this._maxContentLength ? range : this._maxContentLength;
//             // Set the Range property on our s3 stream parameters
//             this._s3StreamParams.Range = `bytes=${this._currentCursorPosition}-${adjustedRange}`;
//             // Update the current range beginning for the next go
//             this._currentCursorPosition = adjustedRange + 1;
//             // Grab the range of bytes from the file
//             this._s3.getObject(this._s3StreamParams, (error, data) => {
//                 if (error) {
//                     // If we encounter an error grabbing the bytes
//                     // We destroy the stream, NodeJS ReadableStream will emit the 'error' event
//                     this.destroy(error);
//                 } else {
//                     // We push the data into the stream buffer
//                     this.push(data.Body);
//                 }
//             });
//         }
//     }
// }
