const teamCsvInput = document.querySelector("[name = 'teamCsv']")
const form = document.getElementById('teamForm')
const chooseJsonLocationButton = document.getElementById('chooseJsonLocation')
const filePathP = document.getElementById('choosenFilePath')
const homeRosterBody = document.getElementById('homeRoster')
const awayRosterBody = document.getElementById('awayRoster')
const allPlayerObjects = {}
import { NonSkillPosition, QBPosition, NonQbSkillPosition } from './utils/playerObjects/index.js'
let jsonFilePath = ''
// const dirtyPlayers = []
const dropCards = document.querySelectorAll('.dropCards')



chooseJsonLocationButton.addEventListener('click', async () => {
    const filePaths= await window.dataSaving.chooseJsonLocation()
    if (filePaths[0]) {
        jsonFilePath = filePaths[0] +'\\data.json'
        filePathP.innerText = jsonFilePath
        saveJson(allPlayerObjects)
    }
})

//Init save for whole object
const saveJson = async (changedPlayers) => {
    const jsonObject = {'jsonFilePath' : jsonFilePath, 'playerObjects' : changedPlayers}
    const update = await window.dataSaving.saveJson(jsonObject)
}
//Only sends changed playerid and the stat changed
const updateJson = async (changedPlayerId, changedPlayerEvent) => {
    const jsonObject = {'jsonFilePath' : jsonFilePath,'changedPlayerId': changedPlayerId, 'changedPlayerEvent':changedPlayerEvent}
    const update = await window.dataSaving.updateJson(jsonObject)
}

dropCards.forEach(card => card.addEventListener('drop', (event => {
    console.log(event.target)
}))
)

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
        let offPosition = position.slice(0,2)
        switch (offPosition) {
            case "OL":
                constructedPlayer = new NonSkillPosition(number, name, position, grade, team)
                playerObjects.push(constructedPlayer)
                allPlayerObjects[playerId] = constructedPlayer
                break;
            case "QB":
                constructedPlayer = new QBPosition(number, name, position, grade, team)
                playerObjects.push((constructedPlayer))
                allPlayerObjects[playerId] = constructedPlayer
                break;
            default:
                constructedPlayer = new NonQbSkillPosition(number, name, position, grade, team)
                playerObjects.push(constructedPlayer)
                allPlayerObjects[playerId] = constructedPlayer
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
        const playerLi = document.createElement('tr')
        playerLi.innerHTML = `
          <td class="text-center">${player.jerseyNumber}</td>
          <td class="text-center">${player.name}</td>
          <td class="text-center">${player.position}</td>
`
        playerLi.id = `${playerId}`
        // Drag listener and data to be passed to card
        playerLi.draggable = "true"
        playerLi.dataset.cardText = `
        <h2 class="basis-1/4 text-left">${player.position}</h2>
        <h2 class="basis-1/2 leading-none self-center text-center">${player.name}</h2>
        <h2 class="basis-1/4 text-right">${player.jerseyNumber}</h2>`
        playerLi.addEventListener('dragstart', drag)
        tableBody.appendChild(playerLi)

    });
}

// Can reorganize later - drop and drag functions and listeners
const playerCards = document.querySelectorAll('.player-card')

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.cardText);
    console.log(ev)
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const firstDivChild = ev.currentTarget.querySelector('div:first-child');
    firstDivChild.innerHTML = data;
    console.log('drop!')
}
playerCards.forEach((playerCard) => {
    playerCard.addEventListener('drop', drop)
})

playerCards.forEach((playerCard) => {
    playerCard.addEventListener('dragover', allowDrop)
})
