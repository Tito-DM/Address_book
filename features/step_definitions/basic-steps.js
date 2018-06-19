const { After, Given, Then, When } = require('cucumber')

Given('I visit the site', async function () {
  return await this.openHomePage()
})
Then('I should see {string}', async function (content) {
  return await this.pageHasTextContent(content)
})
When('I click {string', async function(string){
  //Write code here that turns the phrase above into concrete action
  return 'pending'
})
Then('I fill in {string} with {string}', async function (field, content) {
  return await this.fillFormField(field.toLowerCase(), content)
})
Then('I should have {int} concat in my address book', async function(int){
//Write code here that turns the phrase above concrete actions
return 'pending'
})
Then('I should not see {string}', async function(string){
  //Write code here that turns the phrase above concrete actions
  return 'pending'
  
})

After(async function(){
  return await this.closeHomePage()
})

When('I click {string}', async function (string) {

  return await this.clickOnAddContactBtn('add contact')
  
})

Then('I should have {int} contact in my address book', async function(contactCount) {

  return await this.checkContactStorageCount(contactCount);
  
})

