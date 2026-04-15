// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()

// Import routes
const hobbiesRouter = require('./routes/hobbies')
const catsRouter = require('./routes/cats')

// Index route
app.get('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    console.log(method)
    console.log(url)

    res.status(200).json({ method, url, time: new Date() })
    return
})

// Other routes
app.use('/hobbies', hobbiesRouter)
app.use('/cats', catsRouter)

const port = process.env.PORT || "3000"

// Run the server
app.listen(port, () => {
    console.log(`App is listening on port 3000...`)
})