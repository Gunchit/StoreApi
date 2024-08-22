const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "16kb" }))
app.use(express.static(path.resolve(__dirname, "../public")))

app.get("/", (req, res) => {
  res.send("Home Page")
})

// Setting up Product Router
const productRouter = require("./routes/products.route")
app.use("/api/v1/products", productRouter)

module.exports = { app }
