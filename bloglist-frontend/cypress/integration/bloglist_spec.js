describe('Bloglist ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('log in to application')
  })

  it('login works', function () {
    cy.get('[data-cy=username]')
      .type('joonaskinnunen')
    cy.get('[data-cy=password]')
      .type('password')
    cy.get('[data-cy=login]')
      .click()
    cy.contains('Joonas logged in')
  })

  it('wrong log in credentials shows error notification', function () {
    cy.get('[data-cy=username]')
      .type('joonaskinnunen')
    cy.get('[data-cy=password]')
      .type('wrongpassword')
    cy.get('[data-cy=login]')
      .click()
    cy.contains('wrong username of password')
  })

})