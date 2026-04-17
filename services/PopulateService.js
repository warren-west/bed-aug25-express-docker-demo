class PopulateService {
    constructor(db) {
        this.Cat = db.Cat
        this.Hobby = db.Hobby
    }

    async populateCats() {
        return this.Cat.bulkCreate([
            {
                petName: 'Mouse',
                dob: '2020-10-01',
                weight: 4.7,
            },
            {
                petName: 'Yoda',
                dob: '2020-09-29',
                weight: 4.9,
            },
            {
                petName: 'Sassy',
                dob: '2005-05-15',
                weight: 4.2,
            },
        ])
    }

    async populateHobbies() {
        return this.Hobby.bulkCreate([
            {
                description: 'Chase my tail',
                category: 'Play',
            },
            {
                description: 'Drink water',
                category: 'Feed',
            },
            {
                description: 'Eat a treat',
                category: 'Feed',
            },
            {
                description: 'Run outside',
                category: 'Play',
            },
            {
                description: 'Sleep on the bed',
                category: 'Relax',
            },
        ])
    }
}

module.exports = PopulateService