import testData from "../../fixtures/testData.json"

export class HomePage {
  private locators = {
    createEmailButton: 'a[data-command="compose:new"]',
    sendEmailButton: 'button[data-command="compose:send"]:not([class="mobile"])',
    recipientField: 'input[placeholder="Komu…"]',
    subjectField: 'input[placeholder="Předmět…"]',
    emailBodyField: 'div[placeholder="Text e-mailu…"]',
    fileUploadInput: 'input[type="file"]',
    fileUploadButton: 'button[title="Přidat přílohu"]',
    attachment: 'li[class="attachment"]',
    sentEmailNav: 'a[title="Odeslané"]',
    lastSentEmailName: '(//a[@class="name"])[1]',
    lastSentEmailSubject: '(//a[@class="subject"])[1]',
    notification: 'div.notification',
    loginSection: '#login',
    loginWidget: '[data-dot="login-badge"]', 
    usersButton: '#badge',
    logOutButton: '[data-dot="logout"]'
  };

  sendEmail(recipient: string, subject: string, emailBody: string, fileUploadPath: string) {
    cy.origin(testData.baseUrl,
      { args: {locators: this.locators, recipient, subject, emailBody, fileUploadPath } },
      ({ locators, recipient, subject, emailBody, fileUploadPath }) => {
        Cypress.require('../e2e')
        cy.get(locators.createEmailButton).click();
        cy.get(locators.recipientField).type(recipient);
        cy.get(locators.subjectField).type(subject);
        cy.get(locators.emailBodyField).type(emailBody);
        cy.get(locators.fileUploadButton).click();
        cy.get(locators.fileUploadInput).selectFile({
          contents: Cypress.Buffer.from('file contents'), 
          fileName: fileUploadPath,
          mimeType: 'text/plain'}, {force: true});
        cy.get(locators.attachment).should("be.visible");
        cy.get(locators.sendEmailButton).click();
        cy.get(locators.notification).should("be.visible");
      })
  }

  checkThatEmailWasSent(recipient: string, subject: string) {
    cy.origin(testData.baseUrl, {args: {locators: this.locators, recipient, subject }}, 
      ({ locators, recipient, subject }) => {
      cy.get(locators.sentEmailNav).click();
      cy.xpath(locators.lastSentEmailName).should("have.text", recipient);
      cy.xpath(locators.lastSentEmailSubject).should("have.text", subject);
    })
  }

  logOut() {
    cy.origin(testData.baseUrl, { args: this.locators }, (locators) => {
      cy.get(locators.loginWidget).shadow().find(locators.usersButton).click();
      cy.get(locators.loginWidget).shadow().find(locators.logOutButton).click();
    })
  }
}
