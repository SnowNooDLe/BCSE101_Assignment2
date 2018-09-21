class Team:
    def __init__(self, newRank, newName, newVenue, newCity):
        self.rank = newRank
        self.name = newName
        self.venue = newVenue
        self.city = newCity

    def __str__(self):
        result = f"{self.rank} {self.name}"
        return result
