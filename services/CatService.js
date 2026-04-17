class CatService {
    constructor(db) {
        this.Cat = db.Cat
    }

    async getAllCats() {
        return this.Cat.findAll()
    }

    async getCatById(id) {
        return this.Cat.findByPk(id)
    }

    async addCat(petName, dob, weight) {
        return this.Cat.create({ petName, dob, weight })
    }

    async deleteCat(id) {
        return this.Cat.destroy({ where: { id } })
    }

    async UpdateCat(id, petName, dob, weight) {
        return this.Cat.update({ petName, dob, weight }, { where: { id } })
    }
}

module.exports = CatService