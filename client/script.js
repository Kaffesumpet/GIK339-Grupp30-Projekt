const serverURL = "http://localhost:3000/products";

const productTable = document.createElement("table");
productTable.setAttribute("id", "table");

async function getProducts() {
    const response = await fetch(serverURL);
    const products = response.json();
    console.log(products)
    if (response.status == 200) {
        console.log("The request was successful")
    } else {
        console.log(`Something went wrong! Status code: ${response.status}`)
    }   
}

function displayProducts(products) {

    const tableStructure = `
    <tr>
        <th>Id</th>
        <th>Product name</th>
        <th>Product category</th>
        <th>Product image</th>
        <th>Product price</th>
        <th>Product quantity</th>
    </tr>
    `

    for (let product of products) {
        tableStructure += `
        <tr>
            <td>${product.id}</td>
            <td>${product.productName}</td>
            <td>${product.productCategory}</td>
            <td>${product.productImage}</td>
            <td>${product.productPrice}</td>
            <td>${product.productQuantity}</td>
        </tr>
        `
    }

    


    
}

