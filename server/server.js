// Gör det möjligt att använda express 
const express = require("express");
const server = express();

// Skapa en instans av databasobjektet
const sqlite3 = require("sqlite3").verbose(); 

// CORS
server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((
    req,
    res,
    next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Starta servern
server.listen(3000, () => { 
    console.log(`Server is running on http://localhost:3000`);
})

// Skapa sökväg för databas
const db = new sqlite3.Database("./gik339-projekt.db") 

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
// db.close();
})

// Route för att hämta en produkt / rad ur databasen beroende på ID.
server.get("/products/:id", (req, res) => {
    const productID = req.params.id;
    const sql = `SELECT productName, 
                        productCategory, 
                        productPrice, 
                        productQuantity, 
                        productImage
                 FROM products        
                 WHERE Id = ?`;

    db.all(sql, [productID], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows)
        }
    });
// db.close();    
})

// Post route, lägger till en ny produkt (rad) i databasen. 
server.post("/products", (req, res) => {
    const product = req.body;
    console.log(product);
    const sql = `INSERT INTO products(
                             productName, 
                             productCategory,  
                             productPrice, 
                             productQuantity)
                 VALUES
                    (?,?,?,?)`;
    
     db.run(sql, Object.values(product), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send("The product has been saved in the database.") 
        }
        });
// db.close();  
})

// Put route, uppdaterar en produkt (rad) i databasen beroende på ID't.
server.put("/products/:id", (req, res) => {
    const productID = req.params.id;
    const updatedProduct = req.body;
    const sql = `UPDATE products 
                 SET productName = ?, 
                     productCategory = ?, 
                     productImage = ?, 
                     productPrice = ?, 
                     productQuantity = ? 
                 WHERE Id = ?`;
        
        db.run(sql, [...Object.values(updatedProduct), productID], (err, rows) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);  
            } else {
                res.send(`Produkt: ${productID}, has been successfully updated in the database.`);
            }
        });   
// db.close();  
})

// UPDATE route

server.put("/products", (req,res) => {

    const bodyData = req.body;

    const id = bodyData.productID;

    const product = {

        productName: bodyData.productName,
        productCategory: bodyData.productCategory,
        productPrice: bodyData.productPrice,
        productQuantity: bodyData.productQuantity
    };

    let updateString = " ";

    const productsArray = Object.keys(product);
    columnsArray.forEach((column, i) => {
        updateString += `${column} = "${product[column]}"`;
        if (i !== columnsArray.lenght - 1) updateString += ",";

    });
    res.send(updateString);
    const sql = `UPDATE products SET  ${updateString} WHERE id = ${id}`

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);  
        } else {
            res.send("The product has been updated");
        }
    });
})

// Delete route, tar bort en produkt (rad) i databasen, beroende på ID't.
server.delete("/products/:id", (req,res) => {
    const productID = req.params.id;
    const sql = `DELETE FROM products WHERE Id = ?`;

    db.run(sql, [productID], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log(`${rows} has succesfully been deleted from the database!`);
        } 
    });         
// db.close();
});

