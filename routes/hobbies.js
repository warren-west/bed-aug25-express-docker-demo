const router = require('express').Router()
const db = require('../models')
const HobbyService = require('../services/HobbyService')
const hobbyService = new HobbyService(db)

// GET /hobbies
router.get('/', async (req, res) => {
    let method = req.method
    let url = req.originalUrl
    
    try {
        const results = await hobbyService.getAllHobbies()
        
        if (!results || results.length === 0) {
            res.status(404).json({ status: 'fail', message: 'No hobbies found.' })
            return
        }
        
        res.json({ status: 'success', data: results, method, url, time: new Date() })
        return
        
    } catch (error) {
        res.status(500).json({ status: 'error', message: `${error.message}` })
        return
    }
})

// GET /hobbies/:id
router.get('/:id', async (req, res) => {
    let method = req.method
    let url = req.originalUrl
    
    const { id } = req.params

    if (!id || isNaN(id)) {
        res.status(400).json({ status: 'fail', message: `Invalid id input.` })
        return
    }

    try {
        const result = await hobbyService.getHobbyById(id)

        if (!result || result.length === 0) {
            res.status(404).json({ status: 'fail', message: `Hobby with the id ${id} not found.` })
            return
        }

        res.json({ status: 'success', data: result, method, url, time: new Date() })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: `${error.message}` })
        return
    }
})

// TODO
router.post('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

// TODO
router.put('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

// TODO
router.delete('/', (req, res) => {
    let method = req.method
    let url = req.originalUrl

    res.status(200).json({ method, url, time: new Date() })
    return
})

module.exports = router