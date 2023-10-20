import testData from "../fixtures/testData.json"
import { format, utcToZonedTime } from "date-fns-tz";
import { HomePage } from "support/pages/homePage";
import LoginPage from "support/pages/loginPage"

describe('Send Email', () => {
  const formattedTime = format(utcToZonedTime(new Date(), 'Europe/Bratislava'), 'yyyy-MM-dd HH:mm:ss');
  const emailSubject: string = `Test Email ${formattedTime}`;
  const emailBody: string = "Hi,\n\nthis is a test email.\n\nKind Regards\n\nJaroslav";
  const attachmentFile = "cypress/fixtures/attachment.txt";
  const loginPage = new LoginPage();
  const homePage = new HomePage();

  it('logs in > sends an email > checks that the email has been sent and received > logs out', () => {
    cy.visit(testData.baseUrl);
    loginPage.loginToEmail(testData.username, testData.password);
    homePage.sendEmail(testData.recipientEmail, emailSubject, emailBody, attachmentFile);
    homePage.checkThatEmailWasSent(testData.recipientEmail, emailSubject);
    cy.checkEmailIsReceived(testData.userEmail, emailSubject).then((result: boolean) => expect(result).to.eql(true));
    homePage.logOut();
    loginPage.checkLoginSectionIsVisible();
  })
})