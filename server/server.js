
// Gör det möjligt att använda express 
const express = require("express");

const server = express();

// Skaoa databasobjekt
const sqlite3 = require("sqlite3").verbose(); 

// Course
server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((
    req,
    res,
    next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// Starta servern
server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})

// Skapa sökväg för databas

const db = new sqlite3.Database("./gik339-projekt.db") 

// Skapa routes 

// Route för att hämta alla rader ur tabellen
server.get("/products", (req, res) => {

    // SQL fråga
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows)

        }
    });
//db.close();
})

// Update/Post route 

// Route för att hämta en rad ur tabellen beroende av Id, i detta fall id 1 men ska ändras

server.get("/products", (req, res) => {
    // SQL fråga

db.all("SELECT productName, productCategory, productPrice, productQuantity, productImage WHERE Id = 1", (err, rows) => {
    if (err) {
        res.status(500).send(err);
    } else {
        res.send(rows)
    }
});
})

// Post route 

server.post('/products', (req, res) => {
    const product = req.body;

    const sql = `INSERT INTO products(productName, productCategory, productImage, productPrice, productQuantity)VALUES
    (?,?,?,?,?)`;

    db.run(sql, Object.values(product), (err) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
           res.send("The product is saved in the database") 
        }

    })

})




// Delete route

// Ska ändras så man kan hämta id från användare

server.delete("/products", (req,res) => {
    db.all("DELETE FROM products where Id = 2", (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(`${rows} have been deleted from the database!`);
        }
    });
})

