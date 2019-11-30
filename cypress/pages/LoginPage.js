class LoginPage {
  constructor() { }
  
  load() {
    let app_url = ''
    if(Cypress.env('ENV_APP') == 'ok') {
      app_url = '/hackathon.html'
    }
    else {
      app_url = '/hackathonV2.html'
    }
    cy.visit(Cypress.env('baseurl_cy') + app_url)
  }

  getLoginForm() { return cy.get(`.menu-side`) }
  getEmailInput() { return cy.get(`input#username`) }
  getPassInput() { return cy.get(`input#password`) }
  getLoginButton() { return cy.get(`button#log-in`) }
  getAlertWarning() { return cy.get(`.alert-warning`) }
  getFormName() { return cy.get(`.auth-header`) }
  getUserFieldName() { return cy.get(`form > div:nth-child(1) > label`) }
  getPasswordFieldName() { return cy.get(`form > div:nth-child(2) > label`) }
  getTwitterIcon() { return cy.get(`img[src="img/social-icons/twitter.png"]`) }
  getFacebookIcon() { return cy.get(`img[src="img/social-icons/facebook.png"]`) }
  getLinkedinIcon() { return cy.get(`img[src="img/social-icons/linkedin.png"]`) }
  
  expectSocialMediaLinks() {
    this.getTwitterIcon().should('exist')
    this.getFacebookIcon().should('exist')
    this.getLinkedinIcon().should('exist')
    return this
  }

  performLogin(email, password) {
    this.getEmailInput().clear().type(email);
    this.getPassInput().clear().type(password);
    this.getLoginButton().click();
    return this
  }

  performLoginEmptyEmail(email) {
    this.getEmailInput().clear();
    this.getPassInput().clear().type(email);
    this.getLoginButton().click();
    return this
  }

  performLoginEmptyPassword(password) {
    this.getEmailInput().clear().type(password);
    this.getPassInput().clear();
    this.getLoginButton().click();
    return this
  }

  performLoginEmptyMailPassword() {
    this.getEmailInput().clear();
    this.getPassInput().clear();
    this.getLoginButton().click();
    return this
  }
}

export default LoginPage;
