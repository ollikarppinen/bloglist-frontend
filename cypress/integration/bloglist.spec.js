const { _ } = Cypress;

describe("Blog app", function() {
  const user = {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen",
  };

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("when not logged in", function() {
    it("login form is shown", function() {
      cy.contains("log in to application");
    });
  });

  describe("when logging in", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("blogs");
    });

    it("fails with wrong credentials", function() {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe.only("when logged in", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "mluukkai",
        password: "salainen",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    describe.only("without blogs", function() {
      it("users name is displayed", () => {
        cy.contains(`${user.name}`);
      });

      it("A blog can be created", function() {
        cy.contains("new note").click();
        cy.get("#title").type("fuu title");
        cy.get("#author").type("bar author");
        cy.get("#url").type("baz url");
        cy.get("#submit-new-blog").click();
        cy.contains("fuu title");
      });
    });

    describe.only("with a blog", function() {
      beforeEach(function() {
        cy.createBlog({
          title: "fuu title",
          author: "bar author",
          url: "baz url",
          likes: 123,
        });
      });

      it("blog is shown", function() {
        cy.contains("fuu title");
      });

      it("liking increases blog likes", function() {
        cy.contains("view").click();
        cy.contains(123);
        cy.get("#like-blog-button").click();
        cy.contains(124);
      });

      it("user can delete the blog", function() {
        cy.contains("view").click();
        cy.get("#remove-blog-button").click();
        cy.contains("fuu title").should("not.exist");
      });
    });

    describe.only("with multiple blogs", function() {
      const blogs = [
        {
          title: "title 1",
          author: "author 1",
          url: "url 1",
          likes: 1,
        },
        {
          title: "title 5",
          author: "author 5",
          url: "url 5",
          likes: 5,
        },
        {
          title: "title 3",
          author: "author 3",
          url: "url 3",
          likes: 3,
        },
      ];
      beforeEach(function() {
        blogs.forEach(cy.createBlog);
      });

      it("blogs are shown in like order", function() {
        const toStrings = (cells$) => _.map(cells$, "textContent");
        cy.get(".blog")
          .then(toStrings)
          .then((blogTitles) => {
            expect(blogTitles).to.eql(
              blogs
                .sort((a, b) => b.likes - a.likes)
                .map(({ title, author }) => `${title} ${author}view`)
            );
          });
      });
    });
  });
});
