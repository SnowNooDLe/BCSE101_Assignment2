class Game:
    def __init__(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        self.week = newWeek
        self.homeTeamRank = newHomeTeamRank
        self.awayTeamRank = newAwayTeamRank
        self.dateTime = newDateTime

    def __str__(self):
        result = f"@ Week :{self.week},{self.dateTime}, Team {self.homeTeamRank} vs {self.awayTeamRank}"
        return result
