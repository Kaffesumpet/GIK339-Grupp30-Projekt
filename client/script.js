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

// Mona har testat att försöka få ut bilden på detta sätt
/*
const base64Image = btoa(String.fromCharCode.apply(null, new Uint8Array(product.productImage)));
        const imageSrc = `data:image/gif;base64,${base64Image}`;
        console.log(imageSrc);

        */