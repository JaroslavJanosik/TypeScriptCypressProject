/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        checkEmailIsReceived(emailFrom: string, emailSubject: string, timeout?: number): Cypress.Chainable<boolean>;
    }
}