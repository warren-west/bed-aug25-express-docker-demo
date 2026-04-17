// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')

// Import routes
const hobbiesRouter = require('./routes/hobbies')
const catsRouter = require('./routes/cats')
const populateRouter = require('./routes/populate')

// Sync database
const connectWithRetry = async () => {
    console.log('Attempting to connect to the database...')
    try {
        await db.sequelize.authenticate() // authenticate() is lighter than sync() for checking connections
        await db.sequelize.sync()
        console.log('Database connected successfully ✅')

    } catch (error) {
        console.error('Database connection failed. Retrying in 5 seconds... ❌')
        console.log(error.message)
        setTimeout(connectWithRetry, 5000)
    }
}
connectWithRetry()

// Index route
app.get('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    console.log(method)
    console.log(url)

    res.status(200).json({ method, url, time: new Date() })
    return
})

// middleware
app.use(express.json())

// Other routes
app.use('/hobbies', hobbiesRouter)
app.use('/cats', catsRouter)
app.use('/populate', populateRouter)

const port = process.env.PORT || "3000"

// Run the server
app.listen(port, () => {
    console.log(`App is listening on port 3000...`)
})