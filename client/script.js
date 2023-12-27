const serverURL = "http://localhost:3000/products";

const productTable = document.createElement("table");
productTable.setAttribute("id", "table");

document.body.appendChild(productTable);

async function getProducts() {
  const response = await fetch(serverURL);
  const products = await response.json();
  console.log(products);
  if (response.status == 200) {
    console.log("The request was successful");
  } else {
    console.log(`Something went wrong! Status code: ${response.status}`);
  }
  displayProducts(products);
}

async function getProductImage() {
  const response = await fetch(`${serverURL}/${productId}`);
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}

// displayProducts();

function displayProducts(products) {
  let tableContent = `
        <tr>
            <th>Id</th>
            <th>Product name</th>
            <th>Product category</th>
            <th>Product image</th>
            <th>Product price</th>
            <th>Product quantity</th>
        </tr>
        `;

  products.forEach((product) => {
    const blob = new Blob([product.productImage], { type: "image/png" });
    const blobURL = URL.createObjectURL(blob);
    console.log(product.productImage);
    tableContent += `<tr>
            <td>${product.id}</td> 
            <td>${product.productName}</td>
            <td>${product.productCategory}</td>
            <td><img src="${blobURL}" alt="${product.productName}" style="width:100px;"></td>
            <td>${product.productPrice}</td>
            <td>${product.productQuantity}</td>
        </tr>
        `;
  });

  document.getElementById("table").innerHTML = tableContent;
}

//<p class="card-text">Product Image: ${product.productImage} </p>

// NY fetch funktion för att kunna visa allt i databasen i cards

function fetchProducts() {
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
                            <button type="button" onclick= "handleUpdate" class="btn btn-warning mt-2" id="updateBtn-${product.productID}">Update</button>
                            <button type="button" onclick = "handleDelete" class="btn btn-danger mt-2" id="deleteBtn-${product.productID}">Delete</button>
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

      products.forEach((product) => {
        const updateButton = document.getElementById(`updateBtn-${product.productID}`);
        updateButton.addEventListener("click", () => {
            updateModal(product);
            });
    
        const deleteButton = document.getElementById(`deleteBtn-${product.productID}`);
        deleteButton.addEventListener("click", () => {
            handleDelete(product.productID);
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

function updateModal(product) {
    document.getElementById('updatedProductName').value = product.productName;
    document.getElementById('updatedProductCategory').value = product.productCategory;
    document.getElementById('updatedProductPrice').value = product.productPrice;
    document.getElementById('updatedProductQuantity').value = product.productQuantity;

    const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();
}

function handleUpdate(productId) {
    const updatedProduct = {
        productName: document.getElementById('updatedProductName').value,
        productCategory: document.getElementById('updatedProductCategory').value,
        productPrice: document.getElementById('updatedProductPrice').value,
        productQuantity: document.getElementById('updatedProductQuantity').value,
        productID: productId
    };

    const request = new Request(serverURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct)
    });

    fetch(request).then((response) => {
        fetchProducts();
        userForm.reset();
      });
}

function handleDelete(e, productID) {
    
}

const tc = window.innerHeight / 2 - $('.item').height() / 2 - $(this.closest('.item')).offset().top;
const lc = window.innerWidth / 2 - $('.item').width() / 2 - $(this.closest('.item')).offset().left;

document.documentElement.style.setProperty('--top-calc', `${tc}px`);
document.documentElement.style.setProperty('--left-calc', `${lc}px`);
