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
import "./index";

Cypress.Commands.add('checkEmailIsReceived', (emailFrom: string, emailSubject: string, timeout: number = 30000) => {
    cy.waitUntil(() => {
        return cy.task("gmail:get-messages", {
            options: {
                subject: emailSubject,
                from: `<${emailFrom}>`
            },
        }).then((emails) => {
            return emails.length === 1;
        });
    }, {
        interval: 1000,
        timeout: timeout,
        errorMsg:  `Email from <${emailFrom}> with subject '${emailSubject}' not received within the timeout.`,
    });
});