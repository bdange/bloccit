const Post = require("./models").Post;
const Comment = require("./models").Comment;
const User = require("./models").User;
const Topic = require("./models").Topic;
const Vote = require("./models").Vote;
const Authorizer = require("../policies/post");

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
      include: [{ model: Comment, as: "comments", include: [{ model: User }] }]
=======
      include: [
        { model: Comment, as: "comments", include: [{ model: User }] },
        { model: Vote, as: "votes" }
      ]
>>>>>>> checkpoint-voting
    })
      .then(post => {
        callback(null, post);
      })
      .catch(err => {
        callback(err);
      });
  },
<<<<<<< HEAD

=======
>>>>>>> checkpoint-voting
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
