const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend")));


/* ================= HOME ================= */

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


/* ================= SIGNUP ================= */

app.post("/signup", (req, res) => {

    const { username, password } = req.body;

    db.query(

        "INSERT INTO users (username, password, role) VALUES (?, ?, 'user')",

        [username, password],

        (err) => {

            if(err){

                console.log(err);

                return res.json({
                    message: "Signup Failed"
                });
            }

            return res.json({
                message: "Signup Successful"
            });
        }
    );
});


/* ================= USER LOGIN ================= */

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.query(

        "SELECT * FROM users WHERE username=? AND password=?",

        [username, password],

        (err, result) => {

            if(err){

                console.log(err);

                return res.json({
                    message: "Login Failed"
                });
            }

            if(result.length > 0){

                return res.json({

                    message: "Login Successful",

                    role: result[0].role
                });
            }

            else{

                return res.json({
                    message: "Invalid Login"
                });
            }
        }
    );
});


/* ================= ADMIN LOGIN ================= */

app.post("/admin-login", (req, res) => {

    const { username, password } = req.body;

    db.query(

        "SELECT * FROM admins WHERE username=? AND password=?",

        [username, password],

        (err, result) => {

            if(err){

                console.log(err);

                return res.json({
                    message: "Admin Login Failed"
                });
            }

            if(result.length > 0){

                return res.json({
                    message: "Admin Login Successful"
                });
            }

            else{

                return res.json({
                    message: "Invalid Admin"
                });
            }
        }
    );
});


/* ================= GET PRODUCTS ================= */

app.get("/products", (req, res) => {

    db.query(

        "SELECT * FROM products ORDER BY id DESC",

        (err, result) => {

            if(err){

                console.log(err);

                return res.json([]);
            }

            res.json(result);
        }
    );
});


/* ================= ADD PRODUCT ================= */

app.post("/add-product", (req, res) => {

    const {

        product_name,
        product_price,
        product_image

    } = req.body;

    db.query(

        "INSERT INTO products (product_name, product_price, product_image) VALUES (?, ?, ?)",

        [product_name, product_price, product_image],

        (err) => {

            if(err){

                console.log(err);

                return res.json({
                    message: "Product Failed"
                });
            }

            return res.json({
                message: "Product Added Successfully"
            });
        }
    );
});


/* ================= DELETE PRODUCT ================= */

app.delete("/delete-product/:id", (req, res) => {

    const id = req.params.id;

    db.query(

        "DELETE FROM products WHERE id=?",

        [id],

        (err) => {

            if(err){

                console.log(err);

                return res.json({
                    message: "Delete Failed"
                });
            }

            return res.json({
                message: "Product Deleted"
            });
        }
    );
});


/* ================= PLACE ORDER ================= */

app.post("/order", (req, res) => {

    const {

        product_name,
        price,
        user_email

    } = req.body;

    db.query(

        "INSERT INTO orders (product_name, price, user_email) VALUES (?, ?, ?)",

        [product_name, price, user_email],

        (err) => {

            if(err){

                console.log(err);

                return res.json({
                    message: "Order Failed"
                });
            }

            return res.json({
                message: "Order Success"
            });
        }
    );
});


/* ================= TOTAL USERS ================= */

app.get("/total-users", (req, res) => {

    db.query(

        "SELECT COUNT(*) AS total FROM users",

        (err, result) => {

            if(err){

                console.log(err);

                return res.json({
                    total: 0
                });
            }

            res.json({
                total: result[0].total
            });
        }
    );
});


/* ================= TOTAL ORDERS ================= */

app.get("/total-orders", (req, res) => {

    db.query(

        "SELECT COUNT(*) AS total FROM orders",

        (err, result) => {

            if(err){

                console.log(err);

                return res.json({
                    total: 0
                });
            }

            res.json({
                total: result[0].total
            });
        }
    );
});


/* ================= SERVER ================= */

app.listen(3000, () => {

    console.log("Server running on http://localhost:3000");
});