describe("User can create a student account", () => {
  it("can sign up", function () {
    cy.visit("/sign_up").then(() => {
      cy.get('[placeholder="name"]')
        .should("be.visible")
        .click()
        .type("Student 1");
      cy.get('[placeholder="age"]').should("be.visible").click().type("10");

      cy.get('[placeholder="email address"]')
        .should("be.visible")
        .click()
        .type("test@example.com");

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
