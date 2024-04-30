const teamCsvInput = document.querySelector("[name = 'teamCsv']")
const form = document.getElementById('teamForm')
const chooseJsonLocationButton = document.getElementById('chooseJsonLocation')
const filePathP = document.getElementById('choosenFilePath')
const homeRosterBody = document.getElementById('homeRoster')
const awayRosterBody = document.getElementById('awayRoster')
const allPlayerObjects = {}
let jsonFilePath = ''

chooseJsonLocationButton.addEventListener('click', async () => {
    const filePaths= await window.dataSaving.chooseJsonLocation()
    if (filePaths[0]) {
        jsonFilePath = filePaths[0] +'\\data.json'
        filePathP.innerText = jsonFilePath
        // const saveJson = await window.dataSaving.createJson(filePaths[0])
        // console.log(saveJson)
        updateJson()
    }
})

const updateJson = async () => {
    const jsonObject = {'jsonFilePath' : jsonFilePath, 'playerObjects' : allPlayerObjects}
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

class Player{
    jerseyNumber : number
    constructor(jerseyNumber, name, position, grade){
        this.jerseyNumber = jerseyNumber
        this.name = name
        this.position = position
        this.grade = grade
    }
}

class SkillPosition extends Player{
    receptions      : number
    touchdowns      : number
    recYards        : number
    rushYards       : number
    tackles         : number
    interceptions   : number
    passDefended    : number

    constructor(jerseyNumber, name, position, grade,receptions, touchdowns, recYards, rushYards, tackles, interceptions, passDefended){
        super(jerseyNumber, name, position, grade)
        this.receptions = receptions
        this.touchdowns = touchdowns
        this.recYards  = recYards
        this.rushYards = rushYards
        this.tackles = tackles
        this.interceptions = interceptions
        this.passDefended = passDefended
    }

}

class NonSkillPosition extends Player{
    pancake         : number
    sack            : number
    tackle          : number
    tackleForLoss   : number
    constructor(jerseyNumber, name, position, grade,pancake, sack, tackle, tackleForLoss)
        super(jerseyNumber,name,position,grade)
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
    prepareForObject(players, team)
}

const prepareForObject = (players, team) => {
    const slicedPlayers = players.map(player => player.slice(0,4))
    createObjects(slicedPlayers, team)
}

const createObjects = (objectReady, team) => {
    const playerObjects = []
    objectReady.forEach(player => {
        const [ number, name, position, grade] = player
        switch (position.split(1)) {
            case "OL":
                playerObjects.push({`${number} ${team}`:new NonSkillPosition(number, name, position, grade)})
                break;
        
            default:
                playerObjects.push({`${number} ${team}`:new SkillPosition(number, name, position, grade)})
                break;
        }

    })
    allPlayerObjects.push(playerObjects)
    renderPlayerCards(playerObjects, team)
}






const renderPlayerCards = (players, team) => {
    let tableBody = ''
    if (team == 'away'){
        tableBody = awayRosterBody
    } else {
        tableBody = homeRosterBody
    }
    tableBody.innerHTML = ''
    players.forEach(player => {
        const playerId = player.playername.replaceAll(' ','')
        const playerLi = document.createElement('div')
        playerLi.innerHTML = `            <div>
        <tr>
          <th>${player.number}</th>
          <td>${player.name}</td>
          <td>${player.position}</td>
          <td>${player.grade}</td>
        </tr>
    </div>`
        playerLi.id = `${playerId}`
        tableBody.appendChild(playerLi)

    });
}
