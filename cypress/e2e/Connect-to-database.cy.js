//import { ObjectId } from 'mongodb';
describe('connect to databaase',()=>{
var min=10
var max=100
//var _id='64ccebb501abc4a5cf24a95f'
before('generate email',()=>{
  cy.readFile('cypress/fixtures/register.json').then((user) => {
  user.email='mail'+parseInt(Math.random() * (max - min) + min)+'@gmail.com'
         cy.writeFile('cypress/fixtures/register.json',user)
  })
  })
it('connect and insert a document',()=>{
cy.fixture('register.json').then((user)=>{
cy.insertOne(user,Cypress.config('database'),Cypress.config('collection')).then(result => {
    cy.log(result); // prints the _id of inserted document
})
})
})


it('connect and find a document',()=>{
cy.findOne({"email": "mail50@gmail.com"},Cypress.config('database'),Cypress.config('collection')).then(result => {
    cy.log(result);
})
})

it('connect and find and update a document',()=>{
cy.findOneAndUpdate({"email": "mail5112@gmail.com"}, {$set: { "email": "mail5113@gmail.com"} },Cypress.config('database'),Cypress.config('collection'), { upsert: true }).then(result => {
    cy.log(result);
})
})


























})