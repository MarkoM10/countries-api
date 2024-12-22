describe("API requests tests", () => {
  it("Get request for countries data", () => {
    cy.getCountries();
  });
});
