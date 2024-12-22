Cypress.Commands.add("getCountries", () => {
  cy.fixture("countriesAPI.json").then((countriesData) => {
    cy.intercept("GET", "https://restcountries.com/v3.1/all", {
      statusCode: 200,
      body: countriesData,
    }).as("getCountriesReq");

    cy.visit("/");

    cy.wait("@getCountriesReq").then((response) => {
      const statusCode = response.response.statusCode;
      expect(statusCode).to.equal(200);
      const countriesData = response.response.body;
      cy.wrap(countriesData).each(($country) => {
        const cca2 = $country.cca2;
        expect(cca2).to.not.be.empty;
      });
    });
  });
});
