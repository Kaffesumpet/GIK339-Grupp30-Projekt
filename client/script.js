const serverURL = "http://localhost:3000/products";

// Fetch funktion för att kunna visa allt i databasen i cards -format.
function fetchProducts() {
  fetch(serverURL, {method: "GET"}) 
  .then((result) => result.json())
  .then((products) => { 
    if (products.length > 0) {
      let html = `<div class="container-fluid center row g-4">`;
      products.forEach((product) => {
        html += ` 
            <div class = "col-auto"> 
                <div class="card card-hover" style="width:200px; height:450px"> 
                    <div class="image-frame">
                        <img class="card-img-top" src="img/products/${product.productName}.webp" alt="Card image">
                    </div>    
                    <div class="card-body">
                    <h3 class="card-title">${product.productName}</h3>
                        <ul class="list-group list-group-flush ">
                            <li class="list-group-item">Price: ${product.productPrice}</li>
                            <li class="list-group-item">Affiliation: ${product.productAffiliation}</li>
                            <li class="list-group-item">Faction: ${product.productCategory}</li>
                        </ul>
                        <div> 
                            <button type="button" class="updateBtn btn btn-warning mt-2" onclick="fetchSingleProduct(${product.productID})" data-bs-toggle="modal" data-bs-target="#submitModal" data-product-id="${product.productID}">Update</button>
                            <button type="button" class="btn btn-danger mt-2" onclick="handleDelete(${product.productID})" id="deleteBtn-${product.productID}">Delete</button>
                        </div>
                    </div> 
                </div>
            </div>`;
      })

      html += `</div>`; 

      const cardSection = document.getElementById("card-section");
      cardSection.innerHTML = html;
      
      // Gör så att bara "update"-knappen syns på formuläret när man trycker "Update" på cardsen,
      // såväl som hämtar ID't för varje produkt och lägger in i formuläret.
      document.querySelectorAll(".updateBtn").forEach(button => {
        button.addEventListener("click", (event) => {
          const productId = event.target.getAttribute("data-product-id");
          document.getElementById("inputProductID").value = productId;
          document.getElementById("submitModalLabel").textContent = "Update Product";
          document.getElementById("submitBtn").style.display = "none";
          document.getElementById("updateBtn").style.display = "block";
        })
      });

      // Kod för att korten ska förstoras när man hovrar och trycker på dem
      const elementCards = document.querySelectorAll(".card");
      elementCards.forEach(function (card) {
        card.addEventListener("click", function () {
            if (card.classList.contains("open")) {
                card.classList.remove("open");
                card.classList.add("card-hover");
            } else {
                elementCards.forEach(function (item) {
                    item.classList.remove("open");
                });
                card.classList.add("open");
                card.classList.remove("card-hover");
              }
          });
      });
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error); 
  })
}
// Visar alla produkter i databasen när sidan laddas
fetchProducts();

// Gör så att bara submitknappen syns på formuläret när man trycker "submit to database".
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitModalButton").addEventListener("click", () => {
    document.getElementById("submitModalLabel").textContent = "Submit New Product";
    document.getElementById("inputProductID").value = "";
    document.getElementById("submitBtn").style.display = "block";
    document.getElementById("updateBtn").style.display = "none";
  });
});

userForm.addEventListener("submit", handleSubmit);
document.querySelector("#clearBtn").addEventListener("click", handleClear);

// Funktion för att hämta en produkt (rad) ur databasen beroende på ID.
function fetchSingleProduct(productID) {
  fetch(`${serverURL}/${productID}`, {method: "GET"})
    .then((result) => result.json())
    .then((product) => { 
      userForm.productName.value = product.productName;
      userForm.productCategory.value = product.productCategory;
      userForm.productPrice.value = product.productPrice;
      userForm.productAffiliation.value = product.productAffiliation;
    }) 
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
  });
}

// Funktion för att skicka data till databasen, uppdatera eller lägga till helt ny.
function handleSubmit(e) {
  e.preventDefault();

  const productId = userForm.productID.value;
  let serverObject;

  if (productId) {
    // För "PUT" - Uppdatera produkt  
    serverObject = {
      productName: userForm.productName.value,
      productCategory: userForm.productCategory.value,
      productPrice: userForm.productPrice.value,
      productAffiliation: userForm.productAffiliation.value,
      productID: productId
    };
  } else {
    // För "POST" - Skapa ny produkt
    serverObject = {
      productName: userForm.productName.value,
      productCategory: userForm.productCategory.value,
      productPrice: userForm.productPrice.value,
      productAffiliation: userForm.productAffiliation.value
    };
  }

  const method = productId ? "PUT" : "POST";
  
  fetch(serverURL, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serverObject),
  })
  .then(result => {
    if (!result.ok) {
      throw new Error("Network response was not ok.");
    }
    return result.text();
  })  
  .then(resultText => {
    showModal("Success!", resultText, () => {
    fetchProducts();
    userForm.reset();
    userForm.productID.value = " "; // Rensa produkt-ID efter uppdatering/skapande
    });
  }) 
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
    showModal("Error", "An error has occurred!");
  });
} 

// Funktion för att hantera borttagning av produkter ur databasen.
function handleDelete(productID) {
  console.log("delete", productID);
  fetch(`${serverURL}/${productID}`, {method: "DELETE"})
    .then(result => {
      if (!result.ok) { 
        throw new Error("Network response was not ok.");
      }
      return result.text();
    })  
    .then(resultText => {
      showModal("Success!", resultText, () => {
      fetchProducts();
      });
    }) 
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
      showModal("Error", "An error has occurred!");
    });    
}

// Funktion för att rensa formuläret.
function handleClear() { 
  userForm.productName.selectedIndex = 0;
  userForm.productCategory.selectedIndex = 0;
  userForm.productPrice.value  = " ";
  userForm.productAffiliation.selectedIndex = 0;
} 

// Funktion för att visa bekräftelse modaler.
function showModal(title, message, callback) {
  const modalMessage = document.querySelector("#messageModal .modal-body p");
  const modalTitle = document.querySelector("#messageModal .modal-title");
  const confirmButton = document.querySelector("#messageModal #confirmBtn");

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  // Hämtar modalerna & visar bekräftelsemodalen
  const messageModal = new bootstrap.Modal(document.querySelector("#messageModal"));
  const submitModal = bootstrap.Modal.getInstance(document.querySelector("#submitModal"));
  messageModal.show();

  // Sätter eventlyssnare på knappen samt stänger båda modalerna & visar produkterna igen.
  confirmButton.addEventListener("click", function() {
    messageModal.hide();
    if (submitModal) {
      submitModal.hide();
    }
    fetchProducts();
    if (callback) {
      callback();
    }   
  });
}