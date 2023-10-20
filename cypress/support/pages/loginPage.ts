import 'cypress-wait-until';

export default class LoginPage {
  private locators = {
    userNameField: '#login-username',
    passwordField: '#login-password',
    signInButton: 'button[data-arrow-down="#login-username"]',
    loginSection: '#login'
  };

  checkLoginSectionIsVisible() {
    cy.get(this.locators.loginSection).should("be.visible");
  }

  enterUsername(username: string) {
    cy.get(this.locators.userNameField).type(username);
  }

  enterPassword(password: string) {
    cy.get(this.locators.passwordField).type(password);
  }

  clickSignInButton() {
    cy.get(this.locators.signInButton).click();
  }

  loginToEmail(username: string, password: string) {
    this.enterUsername(username);
    this.clickSignInButton();
    this.enterPassword(password);
    this.clickSignInButton();
    cy.wait(1100);
  }
}
