const serviceAccountJson = Cypress.env("CREDENTIALS");
// To get credentials for a service account, follow instructions here and then put url to path credentials below:
// NOTE: env variable must be named CYPRESS_CREDENTIALS and config file must be in the cypress/config/ folder
// https://cloud.google.com/docs/authentication/getting-started

describe("User can create a student account", () => {
  let testEmail = "test@example.com";
  it("can sign up", function () {
    cy.visit("/sign_up").then(() => {
      cy.exec("node ./cypress/utils.js", {
        env: { userEmail: testEmail, serviceAccount: serviceAccountJson },
      }).then((result) => {
        console.log(result.code);
        console.log(result.stderr);
        console.log(result.stdout);
      });

      cy.get('[placeholder="name"]')
        .should("be.visible")
        .click()
        .type("Student 1");
      cy.get('[placeholder="age"]').should("be.visible").click().type("10");

      cy.get('[placeholder="email address"]')
        .should("be.visible")
        .click()
        .type(testEmail);

      var password = Math.random().toString(36) + "a1!";
      cy.get('[placeholder="password"]')
        .should("be.visible")
        .click()
        .type(password);

      cy.get('[placeholder="confirm password"]')
        .should("be.visible")
        .click()
        .type(password);

      cy.get('[type="button"]').contains("sign up").click();
      cy.location("pathname").should("eq", "/dashboard");
    });
  });
});
