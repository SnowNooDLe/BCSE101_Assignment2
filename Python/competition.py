import datetime

class Team:
    def __init__(self, newRank, newName, newVenue, newCity):
        self.rank = newRank
        self.name = newName
        self.venue = newVenue
        self.city = newCity

    def __str__(self):
        result = f"{self.rank} {self.name}"
        return result

class Game:
    def __init__(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        self.week = newWeek
        self.homeTeamRank = newHomeTeamRank
        self.awayTeamRank = newAwayTeamRank
        self.dateTime = newDateTime

    def __str__(self):
        result = f"@ Week :{self.week},{self.dateTime}, Team {self.homeTeamRank} vs {self.awayTeamRank}"
        return result


class Competition:
    def __init__(self, new_title, new_year):
        self.title = new_title
        self.year = new_year
        self.allPDTeams = []
        self.allCDTeams = []
        self.allTeams = []
        self.allGames = []

    def addTeam(self, newRank, newName, newVenue, newCity):
        newTeam = Team(newRank, newName, newVenue, newCity)
        self.allTeams.append(newTeam)
        if (newRank <= 7):
            self.allPDTeams.append(newTeam)
        else:
            self.allCDTeams.append(newTeam)
    def getTeams(self):
        result = f"TEAMS\n"
        result += f"Premiership Division\n"
        for team in self.allPDTeams:
            result += str(team) + "\n"
        result += f"Championship Division\n"
        for team in self.allCDTeams:
            result += str(team) + "\n"
        return result

    def addGame(self, newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime):
        newGame = Game(newWeek, newHomeTeamRank, newAwayTeamRank, newDateTime)
        self.allGames.append(newGame)

    def getGames(self):
        schedule = str(self.year) + ' ' + self.title + ' Draw\n'
        for aWeek in self.allGames:
            date_time_obj = datetime.datetime.strptime(aWeek.dateTime, '%Y-%m-%dT%H:%M:%S.%fZ')
            schedule += 'Week: ' + str(aWeek.week) + '\n'
            schedule += str(date_time_obj.date().strftime("%A %d")) + ' '
            schedule += str(date_time_obj.time().strftime("%H:%M%p")) + ' '
            schedule += 'Team: ' + self.allTeams[aWeek.homeTeamRank - 1].name
            schedule += ' vs ' + self.allTeams[aWeek.awayTeamRank - 1].name
            schedule += ' At: ' + self.allTeams[aWeek.homeTeamRank - 1].venue
            schedule += ', ' + self.allTeams[aWeek.homeTeamRank - 1].city + '\n'

        return schedule

    def getCanterburyGames(self, teamName):
        rank = 0
        specificTeamGames = 'Will only display ' + teamName + " team's games\n"
        for aTeam in self.allTeams:
            if (aTeam.name == teamName):
                rank = aTeam.rank
        for thatTeam in self.allGames:
            if (thatTeam.homeTeamRank == rank or thatTeam.awayTeamRank == rank):
                date_time_obj = datetime.datetime.strptime(thatTeam.dateTime, '%Y-%m-%dT%H:%M:%S.%fZ')
                specificTeamGames += 'Week: ' + str(thatTeam.week) + '\n'
                specificTeamGames += str(date_time_obj.date().strftime("%A %d")) + ', '
                specificTeamGames += str(date_time_obj.time().strftime("%H:%M%p")) + ', '
                specificTeamGames += 'Team: ' + self.allTeams[thatTeam.homeTeamRank - 1].name
                specificTeamGames += ' vs ' + self.allTeams[thatTeam.awayTeamRank - 1].name
                specificTeamGames += ' At: ' + self.allTeams[thatTeam.homeTeamRank - 1].venue
                specificTeamGames += ', ' + self.allTeams[thatTeam.homeTeamRank - 1].city + '\n'

        return specificTeamGames

    def getCrossOverGames(self):
        crossovergames = 'Will only display crossover games\n'

        for thatTeam in self.allGames:
            if ((thatTeam.homeTeamRank in self.allPDTeams.rank and thatTeam.awayTeamRank in self.allCDTeams.rank) or (thatTeam.homeTeamRank in self.allCDTeams.rank and thatTeam.awayTeamRank in self.allPDTeams.rank)):
                date_time_obj = datetime.datetime.strptime(thatTeam.dateTime, '%Y-%m-%dT%H:%M:%S.%fZ')
                crossovergames += 'Week: ' + str(thatTeam.week) + '\n'
                crossovergames += str(date_time_obj.date().strftime("%A %d")) + ', '
                crossovergames += str(date_time_obj.time().strftime("%H:%M%p")) + ', '
                crossovergames += 'Team: ' + self.allTeams[thatTeam.homeTeamRank - 1].name
                crossovergames += ' vs ' + self.allTeams[thatTeam.awayTeamRank - 1].name
                crossovergames += ' At: ' + self.allTeams[thatTeam.homeTeamRank - 1].venue
                crossovergames += ', ' + self.allTeams[thatTeam.homeTeamRank - 1].city + '\n'

        return crossovergames


    def getAll(self):
        result = ''
        result += '----------- Teams -----------\n'
        result += self.getTeams()
        result += '----------- Games -----------\n'
        result += self.getGames()
        result += '----------- Canterbury Games -----------\n'
        result += self.getCanterburyGames('Canterbury')
        result += '----------- Crossover Games -----------\n'
        result += self.getCrossOverGames()

        return result

    def __str__(self):
        return str(self.getAll())
