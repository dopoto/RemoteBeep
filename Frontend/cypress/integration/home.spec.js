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
                lastNotification: {
                    text: "Connected to server.",
                    type: "info",
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
    });

    it("displays text on home page", () => {
        cy.get(".logo").should("contain.text", "RemoteBeep");
    });
});
