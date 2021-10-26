const express = require('express');
const mongoose = require('mongoose')

const app = express();

const authRoutes = require('./routes/authRoutes')

require('dotenv').config()

app.use(express.static("public"));
app.use(express.json())
app.set("view engine","ejs");

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(8000, () => {
        console.log("http://localhost:8000/")
    })
})

app.get("/", (req, res) => res.render("index"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/login",(req, res) => res.render("login"));

app.use(authRoutes)
