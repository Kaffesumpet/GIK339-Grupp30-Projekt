const serverURL = "http://localhost:3000/products";

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
                <div class="card card-hover h-100" style="width:200px"> 
                    <div class="image-frame">
                        <img class="card-img-top" src="img/products/${product.productName}.webp" alt="Card image">
                    </div>    
                    <div class="card-body">
                    <h3 class="card-title">${product.productName}</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Price: ${product.productPrice}</li>
                            <li class="list-group-item">Quantity: ${product.productQuantity}</li>
                            <li class="list-group-item">Category: ${product.productCategory}</li>
                            <li class="list-group-item">Product id: ${product.productID}</li>
                        </ul>
                        <div> 
                            <button type="button" class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#submitModal" id="updateBtn-${product.productID}">Update</button>
                            <button type="button" class="btn btn-danger mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="deleteBtn-${product.productID}">Delete</button>
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

fetchProducts();
 
userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault(e);
  // Test
  console.log(userForm.productName.value);
  const serverObject = {
    productName: "",
    productCategory: "",
    productPrice: "",
    productQuantity: "",
  };

  serverObject.productName = userForm.productName.value;
  serverObject.productCategory = userForm.productCategory.value;
  serverObject.productPrice = userForm.productPrice.value;
  serverObject.productQuantity = userForm.productQuantity.value;
  // Test
  console.log(serverObject); 
  
  const request = new Request(serverURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverObject),
  });

  fetch(request).then((response) => {
    fetchProducts();
    userForm.reset();
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

const deleteButton = document.querySelector("#deleteBtn");
deleteButton.addEventListener("click", handleDelete());

console.log(deleteButton);

function handleDelete(productID) { 
  console.log(productID);
  fetch(`${serverURL}/${productID}`, {method: `DELETE`})
  .then((result) => fetchProducts());
  
  

}
