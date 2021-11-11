/// <reference types="cypress" />
// https://on.cypress.io/introduction-to-cypress

describe("When server responds as expected, ", () => {
    beforeEach(() => {
        const initialState = {
            appConfig: {
                isLoading: false,
                isConnectedToServer: true,
                isInGeneralError: false,
                componentUiStates: {
                    GroupInfo: { isExpanded: true },
                    PlayMode: { isExpanded: false },
                    SoundPlayer: { isExpanded: true },
                    Control: { isExpanded: false },
                },
            },
            sendReceive: {
                group: "my-group",
                connectionId: "my-conn",
                devicesInGroup: ["my-conn"],
            },
            playSounds: {
                isPlaying: false,
                mode: "ControlOnly",
                freqInKhz: 21,
                durationInSeconds: 27,
            },
        };
        cy.setLocalStorage("state", JSON.stringify(initialState));

        cy.hubPublish("removeFromGroup", "My removeFromGroup");
        cy.hubPublish("addedToGroup", "My addedToGroup");
        cy.hubPublish("removedFromGroup", "My removedFromGroup");
        cy.hubPublish("playCommandReceived", "My playCommandReceived");
        cy.hubPublish("stopCommandReceived", "My stopCommandReceived");

        cy.intercept(
            {
                method: "GET",
                url: "https://localhost:7133/devices-in-group?groupName=my-group",
            },
            ["my-conn"]
        ).as("devices-in-group"); // and assign an alias

        cy.visit("/");

        // TODO hack - remove. Without this, the page will get stuck in infinite loader mode.
        cy.get("#cdk-overlay-2").click();
    });

    it("displays title", () => {
        cy.get(".logo").should("contain.text", "RemoteBeep");
    });

    describe("Group Info component", () => {
        it("display a group address", () => {
            cy.get("[data-cy=group-url]").should(
                "have.value",
                "http://localhost:4220#/home;group=my-group"
            );
        });

        it("display a group info text", () => {
            cy.get("[data-cy=group-others]").should(
                "contain.text",
                "There is 1 other device in this group."
            );
        });

        it("displays a collapse button", () => {
            cy.get("[data-cy=group-info-collapse]").should("be.visible");
        });        
    });
});
