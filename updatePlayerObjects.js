const playerObjects = {"15 home": {"number":"15","name":"Mark Ambelang","position":"TE/LB","grade":"11","playerStats": {"receptions":0,"touchdowns":0}},"55 home" :{"number":"55","name":"John Batovsky","position":"OL/DL","grade":"11", "playerStats": {"rushYards": 55}},"34 home":{"number":"34","name":"Ryan Bollinger","position":"RB/LB","grade":"10"}}


class addStats{

    constructor(playerStats, plusEvent) {
        this.player = playerStats
        this.plusEvent = plusEvent
        this.plusOneAddEvents()
    }

    plusOneAddEvents() {
        const stat = Object.keys(this.plusEvent)
        this.player[stat] += this.plusEvent[stat]
        console.log(this.player[stat])

    }
}

const newAdd = new addStats(playerObjects['15 home'].playerStats, {touchdowns: 3})
const addYards = new addStats(playerObjects['55 home'].playerStats, {rushYards: 55} )
const minusYards = new addStats(playerObjects['55 home'].playerStats, {rushYards: -75} )
const newAdd3 = new addStats(playerObjects['15 home'].playerStats, {touchdowns: -1})

