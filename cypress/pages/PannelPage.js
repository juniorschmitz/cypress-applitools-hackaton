class PannelPage {

  getloggedInfo() { return cy.get(`.logged-user-info-w`) }
  getAccessExpensesButton() { return cy.get(`#showExpensesChart`) }
  
  open() {
      super.open()
  }

  submit() {
      this.submitBtn.click()
  }
}

export default PannelPage;
