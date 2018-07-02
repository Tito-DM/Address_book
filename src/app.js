

document.addEventListener('DOMContentLoaded', () => {
 //hide error message
  document.getElementById('name-erro').style.display = 'none'
  document.getElementById('phone-erro').style.display = 'none'
  document.getElementById('exist-contact').style.display = 'none'

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


    //regular exp 
    const name_exp = /^([a-zA-Z]+\s?)([a-zA-Z]+\s?)?([a-zA-Z]+\s?)?$/;
    const phone_exp = /^\+?[0-9]+$/;

    //check if contact already exist
    let check_contacts;

    if (localStorage.getItem('contacts') === null) {
      check_contacts = [];
    } else {
      check_contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    //check variable

    let check ;

    check_contacts.forEach(function (contact) {
      if (contact.name === name.value && contact.email == email.value &&contact.phone == phone.value) {
            check = 'exist' //if finds a contact
      }

    })
        
        if (name.value === '' || !name_exp.test(name.value)) {
          document.getElementById('contact-name').style.borderBottom= '2px solid red '
          document.getElementById('name-erro').style.display = 'block'
        } else if (email.value === '') {
          //display something
        } else if (phone.value === '' || !phone_exp.test(phone.value)) {
          document.getElementById('contact-phone').style.borderBottom = '2px solid red '
          document.getElementById('phone-erro').style.display = 'block'
        } else if (check === 'exist'){
          setTimeout(() => {
               document.getElementById('exist-contact').style.display = 'block'
          }, 1000);
      
        }else {
          document.getElementById('contact-name').style.borderBottom = '1px solid gray'
          document.getElementById('name-erro').style.display = 'none'
          document.getElementById('contact-phone').style.borderBottom = '1px solid gray '
          document.getElementById('phone-erro').style.display = 'none'
          storeContactInLocalStorage(contact)
          addContactForm.reset();
        }
   
   
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



const renderContacts = () => {




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
      card.className = 'col s12 m5'
      card.innerHTML = `
        <div class = "card" >
        <div class = "card-image">
        <img src = "https://ca-address-book.herokuapp.com/images/pine.jpg">
       </div>
        <div class = "card-content">
       <span class = "card-title"> ${contact.name}</span> 
          <p>${ contact.notes}</p> 
      <h3>${ contact.company}</h3> 
        <h6> Phone  n&deg;: ${contact.phone}</h6> 
       <h6 id ='id' style = 'display:none'>${ contact.id}</h6> 
      ${ contact.email} | 
      <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
      <br>
       <br>
        <a href="#" class="delete red-text" > <i class = "material-icons " > delete </i></a >
         <a class=" modal-trigger edit" href="#modal1"><i class = "material-icons"> edit </i></a>
        </div> 
        </div>
      `
      // add the contacts to ul we create
    
      div.appendChild(card);
      
    
    })
   
  }


}

//global variable
let target;


//add event list do delete and edit
document.querySelector('.contact-list').addEventListener('click', removeContact);

//remove contact

function removeContact(e) {

     
  if (e.target.parentElement.classList.contains('delete')) {

    e.target.parentElement.parentElement.parentElement.remove();
    removecontactFromLoacalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
  }

  if (e.target.parentElement.classList.contains('edit')) {   
    target = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
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
  
    console.log(contact.id, contactList)
    if (contact.id == contactList) {
      console.log(contact.id)
      contacts.splice(index, 1);

    }

    localStorage.setItem('contacts', JSON.stringify(contacts))

  })

}

function makechange(){

  const editContactForm = document.querySelector('.edit-contact-form')
  
    const {
      name,
      email,
      phone,
      company,
      notes,
      twitter,
    } = editContactForm.elements

  let contacts;

  if (localStorage.getItem('contacts') === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }

  contacts.forEach(function (contact, index) {

    if (contact.id == target) {
      if(name.value !== ''){
        contact.name = name.value
      }
      if(email.value !== ''){
        contact.email = email.value
      }
      if(phone.value !== ''){
        contact.phone = phone.value
      }
      if (company.value !== '') {
        contact.company = company.value
      }
      if (notes.value !== '') {
        contact.notes = notes.value
      }
      if (twitter.value !== '') {
        contact.twitter = twitter.value
      }
    }
    localStorage.setItem('contacts', JSON.stringify(contacts))

  })
}
document.querySelector('.makechange').addEventListener('click', makechange)

//delete al contacts

document.querySelector('.btn-delete-all').addEventListener('click',()=>{
  //clear local storage
  localStorage.clear();
})


