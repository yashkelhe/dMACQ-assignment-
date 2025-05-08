describe("Blog Interaction", () => {
  beforeEach(() => {
    cy.setCookie("token", "mock-token-123");
  });

  it("Opens a blog post and likes it", () => {
    cy.visit("/blog");
    cy.contains("Blog Post #1").click();
    cy.url().should("include", "/blog/1");
    cy.contains("Like").click();
    cy.contains("You liked the post!").should("be.visible");
  });
});
