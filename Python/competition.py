import datetime
from Game import Game
from Team import Team

# Hence this is just python translated version of competition.js, not gonna leave comments.
class Competition:
    def __init__(self, new_title, new_year):
        self.title = new_title
        self.year = new_year
        self.allPDTeams = []
        self.allCDTeams = []
        self.allTeams = []
        self.allGames = []
        self.allPDRanks = []
        self.allCDRanks = []

    def addTeam(self, newRank, newName, newVenue, newCity):
        newTeam = Team(newRank, newName, newVenue, newCity)
        self.allTeams.append(newTeam)
        if (newRank <= 7):
            self.allPDTeams.append(newTeam)
            self.allPDRanks.append(newTeam.rank)
        else:
            self.allCDTeams.append(newTeam)
            self.allCDRanks.append(newTeam.rank)

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
            schedule += 'Week:' + str(aWeek.week) + '\n'
            schedule += str(date_time_obj.date().strftime("%a %d")) + ', '
            schedule += str(date_time_obj.time().strftime("%H:%MPM")) + ' '
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
                specificTeamGames += 'Week:' + str(thatTeam.week) + '\n'
                specificTeamGames += str(date_time_obj.date().strftime("%a %d")) + ', '
                # I could've used strftime("%H:%M%p") but this case will allocate as AM as time is 7 not 19 for 7PM.
                specificTeamGames += str(date_time_obj.time().strftime("%H:%MPM")) + ', '
                specificTeamGames += 'Team: ' + self.allTeams[thatTeam.homeTeamRank - 1].name
                specificTeamGames += ' vs ' + self.allTeams[thatTeam.awayTeamRank - 1].name
                specificTeamGames += ' At: ' + self.allTeams[thatTeam.homeTeamRank - 1].venue
                specificTeamGames += ', ' + self.allTeams[thatTeam.homeTeamRank - 1].city + '\n'

        return specificTeamGames

    def getCrossOverGames(self):
        crossovergames = "Will display crossover games\n"

        for eachGame in self.allGames:
            if ((eachGame.homeTeamRank in self.allPDRanks) and (eachGame.awayTeamRank in self.allCDRanks)) or ((eachGame.homeTeamRank in self.allCDRanks) and (eachGame.awayTeamRank in self.allPDRanks)):

                date_time_obj = datetime.datetime.strptime(eachGame.dateTime, '%Y-%m-%dT%I:%M:%S.%fZ')
                crossovergames += 'Week:' + str(eachGame.week) + '\n'
                crossovergames += str(date_time_obj.date().strftime("%a %d")) + ', '
                crossovergames += str(date_time_obj.time().strftime("%H:%MPM")) + ', '
                crossovergames += 'Team: rank:' + str(self.allTeams[eachGame.homeTeamRank - 1].rank) + ' ' + self.allTeams[eachGame.homeTeamRank - 1].name
                crossovergames += ' vs rank:' + str(self.allTeams[eachGame.awayTeamRank - 1].rank) + ' ' + self.allTeams[eachGame.awayTeamRank - 1].name
                crossovergames += ' At: ' + self.allTeams[eachGame.homeTeamRank - 1].venue
                crossovergames += ', ' + self.allTeams[eachGame.homeTeamRank - 1].city + '\n'

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
