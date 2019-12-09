describe('Bloglist ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joonas Kinnunen',
      username: 'joonaskinnunen',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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
    cy.contains('Joonas Kinnunen logged in')
  })

  it('new blog creating works', function () {
    cy.get('[data-cy=username]')
      .type('joonaskinnunen')
    cy.get('[data-cy=password]')
      .type('password')
    cy.get('[data-cy=login]')
      .click()
    cy.contains('Joonas Kinnunen logged in')
    cy.contains('create new')
      .click()
    cy.get('[data-cy=title]')
      .type('New Blog')
    cy.get('[data-cy=author]')
      .type('Joonas Kinnunen')
    cy.get('[data-cy=url]')
      .type('http://newblogurl.com')  
    cy.get('[data-cy=newBlog]')
      .click()
    cy.contains('New Blog Joonas Kinnunen')
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