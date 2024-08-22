const { asyncHandler } = require("../utils/AsyncHandler")
const { ApiError } = require("../utils/ApiError")
const { ApiResponse } = require("../utils/ApiResponse")
const { Product } = require("../models/product.model")

const getAllProductsStatic = asyncHandler(async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price")
    .skip(5)
    .limit(4)
  if (!products)
    throw new ApiError(400, "Something Went Wrong While Retrieving Products")
  res.status(201).json(new ApiResponse(200, products, "Success"))
})

const getAllProducts = asyncHandler(async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query

  const queryObject = {}

  if (featured) queryObject.featured = featured === "true" ? true : false
  if (company) queryObject.company = company
  if (name) queryObject.name = { $regex: name, $options: "i" }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g

    const filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )

    const options = ["price", "rating"]
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-")
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number([value]) }
      }
    })
  }

  let result = Product.find(queryObject)
  if (!result)
    throw new ApiError(
      500,
      "Something Went Wrong While Retrieving the Products"
    )

  if (sort) {
    const sortedList = sort.split(",").join(" ")
    result.sort(sortedList)
  } else {
    result.sort("createdAt")
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ")
    result.select(fieldsList)
  } else {
    result.select("-__v -createdAt -updatedAt")
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result.skip(skip).limit(limit)
  const products = await result
  if (!products)
    throw new ApiError(500, "Something Went Wrong While Retrieving Products")

  res.status(201).json(new ApiResponse(200, products, "Success"))
})

module.exports = { getAllProductsStatic, getAllProducts }
