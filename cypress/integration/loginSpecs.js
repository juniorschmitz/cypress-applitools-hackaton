import LoginPage from '../pages/LoginPage';
import ExpensesPage from '../pages/ExpensesPage';
import PannelPage from '../pages/PannelPage';

describe('Log in', () => {
  it('Should have the correct informations on the page', () => {
    let loginPage = new LoginPage()

    loginPage.load()

    loginPage.getUserFieldName().should('exist').contains('Username')
    loginPage.getPasswordFieldName().should('exist').contains('Password')
    loginPage.expectSocialMediaLinks()
  });

  it('Should show an error message on empty email input', () => {
    let loginPage = new LoginPage()

    loginPage.load()

    loginPage.performLoginEmptyEmail('213123')
    
    loginPage.getAlertWarning()
        .should('exist')
        .contains('Username must be present')
  });

  it('Should show an error message on empty password input', () => {
    let loginPage = new LoginPage()

    loginPage.load()

    loginPage.performLoginEmptyPassword('blabla@test.com');

    loginPage.getAlertWarning()
        .should('exist')
        .contains('Password must be present')
  });

  it('Should show an error message on empty email and password', () => {
    let loginPage = new LoginPage()

    loginPage.load()

    loginPage.performLoginEmptyMailPassword()

    loginPage.getAlertWarning()
        .should('exist')
        .contains('Both Username and Password must be present')
  });
    
  it('Should sign in with correct credentials', () => {
    let loginPage = new LoginPage()

    loginPage.load()

    const pannelPage = new PannelPage()
    loginPage.performLogin('blablabla@teste.com', '12345')

    pannelPage.getloggedInfo().should('exist')
  });

  it('Should access the Expenses Page', () => {
    let loginPage = new LoginPage()

    loginPage.load()

    const pannelPage = new PannelPage()
    loginPage.performLogin('blablabla@teste.com', '12345')

    const expensesPage = new ExpensesPage()
    pannelPage.getAccessExpensesButton().click()

    expensesPage.getExpensesChart().should('exist')
  });
});