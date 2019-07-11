const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const User = require("../../src/db/models").User;

describe("routes : topics", () => {
  beforeEach(done => {
    this.topic;
    sequelize.sync({ force: true }).then(() => {
      Topic.create({
        title: "JS Frameworks",
        description: "There are a lot of them"
      })
        .then(res => {
          this.topic = res;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  //context of admin user
  describe("admin user performing CRUD actions for Topic", () => {
    beforeEach(done => {
      User.create({
        email: "admin@example.com",
        password: "123456",
        role: "admin"
      }).then(user => {
        request.get(
          {
            // mock authentication
            url: "http://localhost:3000/auth/fake",
            form: {
              role: user.role, // mock authenticate as admin user
              userId: user.id,
              email: user.email
            }
          },
          (err, res, body) => {
            done();
          }
        );
      });
    });

    describe("GET /topics", () => {
      it("should respond with all topics", done => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

<<<<<<< HEAD
    describe("GET /topics/new", () => {
      it("should render a view with a new topic form", done => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Topic");
=======
  // define the guest user context
  describe("guest user performing CRUD actions for Post", () => {
    beforeEach(done => {
      request.get(
        {
          url: "http://localhost:3000/auth/fake",
          form: {
            role: "guest"
          }
        },
        (err, res, body) => {
          done();
        }
      );
    });

    describe("GET /topics/:topicId/posts/new", () => {
      it("should not render a new post form", done => {
        request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
          expect(body).toContain("Error");
>>>>>>> assignment-authorization
          done();
        });
      });
    });

<<<<<<< HEAD
    describe("POST /topics/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new topic and redirect", done => {
        request.post(
          options,

          (err, res, body) => {
            Topic.findOne({ where: { title: "blink-182 songs" } })
              .then(topic => {
                expect(topic.title).toBe("blink-182 songs");
                expect(topic.description).toBe(
                  "What's your favorite blink-182 song?"
                );
                done();
              })
              .catch(err => {
                console.log(err);
                done();
              });
=======
    describe("POST /topics/:topicId/posts/create", () => {
      it("should not create a new post", done => {
        const options = {
          url: `${base}/${this.topic.id}/posts/create`,
          form: {
            title: "Watching snow melt",
            body:
              "Without a doubt my favoriting things to do besides watching paint dry!"
          }
        };
        request.post(options, (err, res, body) => {
          Post.findOne({ where: { title: "Watching snow melt" } })
            .then(post => {
              expect(post).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });

    describe("GET /topics/:topicId/posts/:id", () => {
      it("should render a view with the selected post", done => {
        request.get(
          `${base}/${this.topic.id}/posts/${this.post.id}`,
          (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Snowball Fighting");
            done();
>>>>>>> assignment-authorization
          }
        );
      });
    });

<<<<<<< HEAD
    describe("GET /topics/:id", () => {
      it("should render a view with the selected topic", done => {
        request.get(`${base}${this.topic.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("POST /topics/:id/destroy", () => {
      it("should delete the topic with the associated ID", done => {
        Topic.findAll().then(topics => {
          const topicCountBeforeDelete = topics.length;

          expect(topicCountBeforeDelete).toBe(1);

          request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
            Topic.findAll().then(topics => {
              expect(err).toBeNull();
              expect(topics.length).toBe(topicCountBeforeDelete);
              done();
            });
          });
        });
=======
    describe("POST /topics/:topicId/posts/:id/destroy", () => {
      it("should not delete the post with the associated ID", done => {
        expect(this.post.id).toBe(1);

        request.post(
          `${base}/${this.topic.id}/posts/${this.post.id}/destroy`,
          (err, res, body) => {
            Post.findById(1).then(post => {
              expect(post).not.toBeNull();
              done();
            });
          }
        );
      });
    });

    describe("GET /topics/:topicId/posts/:id/edit", () => {
      it("should not render a view with an edit post form", done => {
        request.get(
          `${base}/${this.topic.id}/posts/${this.post.id}/edit`,
          (err, res, body) => {
            expect(body).not.toContain("Edit Post");
            done();
          }
        );
      });
    });

    describe("POST /topics/:topicId/posts/:id/update", () => {
      it("should not return a status code 302", done => {
        request.post(
          {
            url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
            form: {
              title: "Snowman Building Competition",
              body: "I love watching them melt slowly."
            }
          },
          (err, res, body) => {
            expect(res.statusCode).not.toBe(302);
            done();
          }
        );
>>>>>>> assignment-authorization
      });
    });

<<<<<<< HEAD
    describe("GET /topics/:id/edit", () => {
      it("should render a view with an edit topic form", done => {
        request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Topic");
          expect(body).toContain("JS Frameworks");
=======
  describe("owner or admin user performing CRUD actions for Post", () => {
    beforeEach(done => {
      User.create({
        email: "admin@example.com",
        password: "123456",
        role: "admin"
      }).then(user => {
        request.get(
          {
            url: "http://localhost:3000/auth/fake",
            form: {
              role: user.role,
              userId: user.id,
              email: user.email
            }
          },
          (err, res, body) => {
            done();
          }
        );
      });
    });

    describe("GET /topics/:topicId/posts/new", () => {
      it("should render a new post form", done => {
        request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Post");
>>>>>>> assignment-authorization
          done();
        });
      });
    });

<<<<<<< HEAD
    describe("POST /topics/:id/update", () => {
      it("should update the topic with the given values", done => {
        const options = {
          url: `${base}${this.topic.id}/update`,
          form: {
            title: "JS Frameworks",
            description: "There are a lot of them"
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();

          Topic.findOne({
            where: { id: this.topic.id }
          }).then(topic => {
            expect(topic.title).toBe("JS Frameworks");
            done();
          });
        });
=======
    describe("POST /topics/:topicId/posts/create", () => {
      it("should create a new post and redirect", done => {
        const options = {
          url: `${base}/${this.topic.id}/posts/create`,
          form: {
            title: "Watching snow melt",
            body:
              "Without a doubt my favoriting things to do besides watching paint dry!"
          }
        };
        request.post(options, (err, res, body) => {
          Post.findOne({ where: { title: "Watching snow melt" } })
            .then(post => {
              expect(post).not.toBeNull();
              expect(post.title).toBe("Watching snow melt");
              expect(post.body).toBe(
                "Without a doubt my favoriting things to do besides watching paint dry!"
              );
              expect(post.topicId).not.toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });

      it("should not create a new post that fails validations", done => {
        const options = {
          url: `${base}/${this.topic.id}/posts/create`,
          form: {
            title: "a",
            body: "b"
          }
        };
        request.post(options, (err, res, body) => {
          Post.findOne({ where: { title: "a" } })
            .then(post => {
              expect(post).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });

    describe("GET /topics/:topicId/posts/:id", () => {
      it("should render a view with the selected post", done => {
        request.get(
          `${base}/${this.topic.id}/posts/${this.post.id}`,
          (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Snowball Fighting");
            done();
          }
        );
>>>>>>> assignment-authorization
      });
    });

<<<<<<< HEAD
  //end context for admin user

  // context of member user
  describe("member user performing CRUD actions for Topic", () => {
    beforeEach(done => {
      request.get(
        {
          url: "http://localhost:3000/auth/fake",
          form: {
            role: "member"
          }
        },
        (err, res, body) => {
          //did not remove at refactoring
          done();
        }
      );
    });

    describe("GET /topics", () => {
      it("should respond with all topics", done => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("GET /topics/new", () => {
      it("should redirect to topics view", done => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Topics");
          done();
        });
      });
    });

    describe("POST /topics/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should not create a new topic", done => {
        request.post(options, (err, res, body) => {
          Topic.findOne({ where: { title: "blink-182 songs" } })
            .then(topic => {
              expect(topic).toBeNull(); // no topic should be returned
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });

    describe("GET /topics/:id", () => {
      it("should render a view with the selected topic", done => {
        request.get(`${base}${this.topic.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });

    describe("POST /topics/:id/destroy", () => {
      it("should not delete the topic with the associated ID", done => {
        Topic.findAll().then(topics => {
          const topicCountBeforeDelete = topics.length;

          expect(topicCountBeforeDelete).toBe(1);

          request.post(`${base}${this.topic.id}/destroy`, (err, res, body) => {
            Topic.findAll().then(topics => {
              expect(topics.length).toBe(topicCountBeforeDelete);
              done();
            });
          });
        });
      });
    });

    describe("GET /topics/:id/edit", () => {
      it("should not render a view with an edit topic form", done => {
        request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).not.toContain("Edit Topic");
          expect(body).toContain("JS Frameworks");
          done();
        });
=======
    describe("POST /topics/:topicId/posts/:id/destroy", () => {
      it("should delete the post with the associated ID", done => {
        expect(this.post.id).toBe(1);

        request.post(
          `${base}/${this.topic.id}/posts/${this.post.id}/destroy`,
          (err, res, body) => {
            Post.findById(1).then(post => {
              expect(err).toBeNull();
              expect(post).toBeNull();
              done();
            });
          }
        );
      });
    });

    describe("GET /topics/:topicId/posts/:id/edit", () => {
      it("should render a view with an edit post form", done => {
        request.get(
          `${base}/${this.topic.id}/posts/${this.post.id}/edit`,
          (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Post");
            expect(body).toContain("Snowball Fighting");
            done();
          }
        );
      });
    });

    describe("POST /topics/:topicId/posts/:id/update", () => {
      it("should return a status code 302", done => {
        request.post(
          {
            url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
            form: {
              title: "Snowman Building Competition",
              body: "I love watching them melt slowly."
            }
          },
          (err, res, body) => {
            expect(res.statusCode).toBe(302);
            done();
          }
        );
>>>>>>> assignment-authorization
      });
    });

    describe("POST /topics/:id/update", () => {
      it("should not update the topic with the given values", done => {
        const options = {
          url: `${base}${this.topic.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        };

        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Topic.findOne({
            where: { id: 1 }
          }).then(topic => {
            expect(topic.title).toBe("JS Frameworks"); //confirm title is unchanged
            done();
          });
        });
      });
    });
  });
});
