const playerObjects = [{"jerseyNumber":"15","name":"Mark Ambelang","position":"TE/LB","grade":"11","team":"home","playerId":"15home","rushTouchdowns":0,"rushAttempts":0,"rushYards":0,"tackles":0,"interceptions":0,"passDefended":0,"receptions":0,"recYards":0,"drops":0,"recTouchdowns":0},{"jerseyNumber":"55","name":"John Batovsky","position":"OL/DL","grade":"11","team":"home","playerId":"55home","pancake":0,"sack":0,"tackle":0,"tackleForLoss":0},{"jerseyNumber":"34","name":"Ryan Bollinger","position":"RB/LB","grade":"10","team":"home","playerId":"34home","rushTouchdowns":0,"rushAttempts":0,"rushYards":0,"tackles":0,"interceptions":0,"passDefended":0,"receptions":0,"recYards":0,"drops":0,"recTouchdowns":0},{"jerseyNumber":"61","name":"Dominic Brandt","position":"OL/LB","grade":"11","team":"home","playerId":"61home","pancake":0,"sack":0,"tackle":0,"tackleForLoss":0}]

const dirtyPlayers = []
class addStats{

    constructor(playerStats, plusEvent) {
        this.player = playerStats
        this.plusEvent = plusEvent
        this.plusOneAddEvents()
    }

    plusOneAddEvents() {
        const stat = Object.keys(this.plusEvent)
        this.player[stat] += this.plusEvent[stat]
        console.log(this.player)
        dirtyPlayers.push(this.player)
        console.log(dirtyPlayers)

    }
}

const findPlayer = (playerEventId, statData) => {
    allPlayerObjects.forEach(player => {
        if (player.playerId == playerEventId) {
            const newAdd = new addStats(player, statData)
        }
        
    });
}

findPlayer('34home', {rushTouchdowns: 5})
// const newAdd = new addStats(playerId, {rushTouchdowns: 3})
// const addYards = new addStats(playerObjects['55 home'].playerStats, {rushYards: 55} )
// const minusYards = new addStats(playerObjects['55 home'].playerStats, {rushYards: -75} )
// const newAdd3 = new addStats(playerObjects['15 home'].playerStats, {touchdowns: -1})

