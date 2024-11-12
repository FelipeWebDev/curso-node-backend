const Posts = require("../models/Posts");
const Users = require("../models/Users");

class PostController {
  async create(req, res) {
    const { image, description } = req.body;

    const newPost = await Posts.create({
      image,
      description,
      author_id: req.userId,
    });

    if (!newPost) {
      return res.status(400).json({ message: "Failed to create post" });
    }

    return res.status(200).json({ data: { image, description } });
  }

  async update(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id: id,
      },
    });

    if (!verifyPost) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    if (verifyPost.author_id !== req.userId) {
      return res
        .status(401)
        .json({ message: "You do not have permission to update this post" });
    }

    const updatedPost = await Posts.update(req.body, {
      where: {
        id
      }
    });

    if (!updatedPost) {
      return res.status(400).json({ message: "Failed to update post" });
    }

    return res.status(200).json({ message: "The post was updated successfully" });
  }

  async addLike(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id: id,
      },
    });

    if (!verifyPost) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    const likedPost = await Posts.update({
      number_likes: verifyPost.number_likes + 1
    }, {
      where: {
        id
      }
    });

    if (!likedPost) {
      return res.status(404).json({message: "Failed to add like to post"})
    }

    return res
    .status(200)
    .json({ 
      message: "Like storaged",
     });
  }

  async listMyPosts(req, res) {
    const allPosts = await Posts.findAll({
      attributes: ['id', 'description', 'number_likes', 'image'],
      where: {
        author_id: req.userId
      },
    });

    if (!allPosts) {
      return res.status(404).json({ message: "Failed to list the author posts" });
    }

    return res.status(200).json({
      data: allPosts
    })
  }

  async listAllPosts(req, res) {
    const allPosts = await Posts.findAll({
      attributes: ['id', 'description', 'number_likes', 'image'],
      include: [
        {
          model: Users,
          as: 'user',
          required: true,
          attributes: ['id', 'user_name']
        },
      ]
    });

    if (!allPosts) {
      res.status(401).json({message: "Failed to list posts"})
    }

    return res.status(200).json({data: allPosts})
  }

  async delete(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id: id,
      },
    });

    if (!verifyPost) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    if (verifyPost.author_id !== req.userId) {
      return res
        .status(401)
        .json({ message: "You do not have permission to delete this post" });
    }

    const deletedPost = await Posts.destroy({
      where: {
        id,
      },
    });

    if (!deletedPost) {
      return res.status(400).json({ message: "Failed to delete post" });
    }

    return res
      .status(200)
      .json({ message: "The post was deleted successfully" });
  }
}

module.exports = new PostController();
