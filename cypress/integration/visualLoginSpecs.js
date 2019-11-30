import LoginPage from '../pages/LoginPage';
import ExpensesPage from '../pages/ExpensesPage';
import PannelPage from '../pages/PannelPage';

describe('Login', () => {
  beforeEach(() => {
    cy.eyesOpen({
      appName: 'CyPress Hackaton',
      testName: 'Should have the correct informations on the page',
      browser: { width: 800, height: 600, name: 'chrome' },
      matchLevel: 'Content',
      batchName: 'Login'
    })
  });

  afterEach(() => {
    cy.eyesClose()
    cy.reload()
  });

  it('Should have the correct informations on the page', () => {
    let loginPage = new LoginPage()
    loginPage.load()

    cy.eyesCheckWindow('Login Page')

    loginPage.getUserFieldName().should('exist').contains('Username')
    loginPage.getPasswordFieldName().should('exist').contains('Password')
    loginPage.expectSocialMediaLinks()

    cy.eyesCheckWindow({
      sizeMode: 'selector',
      selector: loginPage.getUserFieldName()
    })

    cy.eyesCheckWindow({
      sizeMode: 'selector',
      selector: loginPage.getPasswordFieldName()
    })

    loginPage.expectSocialMediaLinks()

    cy.eyesCheckWindow({
      sizeMode: 'selector',
      selector: loginPage.expectSocialMediaLinks()
    })
  });

  it('Should show an error message on empty email input', () => {
    let loginPage = new LoginPage()
    loginPage.load()

    loginPage.performLoginEmptyEmail('213123')

    loginPage.getAlertWarning()
        .should('exist')
        .contains('Username must be present')

    cy.eyesCheckWindow('Login Page after empty e-mail login trial')
  });

  it('Should show an error message on empty password input', () => {
  
    let loginPage = new LoginPage()
    loginPage.load()

    loginPage.performLoginEmptyPassword('blabla@test.com')

    loginPage.getAlertWarning()
        .should('exist')
        .contains('Password must be present')

    cy.eyesCheckWindow('Login Page after empty password login trial')
  });

  it('Should show an error message on empty email and password', () => {
    let loginPage = new LoginPage()
    loginPage.load()

    loginPage.performLoginEmptyMailPassword()

    loginPage.getAlertWarning()
        .should('exist')
        .contains('Both Username and Password must be present')

    cy.eyesCheckWindow('Login Page after empty e-mail and password trial')
  });
    
  it('Should sign in with correct credentials', () => {
    let loginPage = new LoginPage()
    loginPage.load()

    const pannelPage = new PannelPage()
    loginPage.performLogin('blablabla@teste.com', '12345')

    pannelPage.getloggedInfo().should('exist')

    cy.eyesCheckWindow('Pannel page after successful login')
  });

  it('Should access the Expenses Page', () => {
    let loginPage = new LoginPage()
    loginPage.load()

    const pannelPage = new PannelPage()
    loginPage.performLogin('blablabla@teste.com', '12345')

    cy.eyesCheckWindow('Pannel page after successful login')

    const expensesPage = new ExpensesPage()
    pannelPage.getAccessExpensesButton().click()

    expensesPage.getExpensesChart().should('exist')

    cy.eyesCheckWindow('Expenses page')
  });
});
