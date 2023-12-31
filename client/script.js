const serverURL = "http://localhost:3000/products";

const hideProductsBtn = document.getElementById("hideAllBtn");


// NY fetch funktion för att kunna visa allt i databasen i cards
function fetchProducts(e) {
  fetch(serverURL)
  .then((result) => result.json())
  .then((products) => {
    if (products.length > 0) {
      let html = `<div class="container-fluid row g-4">`;
      products.forEach((product) => {
        html += ` 
            <div class = "col-auto"> 
                <div class="card card-hover" style="width:190px; height:450px"> 
                    <div class="image-frame">
                        <img class="card-img-top" src="img/products/${product.productName}.webp" alt="Card image">
                    </div>    
                    <div class="card-body">
                    <h3 class="card-title">${product.productName}</h3>
                        <ul class="list-group list-group-flush ">
                            <li class="list-group-item">Price: ${product.productPrice}</li>
                            <li class="list-group-item">Quantity: ${product.productQuantity}</li>
                            <li class="list-group-item">Faction: ${product.productCategory}</li>
                            <li class="list-group-item">Product id: ${product.productID}</li>
                        </ul>
                        <div> 
                            <button type="button" class="updateBtn btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#submitModal" id="updateBtn-${product.productID}">Update</button>
                            <button type="button" class="btn btn-danger mt-2" onclick="handleDelete(${product.productID})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="deleteBtn-${product.productID}">Delete</button>
                        </div>
                    </div> 
                </div>
            </div>`;
      }); 

      html += `</div>`; 

      const cardSection = document.getElementById("card-section");
      cardSection.innerHTML = " ";
      cardSection.insertAdjacentHTML("beforeend", html);

      var elementCards = document.querySelectorAll('.card');

      hideProductsBtn.removeAttribute("hidden");

      elementCards.forEach(function (card) {
        card.addEventListener('click', function () {
            if (card.classList.contains('open')) {
                card.classList.remove('open');
                card.classList.add('card-hover');
            } else {
                elementCards.forEach(function (item) {
                    item.classList.remove('open');
                });
                card.classList.add('open');
                card.classList.remove('card-hover');
              }
          });
      });
    }
  });
}

const showBtn = document.getElementById("showAllBtn");

showBtn.addEventListener("click", fetchProducts);

const cardSection = document.getElementById("cardSection")
function hideAllProducts() {
  cardSection.replaceChildren = "";
}

const hideBtn = document.getElementById("hideAllBtn");

hideBtn.addEventListener("click", hideAllProducts);

//fetchProducts();
 
// userForm.addEventListener("submit", handleSubmit);

// function handleSubmit(e) {
//   e.preventDefault(e);
//   // Test
//   console.log(userForm.productName.value);
//   const serverObject = {
//     productName: "",
//     productCategory: "",
//     productPrice: "",
//     productQuantity: "",
//   };

//   serverObject.productName = userForm.productName.value;
//   serverObject.productCategory = userForm.productCategory.value;
//   serverObject.productPrice = userForm.productPrice.value;
//   serverObject.productQuantity = userForm.productQuantity.value;
//   // Test
//   console.log(serverObject); 
  
//   const request = new Request(serverURL, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(serverObject),
//   });

//   // fetch(request).then((response) => {
//   //   fetchProducts();
//   //   userForm.reset();
//   // });

//   fetch(request).then((response) => {
//     if (response.ok) {
//         showModal("Success!", "The product was added to the database!", function() {
//             fetchProducts();
//             userForm.reset();
//         });
//     } else {
//         showModal("Error", "An error has occured!");
//     }
//   });
// }


// Gör så att bara submitknappen syns på formuläret när man trycker "submit to database"
// och vice versa för updateknappen på carden.
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitBtn");
  const updateButton = document.getElementById("updateBtn");

  // Event Listener för "Submit to database"-knappen
  document.getElementById("submitModalButton").addEventListener("click", () => {
      submitButton.style.display = "block"; // Visa "Submit"-knappen
      updateButton.style.display = "none"; // Göm "Update"-knappen
  });

  // Delegated Event Listener för "Update"-knapparna på korten
  document.body.addEventListener("click", (event) => {
      if (event.target.classList.contains("updateBtn")) {
          submitButton.style.display = "none"; // Göm "Submit"-knappen
          updateButton.style.display = "block"; // Visa "Update"-knappen
      }
  });
});

userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  console.log("Form submitted!");
  e.preventDefault();

  const serverObject = {
    productName: userForm.productName.value,
    productCategory: userForm.productCategory.value,
    productPrice: userForm.productPrice.value,
    productQuantity: userForm.productQuantity.value,
  };

  fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serverObject),
  })
  .then(response => {
    if (response.ok) {
      return response.json(); // Om allt går bra, returnera JSON-svaret
    } else {
      throw new Error('Network response was not ok.'); // Kasta ett fel om responsen inte är OK
    }
  })
  .then(data => {
    // Visa en bekräftelsemodal om allt gick bra
    showModal("Success!", "The product was added to the database!", function() {
      fetchProducts();
      userForm.reset();
    });
  })
  .catch(error => {
    // Visa en felmodal om något gick fel
    console.error('There was a problem with the fetch operation:', error);
    showModal("Error", "An error has occurred!");
  });
}

// THOMAS EXPERIMENT KOD
// function handleSubmit(e) {
//   e.preventDefault(e);
//   // Test
//   console.log(userForm.productName.value);
//   const serverObject = {
//     productName: "",
//     productCategory: "",
//     productPrice: "",
//     productQuantity: "",
//   };

//   serverObject.productName = userForm.productName.value;
//   serverObject.productCategory = userForm.productCategory.value;
//   serverObject.productPrice = userForm.productPrice.value;
//   serverObject.productQuantity = userForm.productQuantity.value;
//   // Test
//   console.log(serverObject); 
  
//   const id = localStorage.getItem("currentProductID");
//   if (id) {
//     serverObject.productID = id;
//   }

//   const request = new Request(serverURL, {
//     method: serverObject.productID ? "PUT" : "POST",
//     headers: {
//       "content-type" : "application/json",
//     },
//     body: JSON.stringify(serverObject)
//   });

//   fetch(request).then((response) => {
//     fetchProducts();
//     localStorage.removeItem("currentProductID");
//     userForm.reset();
//   });
// }
// THOMAS EXPERIMENT KOD SLUT

//MIKAELAS KOD
// function setCurrentUser(id) {
//   console.log('current', id);

//   fetch(`${url}/${id}`)
//     .then((result) => result.json())
//     .then((user) => {
//       console.log(user);
//       userForm.firstName.value = user.firstName;
//       userForm.lastName.value = user.lastName;
//       userForm.color.value = user.color;
//       userForm.username.value = user.username;

//       localStorage.setItem('currentId', user.id);
//     });
// }

// userForm.addEventListener('submit', handleSubmit);

// function handleSubmit(e) {
//   e.preventDefault();
//   const serverUserObject = {
//     firstName: '',
//     lastName: '',
//     username: '',
//     color: ''
//   };
//   serverUserObject.firstName = userForm.firstName.value;
//   serverUserObject.lastName = userForm.lastName.value;
//   serverUserObject.username = userForm.username.value;
//   serverUserObject.color = userForm.color.value;

//   const id = localStorage.getItem('currentId');
//   if (id) {
//     serverUserObject.id = id;
//   }

//   const request = new Request(url, {
//     method: serverUserObject.id ? 'PUT' : 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify(serverUserObject)
//   }); 

//   fetch(request).then((response) => {
//     fetchData();

//     localStorage.removeItem('currentId');
//     userForm.reset();
//   });
// }
//MIKAELAS KOD SLUT

userForm.addEventListener("click", handleClear());

function handleClear() { 
  userForm.productName.value  = " ";
  userForm.productCategory.value  = " ";
  userForm.productPrice.value  = " ";
  userForm.productQuantity.value = " ";
}

function showModal(title, message, callback) {
  const modalMessage = document.querySelector("#messageModal .modal-body p");
  const modalTitle = document.querySelector("#messageModal .modal-title");
  const confirmButton = document.querySelector("#messageModal #confirmBtn");

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  // Visa modalfönstret
  var myModal = new bootstrap.Modal(document.getElementById('messageModal'));
  myModal.show();

  // Lägg till en lyssnare på confirmBtn
  confirmButton.addEventListener('click', function() {
      myModal.hide();
      if (callback) {
          callback();
      }
  });
} 

const deleteInfo = document.getElementById("staticBackdrop");
deleteInfo.addEventListener("show.bs.modal", (event) => {
  const deleteButton = document.getElementById("deleteButton");
  const productId = document.getElementById('productIdInput').value;
  
  deleteButton.addEventListener("click", () => handleDelete(productId));
});

function handleDelete(productID) {
  const confirmationModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
  confirmationModal.show();

  const deleteConfirmed = document.getElementById("deleteBtn");
  deleteConfirmed.addEventListener("click", () => {
    fetch(`${serverURL}/${productID}`, { method: 'DELETE' })
      .then((result) => {
        confirmationModal.hide();
        fetchProducts();  
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        confirmationModal.hide();
      });
  });

  // Handle modal hide event to refresh the page if the delete is not confirmed
  // deleteInfo.addEventListener("hide.bs.modal", () => {
  //   window.location.reload();
  // }); 
}
