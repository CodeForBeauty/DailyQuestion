describe('Daily question', () => {
  const user = {
    name: 'test',
    password: 'password'
  }

  beforeEach(() => {
    cy.request('GET', 'http://localhost:3333/api/clear')

    cy.request('POST', 'http://localhost:3333/api/user/reg', user)
    cy.visit('http://localhost:5173/')
  })

  it('Login page shown', () => {
    cy.contains("Please login")
  })

  it('Can register', () => {
    cy.contains('label', 'Username:').type('test1')
    cy.contains('label', 'Password:').type('password')
    cy.contains('register').click()

    cy.contains('question archive')
  })

  it('Can login', () => {
    cy.contains('label', 'Username:').type('test')
    cy.contains('label', 'Password:').type('password')
    cy.contains('button', 'login').click()

    cy.contains('question archive')
  })

  it('Can leave answer', () => {
    cy.contains('label', 'Username:').type('test')
    cy.contains('label', 'Password:').type('password')
    cy.contains('button', 'login').click()

    cy.contains('leave answer').click()

    cy.contains('label', 'Answer:').type('something')

    cy.contains('Submit').click()

    cy.contains('something')
  })

  it('Admin can add question', () => {
    cy.contains('label', 'Username:').type('test')
    cy.contains('label', 'Password:').type('password')
    cy.contains('button', 'login').click()
    
    cy.visit('http://localhost:5173/admin')

    cy.contains('label', 'Password').type('something')
    cy.contains('label', 'Question').type('question')

    cy.contains('button', 'submit').click()

    cy.contains('Success')
  })
})