const { Relationship, User } = require("../models");
const Sequelize = require("sequelize");

const updateOrCreate = async (req, res) => {
  try {
    let { id, status, user_id, relate_id } = req.body;
    let relationship;
    if (!id) {
      relationship = await Relationship.create({
        status,
        user_id,
        relate_id,
      });
    } else {
      relationship = await Relationship.findOne({
        where: {
          id,
        },
      });
      if (relationship) {
        if (status) {
          relationship.status = status;
        }
        if (user_id) {
          relationship.user_id = user_id;
        }
        if (relate_id) {
          relationship.relate_id = relate_id;
        }
        relationship.save();
      }
    }
    return res.status(200).json({ relationship });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getFollowings = async (req, res) => {
  try {
    let userId = req.params.userId || req.auth.id;
    let followings = await Relationship.findAll({
      where: {
        user_id: userId,
        status: "follow",
      },
      include: {
        all: true,
        attributes: ["first_name", "last_name", "user_name", "id"],
      },
    });
    return res.status(200).json({ followings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getFollowers = async (req, res) => {
  try {
    let userId = req.params.userId || req.auth.id;
    let followers = await Relationship.findAll({
      where: {
        relate_id: userId,
        status: "follow",
      },
      include: {
        all: true,
        attributes: ["first_name", "last_name", "user_name", "id"],
      },
    });
    return res.status(200).json({ followers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getBlocks = async (req, res) => {
  try {
    let userId = req.auth.id;
    let blocks = await Relationship.findAll({
      where: {
        user_id: userId,
        status: "block",
      },
      include: {
        all: true,
        attributes: ["first_name", "last_name", "user_name", "id"],
      },
    });
    return res.status(200).json({ blocks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const deleteRelationship = async (req, res) => {
  try {
    let { relationshipId } = req.params;
    if (relationshipId) {
      let relationship = await Relationship.findOne({
        where: {
          id: relationshipId,
        },
      });
      if (relationship) {
        await relationship.destroy();
        return res.status(200).json({ message: "Delete successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  updateOrCreate,
  getFollowers,
  getFollowings,
  getBlocks,
  deleteRelationship,
};
