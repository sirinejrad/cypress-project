describe('requests', () => {
var token=''
var min=10
var max=100
before('generate email',()=>{
  cy.fixture('register.json').then((user) => {
  user.email='mail'+parseInt(Math.random() * (max - min) + min)+'@gmail.com'
         cy.writeFile('cypress/fixtures/register.json',user)
  })


})
it('API requests RECHERCHE',()=>{
cy.request('GET', 'https://www.decathlon.fr/search?Ntt=leggings').should((response) => {
  // cy.log(response)
   expect(response.status).to.eq(200)
  })
})

//it('request API GMAIL',()=>{
//cy.request({
//method: 'POST',
//  url:Cypress.config('url')+'account/register', // baseUrl is prepend to URL
//  form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
//  body: {
//   firstName:'sirikne',
//   middleName:'',
//   lastName:'jradkou',
//   email:'sousou7anjhgjhtouksouuuoonnnnnnn@gmail.com',
//   password:'s123456',
//   passwordConfirm:'s123456'
//  },
//}).should(response=>{
//expect(response.body['message']).to.eq('Account created')
//expect(response.body['email']).to.eq('sousou7anjhgjhtouksouuuoonnnnnnn@gmail.com')
//expect(response.status).to.eq(201)
//
//
//})
//})
 it('register', () => {
  cy.fixture('register.json').then((user) => {
  cy.request({
method: 'POST',
 url:Cypress.config('url')+'account/register', // baseUrl is prepend to URL
  form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
  body: user
}).should(response=>{
expect(response.body['message']).to.eq('Account created')
expect(response.body['email']).to.eq(user['email'])
expect(response.status).to.eq(201)
})
 })
 })

it('login',()=>{
cy.fixture('register.json').then((user) => {
cy.request({
method: 'POST',
 url:Cypress.config('url')+'account/login', // baseUrl is prepend to URL
  form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
  body: {'email':user.email,'password':user.password}
}).should(response=>{
expect(response.body['message']).to.eq('Login success')
expect(response.status).to.eq(200)
token=response.body['token']
})
})
})

it('send mail',()=>{
cy.fixture('register.json').then((user) => {
cy.request({
method: 'POST',
 url:Cypress.config('url')+'email/send', // baseUrl is prepend to URL
  form: true,
   // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
 auth:{
    'bearer':token
  },
  body: {
  "from":user.email,
  "to":"bhim^@gmail.com",
  "subject":"cv",
  "message":"bhimm barchaaa" }
}).should(response=>{
expect(response.body['message']).to.eq('Email sent, reply received')
expect(response.status).to.eq(201)
})
})
})


































})