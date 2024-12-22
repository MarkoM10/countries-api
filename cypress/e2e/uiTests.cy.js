describe("UI related tests", () => {
  beforeEach("Visit homepage before each test", () => {
    cy.getCountries();
  });
  it("Homepage UI tests", () => {
    cy.contains("h1", "Svet na dlanu").should("not.be.empty");
  });

  it("Search filter test", () => {
    cy.get("#myInput").click().type("srbija");

    cy.contains("label", "Srbija").should("contain", "Srbija");
  });

  it("Favorites test", () => {
    cy.get('[data-icon="heart"]').first().click();

    cy.contains("label", "OMILJENE").click();

    cy.get(".favorite-card")
      .find("label")
      .first()
      .then((label) => {
        expect(label[0].innerText).to.equal(
          "Južna Georgija i otočje Južni Sandwich"
        );
      });
  });
});
