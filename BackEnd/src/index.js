require("dotenv").config()

const { connectDB } = require("./db/index")
const { app } = require("./app")

const portNo = process.env.PORT || 3000
connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Error Running the Server")
    })
    app.listen(portNo, () => {
      console.log(`Server Listening on PORT ${portNo}`)
    })
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed" , err)
    process.exit(1)
  })
