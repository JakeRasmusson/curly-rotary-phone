
const allPlayerObjects = []
class Player{
    constructor(jerseyNumber, name, position, grade, team){
        this.jerseyNumber   = jerseyNumber
        this.name           = name
        this.position       = position
        this.grade          = grade
        this.team           = team
        this.playerId       = jerseyNumber + team
    }
}

class SkillPosition extends Player{
    // receptions      = 0
    // touchdowns      = 0
    // recYards        = 0
    // rushYards       = 0
    // tackles         = 0
    // interceptions   = 0
    // passDefended    = 0

    constructor(jerseyNumber, name, position, grade, team, rushTouchdowns, rushYards, tackles, interceptions, passDefended, rushAttempts){
        super(jerseyNumber, name, position, grade, team)
        this.rushTouchdowns     = rushTouchdowns    || 0
        this.rushAttempts       = rushAttempts      || 0
        this.rushYards          = rushYards         || 0
        this.tackles            = tackles           || 0
        this.interceptions      = interceptions     || 0
        this.passDefended       = passDefended      || 0
    }

}
class QBPosition extends SkillPosition{
    constructor(jerseyNumber, name, position, grade, team, rushTouchdowns, rushYards, interceptions, passAtt, passComp, passYards, passTouchdowns, tackles, passDefended, rushAttempts){
        super(jerseyNumber, name, position, grade, team, rushYards, interceptions, rushAttempts, rushTouchdowns, passDefended, tackles)
        this.passAtt            = passAtt            || 0
        this.passComp           = passComp           || 0
        this.passYards          = passYards          || 0
        this.passTouchdowns     = passTouchdowns     || 0
    }
}

class NonQbSkillPosition extends SkillPosition{
    constructor(jerseyNumber, name, position, grade, team, rushTouchdowns, rushYards, tackles, interceptions, passDefended, rushAttempts, receptions, recYards, drops, recTouchdowns){
        super(jerseyNumber, name, position, grade, team, rushYards, interceptions, rushTouchdowns, rushAttempts, rushTouchdowns, passDefended, tackles)
        this.receptions         = receptions        || 0
        this.recYards           = recYards          || 0
        this.drops              = drops             || 0
        this.recTouchdowns      = recTouchdowns     || 0
    }
}

class NonSkillPosition extends Player{
    // pancake         = 0
    // sack            = 0
    // tackle          = 0
    // tackleForLoss   = 0

    constructor(jerseyNumber, name, position, grade, team, pancake, sack, tackle, tackleForLoss){
        super(jerseyNumber,name,position,grade, team)
        this.pancake            = pancake           || 0
        this.sack               = sack              || 0
        this.tackle             = tackle            || 0
        this.tackleForLoss      = tackleForLoss     || 0
    }
}







const parseData = (data, team) => {
    const rowSplit = data.split('\n')
    const columnSplit = []
    const players = []
    rowSplit.forEach(row => {
        let noQuote = row.replaceAll('"', '')
        columnSplit.push(noQuote.split(','))
    });
    columnSplit.forEach(column => {
         let playerNumber = parseInt(column[0])
        if (!isNaN(playerNumber)) {
            players.push(column)
        } 
    } )
    console.log(players)
    prepareForObject(players, team)
}

const prepareForObject = (players, team) => {
    const slicedPlayers = players.map(player => player.slice(0,4))
    createObjects(slicedPlayers, team)
}

const createObjects = (objectReady, team) => {
    const playerObjects = []
    let constructedPlayer = ''
    objectReady.forEach(player => {
        const [ number, name, position, grade] = player
        let playerId = number + team
        console.log(playerId)
        let offPosition = position.slice(0,2)
        switch (offPosition) {
            case "OL":
                player = new NonSkillPosition(number, name, position, grade, team)
                playerObjects.push(player)
                break;
            case "QB":
                constructedPlayer = new QBPosition(number, name, position, grade, team)
                playerObjects.push((constructedPlayer))
                break;
            default:
                constructedPlayer = new NonQbSkillPosition(number, name, position, grade, team)
                playerObjects.push(constructedPlayer)
                break;
        }
        console.log(playerObjects)

    })
    allPlayerObjects.push(playerObjects)
    console.log(playerObjects)
    // renderPlayerCards(playerObjects, team)
}

const playerArrays = [[15,"Jim Jimmy","OL\\DL",12],[43,"Hello there","WR\\RB",11],[68,"Jake James","OL\\DL",9],[88,"Jamie McMurray","QB\\LB",12],[81,"James Jameson","TE\\LB",12]]

createObjects(playerArrays, 'home')
