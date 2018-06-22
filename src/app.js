

document.addEventListener('DOMContentLoaded', () => {

   renderContacts();

  // Select form object from the DOM
const addContactForm = document.querySelector('.new-contact-form')
  // Register an event to listen for form submissio
    addContactForm.addEventListener('submit', event => {
    // Disable default behavior when submitting form
    event.preventDefault()
    // Get all inputs elements from the form
    const {
      name,
      email,
      phone,
      company,
      notes,
      twitter,
    } = addContactForm.elements
    // Create contact object
    const contact = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value,
    }
      console.log(`Saving the following contact: ${JSON.stringify(contact)}`)

      storeContactInLocalStorage(contact)
  })

})

function storeContactInLocalStorage(contact) {

  let contacts;

  if (localStorage.getItem('contacts') === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  contacts.push(contact);

  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();
}



const renderContacts = () =>{




  //select the container we will use to list the contacts

  let div = document.querySelector('.contact-list')

  let contacts;

  if (localStorage.getItem('contacts') === null) {
    contacts = [];
     div.innerHTML = '<p>You have no contacts in your address book</p>'
  } else {
    contacts = JSON.parse(localStorage.getItem('contacts'));
    div.innerHTML = '';

 
    // For every contact in our array of contacts, we will
    // create a li element that will contain a card with
    // all the information of the contact

    contacts.forEach(contact => {
      let card = document.createElement('div')
      card.className = 'col s12 m4'
      card.innerHTML = `
        <div class = "card" >
        <div class = "card-image">
        <img src = "https://ca-address-book.herokuapp.com/images/pine.jpg">
       </div>
        <div class = "card-content">
       <span class = "card-title"> ${contact.name}</span> 
          <p>${ contact.notes }</p> 
      <h2>${ contact.company }</h2> 
      ${ contact.email } | 
      <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a> 
        <a href="#" class="delete" > <i class = "material-icons " > delete </i></a >
         <a class=" modal-trigger" href="#modal1"><i class = "material-icons " > edit </i></a>
        </div> 
        </div>
      `
      // add the contacts to ul we create
         div.appendChild(card);
    })
 
  }


}


//add event list do delete and edit
document.querySelector('.contact-list').addEventListener('click', removeContact);

//remove contact

function removeContact(e){
 

if (e.target.parentElement.classList.contains('delete')) {
    
     e.target.parentElement.parentElement.parentElement.remove();
     
    
     removecontactFromLoacalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    
    
}





e.preventDefault();

}

//remove from local storage
function removecontactFromLoacalStorage(contactList) {
  let contacts;
  
  if (localStorage.getItem('contacts') === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  contacts.forEach(function (contact, index) {
    console.log(contact.company, contactList)

    if (contact.company === contactList) {
      contacts.splice(index, 1);
        
    }

    localStorage.setItem('contacts', JSON.stringify(contacts))

  })

}



