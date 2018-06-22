/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\ndocument.addEventListener('DOMContentLoaded', function () {\n\n  renderContacts();\n\n  // Select form object from the DOM\n  var addContactForm = document.querySelector('.new-contact-form');\n  // Register an event to listen for form submissio\n  addContactForm.addEventListener('submit', function (event) {\n    // Disable default behavior when submitting form\n    event.preventDefault();\n    // Get all inputs elements from the form\n    var _addContactForm$eleme = addContactForm.elements,\n        name = _addContactForm$eleme.name,\n        email = _addContactForm$eleme.email,\n        phone = _addContactForm$eleme.phone,\n        company = _addContactForm$eleme.company,\n        notes = _addContactForm$eleme.notes,\n        twitter = _addContactForm$eleme.twitter;\n    // Create contact object\n\n    var contact = {\n      id: Date.now(),\n      name: name.value,\n      email: email.value,\n      phone: phone.value,\n      company: company.value,\n      notes: notes.value,\n      twitter: twitter.value\n    };\n    console.log('Saving the following contact: ' + JSON.stringify(contact));\n\n    storeContactInLocalStorage(contact);\n  });\n});\n\nfunction storeContactInLocalStorage(contact) {\n\n  var contacts = void 0;\n\n  if (localStorage.getItem('contacts') === null) {\n    contacts = [];\n  } else {\n    contacts = JSON.parse(localStorage.getItem('contacts'));\n  }\n\n  contacts.push(contact);\n\n  localStorage.setItem('contacts', JSON.stringify(contacts));\n  renderContacts();\n}\n\nvar renderContacts = function renderContacts() {\n\n  //select the container we will use to list the contacts\n\n  var div = document.querySelector('.contact-list');\n\n  var contacts = void 0;\n\n  if (localStorage.getItem('contacts') === null) {\n    contacts = [];\n    div.innerHTML = '<p>You have no contacts in your address book</p>';\n  } else {\n    contacts = JSON.parse(localStorage.getItem('contacts'));\n    div.innerHTML = '';\n\n    // For every contact in our array of contacts, we will\n    // create a li element that will contain a card with\n    // all the information of the contact\n\n    contacts.forEach(function (contact) {\n      var card = document.createElement('div');\n      card.className = 'col s12 m4';\n      card.innerHTML = '\\n        <div class = \"card\" >\\n        <div class = \"card-image\">\\n        <img src = \"https://ca-address-book.herokuapp.com/images/pine.jpg\">\\n       </div>\\n        <div class = \"card-content\">\\n       <span class = \"card-title\"> ' + contact.name + '</span> \\n          <p>' + contact.notes + '</p> \\n      <h2>' + contact.company + '</h2> \\n      ' + contact.email + ' | \\n      <a href=\"https://www.twitter.com/' + contact.twitter + '\">@' + contact.twitter + '</a> \\n        <a href=\"#\" class=\"delete\" > <i class = \"material-icons \" > delete </i></a >\\n         <a class=\" modal-trigger\" href=\"#modal1\"><i class = \"material-icons \" > edit </i></a>\\n        </div> \\n        </div>\\n      ';\n      // add the contacts to ul we create\n      div.appendChild(card);\n    });\n  }\n};\n\n//add event list do delete and edit\ndocument.querySelector('.contact-list').addEventListener('click', removeContact);\n\n//remove contact\n\nfunction removeContact(e) {\n\n  if (e.target.parentElement.classList.contains('delete')) {\n\n    e.target.parentElement.parentElement.parentElement.remove();\n\n    removecontactFromLoacalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);\n  }\n\n  e.preventDefault();\n}\n\n//remove from local storage\nfunction removecontactFromLoacalStorage(contactList) {\n  var contacts = void 0;\n\n  if (localStorage.getItem('contacts') === null) {\n    contacts = [];\n  } else {\n    contacts = JSON.parse(localStorage.getItem('contacts'));\n  }\n\n  contacts.forEach(function (contact, index) {\n    console.log(contact.company, contactList);\n\n    if (contact.company === contactList) {\n      contacts.splice(index, 1);\n    }\n\n    localStorage.setItem('contacts', JSON.stringify(contacts));\n  });\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });