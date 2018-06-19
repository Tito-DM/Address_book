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

    storeTaskInLocalStorage(contact)
  })

})

function storeTaskInLocalStorage(concats) {

  let tasks;

  if (localStorage.getItem('concats') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('concats'));
  }

  tasks.push(concats);

  localStorage.setItem('concats', JSON.stringify(tasks));
  renderContacts();
}



const renderContacts = () =>{




  //select the container we will use to list the contacts

  let div = document.querySelector('.contact-list')

  let tasks;

  if (localStorage.getItem('concats') === null) {
    tasks = [];
     div.innerHTML = '<p>You have no contacts in your address book</p>'
  } else {
    tasks = JSON.parse(localStorage.getItem('concats'));
    div.innerHTML = '';

 
    // For every contact in our array of contacts, we will
    // create a li element that will contain a card with
    // all the information of the contact

    tasks.forEach(contact => {
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
        <a href="#" class="edit" > <i class = "material-icons edit" > edit </i></a >
        </div> 
        </div>
      
      `

      // add the contacts to ul we create
         div.appendChild(card);
    })

    //lastly append the ul to div
 
  }


}


//add event list do delete and edit
document.querySelector('.contact-list').addEventListener('click', removeContact);

//remove contact

function removeContact(e){

if (e.target.parentElement.classList.contains('delete')) {
     console.log(e.target, "delete");
     e.target.parentElement.parentElement.parentElement.remove();
     removeTaskFromLoacalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
}

if (e.target.parentElement.classList.contains('edit')){
   console.log(e.target, "edit");
   
}

e.preventDefault();

}

//remove from local storage
function removeTaskFromLoacalStorage(taskItem) {
  let tasks;
   console.log(taskItem)
  if (localStorage.getItem('concats') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('concats'));
  }

  tasks.forEach(function (task, index) {
    console.log(task.company, taskItem)

    if (task.company === taskItem) {
      tasks.splice(index, 1);
    }

    localStorage.setItem('concats', JSON.stringify(tasks))

  })

}


