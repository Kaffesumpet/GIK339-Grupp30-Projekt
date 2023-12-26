const serverURL = "http://localhost:3000/products";

const productTable = document.createElement("table");
productTable.setAttribute("id", "table");

document.body.appendChild(productTable);

async function getProducts() {
    const response = await fetch(serverURL);
    const products = await response.json();
    console.log(products)
    if (response.status == 200) {
        console.log("The request was successful")
    } else {
        console.log(`Something went wrong! Status code: ${response.status}`)
    }   
    displayProducts(products);

    // Funktion för att visa databasobjekt i cards istället för table
    presentProducts(products);
}

getProducts();

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
    
    products.forEach(product => {
        const blob = new Blob([product.productImage], { type: 'image/png' });
        const blobURL = URL.createObjectURL(blob);
        console.log(product.productImage)
        tableContent += 
        `<tr>
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

// Presentera objekt i cards med en ny funktion

const productContainer = document.createElement("div");
productContainer.setAttribute("class", "container p-3 my-3 bg-dark text-white");

function presentProducts(products) {

    products.forEach(product => {

    productContainer += 

    '<div class="card" style="width:300px">
                <img class="card-img-top" src="img/products/Heroes_III_Troglodyte_Icon.webp" alt="Card image">
                <div class="card-body">
                  <h4 class="card-title">${product.productName}</h4>
                  <p class="card-text">Product name: ${product.productName} </p>
                  <p class="card-text">Product category: ${product.productCategory} </p>
                  <p class="card-text">Product Image: ${product.productImage} </p>
                  <p class="card-text">Product price: ${product.productPrice} </p>
                  <p class="card-text">Product quantity ${product.productQuantity}: </p>
                  <button type="submit" class="btn btn-success mt-2">Update</button>
                  <button type="submit" class="btn btn-success mt-2">Delete</button>
                </div>
              </div>';

              });

              document.getElementsByClassName("container p-3 my-3 bg-dark text-white")
              
}

// Mona har testat att försöka få ut bilden på detta sätt
/*
const base64Image = btoa(String.fromCharCode.apply(null, new Uint8Array(product.productImage)));
        const imageSrc = `data:image/gif;base64,${base64Image}`;
        console.log(imageSrc);

        */

// Funktion för att hantera submits till servern

function hadleSubmit(e) {
    e.preventDEfault(e);
const serverSubmitObject = {
    productName: '',
    productCategory: '',
    productImage: '',
    productPrice: '',
    productQuantity: ''
};

// Ett formulär måste skapas för att detta ska fungera :)
serverSubmitObject.productName = userForm.firstName.value;
serverSubmitObject.productCategory = userForm.productCategory.value;
serverSubmitObject.productImage = userForm.productImage.value;
serverSubmitObject.productPrice = userForm.productPrice.value;
serverSubmitObject.productQuantity = userForm.productQuantity.value;

console.log(serverSubmitObject);

const request = new Request(url, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(serverSubmitObject)
});

fetch(request).then((response) => {
    getProducts()
    userForm.reset()
});

}

