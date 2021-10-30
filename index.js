const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const { checkAdmin } = require('./middlewares/authMiddleware')
const app = express()

const authRoutes = require('./routes/authRoutes')

require('dotenv').config()

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())
app.set("view engine","ejs")

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("http://localhost:8000/")
    })
})

app.get("/", (req, res) => res.render("index"))
app.get("/signup", (req, res) => res.render("signup"))
app.get("/login",(req, res) => res.render("login"))
app.get("/courseRegisterform", (req, res) => res.render("courseRegisterform"))
app.get("/adminLogin",(req, res) => res.render("adminLogin"))
app.get("/adminDashboard", checkAdmin, (req, res) => res.render("adminDashboard"))

app.use(authRoutes)
