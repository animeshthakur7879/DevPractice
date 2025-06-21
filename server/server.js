const express = require("express")
require("dotenv").config()
const colors = require("colors")
const connectDb = require("./config/db_config")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")

const PORT = process.env.PORT || 5000

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded())

//Database Connection
connectDb()


//CORS enable
app.use(cors())

app.get("/" , (req , res) => {

    res.json({
        msg : "Final MachineTask API is live"
    })
})


//Auth Routes
app.use("/api/auth" , require("./routes/authRoutes") )

//Snippet Routes
app.use("/api/snippets" , require("./routes/snippetRoutes"))


//Error Handler
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server is running at port : ${PORT}`.bgBlue)
})