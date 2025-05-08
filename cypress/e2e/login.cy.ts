describe("Login and Blog Flow", () => {
  it("Logs in and navigates to blog", () => {
    cy.visit("/login");

    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("password123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/blog");
    cy.contains("Blog Post #1");
  });
});
