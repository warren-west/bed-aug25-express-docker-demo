class HobbyService {
    constructor(db) {
        this.Hobby = db.Hobby
    }

    async getAllHobbies() {
        return this.Hobby.findAll()
    }

    async getHobbyById(id) {
        return this.Hobby.findByPk(id)
    }
}

module.exports = HobbyService