/// <reference types="cypress" />
// https://on.cypress.io/introduction-to-cypress

describe("Smoke tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    // TODO Add a few simple tests where server responses are not stubbed, just to check that the app is 
    // running properly
    // https://docs.cypress.io/guides/guides/network-requests#Use-Server-Responses

    // it("displays text on home page", () => {
    //     cy.get(".mnu-app__container").should("contain.text", "enus_home");
    // });
});

