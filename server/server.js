// Gör det möjligt att använda express 
const express = require("express");
const server = express();

// Importera sqlite3 + skapa en instans av databasobjektet
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./gik339-projekt.db")  

// CORS
server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "*");
        next();
});

// Starta servern
server.listen(3000, () => { 
    console.log(`Server is running on http://localhost:3000`);
})

// Skapa routes 

// Route för att hämta alla produkter / rader ur databasen.
server.get("/products", (req, res) => {
    // SQL fråga
    const sql = `SELECT * FROM products`;

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows)
        }
    });
})

// Route för att hämta en produkt / rad ur databasen beroende på ID.
server.get("/products/:id", (req, res) => {
    const productID = req.params.id; 
    const sql = "SELECT * FROM products WHERE productID =? ";

    db.get(sql, [productID], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).send("Product not found");
        }
    });
});

// Post route, lägger till en ny produkt (rad) i databasen. 
server.post("/products", (req, res) => {
    const product = req.body;
    console.log(product);
    const sql = `INSERT INTO products(
                             productName, 
                             productCategory,  
                             productPrice, 
                             productAffiliation)
                 VALUES
                    (?,?,?,?)`;
    
     db.run(sql, Object.values(product), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send("The product has been successfully saved in the database!") 
        }
    });
})

// Ny Put route som använder placeholders för att undvika SQL injektioner, 
// uppdaterar en produkt (rad) i databasen beroende på ID't.
server.put("/products", (req,res) => {
    const bodyData = req.body;
    const id = bodyData.productID; 
    const product = {
        productName: bodyData.productName,
        productCategory: bodyData.productCategory,
        productPrice: bodyData.productPrice,
        productQuantity: bodyData.productAffiliation
    }; 

    let updateString = ""; 

    const productsArray = Object.keys(product);
    productsArray.forEach((column, i) => {
        updateString += `${column} = ?`;
        if (i !== productsArray.length - 1) updateString += ",";
    });

    const sql = `UPDATE products SET ${updateString} WHERE productID = ?`;
    const values = [...Object.values(product), id];

    db.run(sql, values, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);  
        } else { 
            res.send("The product has been successfully updated!");
        } 
    });  
});

server.delete("/products/:id", (req, res) => {
    const productID = req.params.id;
    console.log("Received productID:", productID);
    const sql = `DELETE FROM products WHERE productID = ?`;

    db.run(sql, [productID], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(`The product with id: ${productID} has successfully been deleted from the database!`);
        } 
    });         
});