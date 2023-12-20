
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
    console.log("Server is running on port 3000!");
})

// Skapa sökväg för databas

// Skapa routes 









