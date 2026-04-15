const router = require('express').Router()

router.get('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

router.post('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

router.put('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

router.delete('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

module.exports = router