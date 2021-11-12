// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-mochawesome-reporter/register";
import "cypress-localstorage-commands";

Cypress.Commands.overwrite("visit", (originalFn, url) => {
    return originalFn(url, {
        onBeforeLoad(window) {
            window.signalrMock = signalrMock;
        },
    });
});

/**
 * Initialized from a known good app state in storage, with SignalR fully mocked.
 */
Cypress.Commands.add("initHappyPath", () => {
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
            mode: "PlayOnly",
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

    cy.visit("/");

    // TODO hack - remove. Without this, the page will get stuck in infinite loader mode.
    cy.get("#cdk-overlay-2").click();
});