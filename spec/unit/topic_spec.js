const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
  beforeEach(done => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then(res => {
      //#2
      Topic.create({
        title: "Best cities in Europe",
        description: "A quick guide of unknown cities in Europe"
      })
        .then(topic => {
          this.topic = topic;
          //#3
          Post.create({
            title: "Marseille, the new Barcelona",
            body: "Why you should discover this hidden jewel.",
            //#4
            topicId: this.topic.id
          }).then(post => {
            this.post = post;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#create()", () => {
    it("should create a post object with a title and description", done => {
      //#1
      Topic.create({
        title: "Antwerp, the Belgian jewel",
        description: "The world's capital of Jewels has so much more to offer"
      }).then(topic => {
        //#2
        expect(topic.title).toBe("Antwerp, the Belgian jewel");
        expect(topic.description).toBe(
          "The world's capital of Jewels has so much more to offer"
        );
        done();
      });
    });
    it("should not create a topic with missing title or description", done => {
      Topic.create({
        title: "Antwerp, the Belgian jewel",
        description: "The world's capital of Jewels has so much more to offer"
      })
        .then(topic => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Topic.title cannot be null");
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        });
    });
  });
  describe("#getPosts()", () => {
    it("should return the associated posts", done => {
      this.topic.getPosts().then(associatedPosts => {
        expect(associatedPosts[0].title).toBe("Marseille, the new Barcelona");
        done();
      });
    });
  });
});
