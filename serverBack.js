require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// connect to database
const db = new sqlite3.Database('./Database/shopBatmintan.sqlite');
app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS products(
    product_id INTEGER PRIMARY KEY,
    product_code TEXT , product_name TEXT,
    category_id INTEGER , unit INTEGER , price INTEGER 
)`)


app.get("/products", (req, res) => {
    db.all('SELECT * FROM products', (err, row) => {
        if (err) res.status(500).send(err);
        else res.json(row)
    });
});

app.get("/products/:id", (req, res) => {
    const products = req.params
    db.get('SELECT * FROM products WHERE product_id = ?', products.id, (err, row) => {
        if (err) res.status(500).send(err);
        else {
            if (!row) res.status(404).send("products not found!!");
            else res.json(row)
        }
    });
});

app.post("/products", (req, res) => {
    const products = req.body
    db.run('INSERT INTO products (product_code ,category_id,product_name ,unit ,price) VALUES (?,?,?,?,?)',
     products.product_code ,products.category_id, products.product_name , products.unit, products.price, 
     function(err) {
        if (err) res.status(500).send(err);
        else {
            req.body.products_id = this.lastID;
            res.send(products);
        }
    });
});

app.put("/products/:id", (req, res) => {
    const products = req.body;
    db.run('UPDATE products SET product_code = ? ,category_id = ?,product_name = ?,unit = ? ,price = ? WHERE product_id = ? ' ,
    products.product_code,products.category_id,products.product_name, products.unit ,products.price, req.params.id, 
    function(err) {
        if (err) res.status(500).send(err);
        else res.send(products);
    });
});

app.delete("/products/:id", (req, res) => {
    db.run('DELETE FROM products WHERE product_id = ?', req.params.id, function(err) {
        if(err) { 
            res.status(500).send(err);
        }
        else {
            res.send("Delete Pass ");
        }
    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});