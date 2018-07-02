const { After, Given, Then, When } = require('cucumber')
 

Given('I visit the site', async function () {
  return await this.openHomePage()
})
Then('I should see {string}', async function (content) {
  return await this.pageHasTextContent(content)
})
Then('I fill in {string} with {string}', async function (field, content) {
  return await this.fillFormField(field.toLowerCase(), content)
})
Then('I should not see {string}', async function (content) {
  return await this.pageDoesNotHaveTextContent(content)
})
When('I click {string}', async function (string) {

  return await this.clickOnAddContactBtn('add contact')
})
Then('I should have {int} contact in my address book', async function(int){
  return await this.checkContactStorageCount(int)
})
Given('I want to Delete a contact', async function(){
   return await this.selectContact();
})

Then('Then I should have {int} contact in my address book', async function(int){
      return await this.DeleteContactBtn(int)
})




