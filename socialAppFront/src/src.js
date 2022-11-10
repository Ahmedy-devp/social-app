const express = require("express")
const path = require("path")
const cors = require("cors")
const app= express()

require('dotenv').config()
require("../db/connect")

app.use(cors())
app.use(express.static(path.join(__dirname, "../static")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const adminRoutes = require("../routes/admin.routes")
const userRoutes = require("../routes/user.routes")
const articleRoutes = require("../routes/article.routes")

app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
app.use("/api/article", articleRoutes)
module.exports = app