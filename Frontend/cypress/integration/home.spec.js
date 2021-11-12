/// <reference types="cypress" />
// https://on.cypress.io/introduction-to-cypress

describe("When server responds as expected, ", () => {
    before(() => {
        cy.initHappyPath();
    });

    beforeEach(() => {
        cy.intercept(
            {
                method: "GET",
                url: "https://localhost:7133/devices-in-group?groupName=my-group",
            },
            ["my-conn"]
        ).as("devices-in-group");
    });

    it("displays title", () => {
        cy.get(".logo").should("contain.text", "RemoteBeep");
    });

    describe("Group Info component", () => {
        it("displays a group address", () => {
            cy.get("[data-cy=group-url]").should(
                "have.value",
                "http://localhost:4220#/home;group=my-group"
            );
        });

        it("displays a group info text", () => {
            cy.wait('@devices-in-group');
            cy.get("[data-cy=group-others]").should(
                "contain.text",
                "There is 1 other device in this group."
            );
        });

        it("displays a collapse button", () => {
            cy.get("[data-cy=group-info-collapse]").should("be.visible");
        });
    });

    describe("Play Mode component", () => {
        it("has Play Only checked", () => {
            cy.get(
                "[data-cy=toggle-play-only]"
            ).should("have.class", "mat-button-toggle-checked");
        });

        it("displays an expand button", () => {
            cy.get("[data-cy=play-mode-expand]").should("be.visible");
        });
    });
});