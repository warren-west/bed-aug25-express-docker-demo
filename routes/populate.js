const router = require('express').Router()
const db = require('../models')
const PopulateService = require('../services/PopulateService')
const CatService = require('../services/CatService')
const HobbyService = require('../services/HobbyService')
const populateService = new PopulateService(db)
const catService = new CatService(db)
const hobbyService = new HobbyService(db)

/**
 * Populate the database with Cat and Hobby data.
 * Responses: 201 | 500
 */
router.post('/', async (req, res) => {
    try {
        const allCats = await catService.getAllCats()
        const allHobbies = await hobbyService.getAllHobbies()

        let catResult = undefined
        let hobbyResult = undefined

        if (!allCats || allCats.length === 0) {
            catResult = await populateService.populateCats()
            console.log('Populated Cat table ✅')
        }

        if (!allHobbies || allHobbies.length === 0) {
            hobbyResult = await populateService.populateHobbies()
            console.log('Populated Hobby table ✅')
        }

        let result = {}

        // append appropriate data to result
        result = !catResult ? { ...result, } : { ...result, catResult }
        result = !hobbyResult ? { ...result, } : { ...result, hobbyResult }

        res.status(201).json(result)
        return
    } catch (error) {
        console.log("Something went wrong...")
        res.status(500).json({ status: `error`, message: `${error.message}` })
        return
    }
})

module.exports = router