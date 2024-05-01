const teamCsvInput = document.querySelector("[name = 'teamCsv']")
const form = document.getElementById('teamForm')
const chooseJsonLocationButton = document.getElementById('chooseJsonLocation')
const filePathP = document.getElementById('choosenFilePath')
const homeRosterBody = document.getElementById('homeRoster')
const awayRosterBody = document.getElementById('awayRoster')
const allPlayerObjects = []
let jsonFilePath = ''
const dirtyPlayers = []

chooseJsonLocationButton.addEventListener('click', async () => {
    const filePaths= await window.dataSaving.chooseJsonLocation()
    if (filePaths[0]) {
        jsonFilePath = filePaths[0] +'\\data.json'
        filePathP.innerText = jsonFilePath
        saveJson(allPlayerObjects)
    }
})
const saveJson = async (changedPlayers) => {
    const jsonObject = {'jsonFilePath' : jsonFilePath, 'playerObjects' : changedPlayers}
    const update = await window.dataSaving.saveJson(jsonObject)
}
const updateJson = async (changedPlayer, changedPlayerId) => {
    const jsonObject = {'jsonFilePath' : jsonFilePath, 'playerObject' : changedPlayer, 'changedPlayerId': changedPlayerId}
    const update = await window.dataSaving.updateJson(jsonObject)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const {teamCsv, selectTeam } = event.target.elements
    const teamName = selectTeam.value
    const file = teamCsv.files[0]

    if (!file || !teamName) {
        alert('Select File and team name')
        return
    }


    const reader = new FileReader()
    reader.onload = (evt => {
        parseData(evt.target.result,teamName)

    })
    reader.readAsText(file)
})


//Data parsing and player object creation
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
                constructedPlayer = new NonSkillPosition(number, name, position, grade, team)
                playerObjects.push(constructedPlayer)
                allPlayerObjects.push(constructedPlayer)
                break;
            case "QB":
                constructedPlayer = new QBPosition(number, name, position, grade, team)
                playerObjects.push((constructedPlayer))
                allPlayerObjects.push(constructedPlayer)
                break;
            default:
                constructedPlayer = new NonQbSkillPosition(number, name, position, grade, team)
                playerObjects.push(constructedPlayer)
                allPlayerObjects.push(constructedPlayer)
                break;
        }

    })
    renderPlayerCards(playerObjects, team)
}





// Dom Rendering
const renderPlayerCards = (players, team) => {
    let tableBody = ''
    if (team == 'away'){
        tableBody = awayRosterBody
    } else {
        tableBody = homeRosterBody
    }
    tableBody.innerHTML = ''
    players.forEach(player => {
        const playerId = player.playerId
        const playerLi = document.createElement('div')
        playerLi.innerHTML = `            <div>
        <tr>
          <th>${player.jerseyNumber}</th>
          <td>${player.name}</td>
          <td>${player.position}</td>
          <td>${player.grade}</td>
        </tr>
    </div>`
        playerLi.id = `${playerId}`
        tableBody.appendChild(playerLi)

    });
}


//Update Stats
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
        if (dirtyPlayers.includes(this.player)) {
            updateJson(dirtyPlayers)
        } else {
        dirtyPlayers.push(this.player)
        updateJson(this.player, this.player.playerId)
        }
    }
}

const findPlayer = (playerEventId, statData) => {
    allPlayerObjects.forEach(player => {
        if (player.playerId == playerEventId) {
            const newAdd = new addStats(player, statData)
        }
        
    });
}
