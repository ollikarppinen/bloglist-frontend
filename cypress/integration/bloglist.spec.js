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

  describe.only("When logged in", function() {
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

    it("users name is displayed", () => {
      cy.contains(`${user.name}`);
    });

    it("A blog can be created", function() {
      cy.contains("new note").click();
      cy.get("#title").type("title fii fuu");
      cy.get("#author").type("author");
      cy.get("#url").type("url");
      cy.get("#submit-new-blog").click();
      cy.contains("title fii fuu");
    });
  });
});
