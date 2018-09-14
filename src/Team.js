class Team {
	constructor (newRank = 0, newName = 'unnamed', newVenue = 'place', newCity = 'city') {
		this.rank = newRank
		this.name = newName
		this.venue = newVenue
		this.city = newCity
	}

	toString () {
    let result = `${this.rank} ${this.name}`
    return result
	}
}
