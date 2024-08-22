const express = require("express")
const Router = express.Router()
const {
  getAllProductsStatic,
  getAllProducts,
} = require("../controllers/product.controller")

// Testing the Api Route
Router.route("/getProducts/static").get(getAllProductsStatic)

// Main Route
Router.route("/getProducts").get(getAllProducts)

module.exports = Router
