context('verify home page plugins', () => {
const tab=['a','b','c','d']
 before(() => {
    cy.clearCookie('decathlon.fr').should('be.null')
    cy.getCookie('decathlon.fr').should('be.null')
    //cy.origin('https://lemoteur.orange.fr')
    cy.visit('https://www.decathlon.fr/')
    cy.wait(100)
   // cy.contains('Continuer sans accepter').click()
    //cy.contains('Continuer sans accepter').should('not.exist')
  })

  it('recherche dans le formulaire',()=>{
    // cy.get('[data-anly="global-search-input"]').type('maillot').should('have.value','maillot')
    cy.get('[data-anly="global-search-input"]').then($search => {
    cy.wrap($search).type('maillot');
    })
     cy.get('[aria-label="Rechercher un produit, un sport ou une référence"]').last().click()
     cy.wait(3000)
  })
  it('cy.url() - get the current URL', () => {

    cy.url().should('eq', 'https://www.decathlon.fr/search?Ntt=maillot')
  })
it('cy.location() - get window.location', () => {
 cy.location().should((location) => {
      expect(location.hash).to.be.empty
      expect(location.href).to.eq('https://www.decathlon.fr/search?Ntt=maillot')
      expect(location.host).to.eq('www.decathlon.fr')
      expect(location.hostname).to.eq('www.decathlon.fr')
      expect(location.origin).to.eq('https://www.decathlon.fr')
      expect(location.pathname).to.eq('/search')
      expect(location.port).to.eq('')
      expect(location.protocol).to.eq('https:')
      expect(location.search).to.eq('?Ntt=maillot')
    })
})

   // it('cy.writeFile() - write to a file', () => {

   // cy.writeFile('cypress/fixtures/profile1.json', {
    //  id: 8739,
      //name: 'Jane',
     // email: 'jane@example.com',
   // })
   // cy.fixture('profile1').should((profile) => {
     // expect(profile.name).to.eq('Jane')
   // })
 //})
   it('cy.readFile() - read file contents', () => {
    cy.readFile('Cypress/fixtures/profile1.json').then((data) => {
      cy.log(data)
      expect(data.name).to.eq('Jane')
    })
 })
it('wrap dans un tableau',()=> {
 cy.wrap(tab).each((item)=> {
 cy.log(item)})
})
it('wrap name',()=>{

const getName = () => {
  return 'Jane Lane'
}
cy.wrap({ name: getName }).invoke('name').should('eq', 'Jane Lane')
})

it('cy.go back or forward',()=>{
 cy.location('pathname').should('include', 'search')
 cy.go('back')
    cy.location('pathname').should('not.include', 'search')
    cy.go('forward')
    cy.location('pathname').should('include', 'search')
})
it('exemple ',()=>{
cy.get('ul>li').eq(2)
cy.intercept('/search/**')
})
it('API requests RECHERCHE',()=>{
cy.request('GET', 'https://www.decathlon.fr/search?Ntt=leggings').should((response) => {
  expect(response.status).to.have.value(200)
  })
})

it('Redirect',()=>{
cy.get('[data-anly="tool-zone-account"]').click()
cy.origin('https://login.decathlon.net', () => {
cy.contains('Créer un compte DECATHLON').click()
cy.get('#input-email').type('haythemsouissi@gmail.com')
cy.get('#lookup-btn-signup').click()
cy.get('#input-password').type('Bechno9tlik')
cy.contains('Valider').click()
cy.contains('Confirmer et continuer').click()

})

})
})
