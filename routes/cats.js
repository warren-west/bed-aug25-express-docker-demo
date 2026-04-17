const router = require('express').Router()
const CatService = require('../services/CatService')
const db = require('../models')
const catService = new CatService(db)

// GET /cats
router.get('/', async (req, res) => {
    let method = req.method
    let url = req.originalUrl

    try {
        const result = await catService.getAllCats()

        if (!result || result.length === 0) {
            res.status(404).json({ status: 'fail', message: 'No cat data.' })
            return
        }

        res.json({ status: 'success', data: result, method, url, time: new Date() })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: `${error.message}` })
        return
    }
})

// GET /cats/:id
router.get('/:id', async (req, res) => {
    let method = req.method
    let url = req.originalUrl
    const { id } = req.params

    if (!id || isNaN(id)) {
        res.status(400).json({ status: 'fail', message: 'Invalid id.' })
        return
    }

    try {
        const result = await catService.getCatById(id)

        if (!result || result.length === 0) {
            res.status(404).json({ status: 'fail', message: `Cat with the id ${id} not found.` })
            return
        }

        res.json({ status: 'success', data: result, method, url, time: new Date() })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: `${error.message}` })
    }
})

// POST /cats
router.post('/', async (req, res) => {
    let method = req.method
    let url = req.originalUrl

    const { petName, dob, weight } = req.body

    if (!petName || !dob || !weight) {
        res.status(400).json({ status: 'fail', message: 'Missing info for new cat.' })
        return
    }

    try {
        const result = await catService.addCat(petName, dob, weight)

        res.status(201).json({ status: 'success', data: result, method, url, time: new Date() })
        return

    } catch (error) {
        res.status(500).json({ status: "error", message: `${error.message}` })
        return
    }
})

// PUT /cat/:id
router.put('/:id', async (req, res) => {
    let method = req.method
    let url = req.originalUrl
    const { id } = req.params
    const { petName, dob, weight } = req.body

    if (!id || isNaN(id) || !petName || !dob || !weight) {
        res.status(400).json({ status: 'fail', message: 'Invalid inputs for updated cat.' })
        return
    }

    try {
        const result = await catService.UpdateCat(petName, dob, weight)

        if (result === 0) {
            res.status(404).json({ status: 'fail', message: `Cat with the id ${id} not found.` })
            return
        }

        res.status(204).json({ status: 'success', method, url, time: new Date() })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: `${error.message}` })
        return
    }
})


// DELETE /cats/:id
router.delete('/', async (req, res) => {
    let method = req.method
    let url = req.originalUrl

    const { id } = req.params

    if (!id || isNaN(id)) {
        res.status(400).json({ status: 'fail', message: 'Invalid id for deleting cat.' })
        return
    }

    try {
        const result = await catService.deleteCat(id)

        if (!result || result === 0) {
            res.status(404).json({ status: 'fail', message: `Cat with the id ${id} not found.` })
            return
        }

        res.status(204).json({ status: 'success', method, url, time: new Date() })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: `${error.message}` })
        return
    }
})

module.exports = router