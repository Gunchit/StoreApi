const mongoose = require("mongoose")
const { DB_NAME } = require("../constants")
const { Product } = require("../models/product.model")
const { products } = require("../data/products")

const connectDB = async () => {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGODB_URI}/${DB_NAME}`
  )

  await Product.deleteMany()
  await Product.insertMany(products)
  console.log(
    `Database Connected !! DB HOST : ${connectionInstance.connection.host}`
  )
}

module.exports = { connectDB }
