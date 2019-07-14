const Post = require("./models").Post;
const Comment = require("./models").Comment;
const User = require("./models").User;
<<<<<<< HEAD
const Vote = require("./models").Vote;
=======
const Topic = require("./models").Topic;
>>>>>>> assignment-comments

module.exports = {
  addPost(newPost, callback) {
    return Post.create(newPost)
      .then(post => {
        callback(null, post);
      })
      .catch(err => {
        callback(err);
      });
  },
  getPost(id, callback) {
    return Post.findById(id, {
<<<<<<< HEAD
      include: [
        { model: Comment, as: "comments", include: [{ model: User }] },
        { model: Vote, as: "votes" }
      ]
    });
  },

  deletePost(req, callback) {
    return Post.findById(req.params.id)
=======
      include: [{ model: Comment, as: "comments", include: [{ model: User }] }]
    })
>>>>>>> assignment-comments
      .then(post => {
        callback(null, post);
      })
      .catch(err => {
        callback(err);
      });
  },
  deletePost(id, callback) {
    return Post.destroy({
      where: { id }
    })
      .then(deleteRecordsCount => {
        callback(null, deleteRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },
  updatePost(id, updatedPost, callback) {
    return Post.findById(id).then(post => {
      if (!post) {
        return callback("Post not found");
      }
      post
        .update(updatedPost, {
          fields: Object.keys(updatedPost)
        })
        .then(() => {
          callback(null, post);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
