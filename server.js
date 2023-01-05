/***************************** */
// DEPENDENCIES
/***************************** */
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

const { PORT = 3000, DATABASE_URL } = process.env // const PORT = process.env.PORT || 300

const app = express()

/***************************** */
// DATABASE CONNECTION
/***************************** */
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
    .on("open", () => console.log("Mongoose Connected"))
    .on("close", () => console.log("Mongoose Disconnected"))
    .on("error", (error) => console.log(error))

/***************************** */
// MODELS
/***************************** */
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

/***************************** */
// MIDDLEWARE
/***************************** */
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

/***************************** */
// ROUTES
/***************************** */
app.get("/", (req, res) => {
    res.send("hello world")
})

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
    try {
        // send all people
        res.json(await People.find({}))
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
    try {
        // send all people
        res.json(await People.create(req.body))
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// PEOPLE UPDATE ROUTE
app.put("/people/:id", async (req, res) => {
    try {
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    } catch (error) {
        res.status(400).json(error)
    }
})

// PEOPLE DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
    try {
        res.json(
            await People.findByIdAndRemove(req.params.id)
        )
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get("/people/:id", async (req, res) => {
    try {
        res.json(
            await People.findById(req.params.id)
        )
    } catch (error) {
        res.status(400).json(error)
    }
})

/***************************** */
// SERVER LISTENER
/***************************** */
app.listen(PORT, () => {
    console.log(`I wanna dance with somebody on PORT: ${PORT}`)
})