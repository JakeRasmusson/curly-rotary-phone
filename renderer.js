const teamCsvInput = document.querySelector("[name = 'teamCsv']")
const form = document.getElementById('teamForm')
const chooseJsonLocationButton = document.getElementById('chooseJsonLocation')
const filePathP = document.getElementById('choosenFilePath')
console.log(chooseJsonLocationButton)
const playerObjects = []


chooseJsonLocationButton.addEventListener('click', async () => {
    const filePaths= await window.dataSaving.chooseJsonLocation()
    if (filePaths[0]) {
        filePathP.innerText = filePaths[0]
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const {teamCsv, selectTeam } = event.target.elements
    const teamName = selectTeam.value
    const file = teamCsv.files[0]

    console.log(selectTeam.value)
    if (!file || !teamName) {
        alert('Select File and team name')
        return
    }


    const reader = new FileReader()
    reader.onload = (evt => {
        parseData(evt.target.result)

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
         console.log(playerNumber)
        if (!isNaN(playerNumber)) {
            players.push(column)
        } else {
            console.log('not a player')
        }
    } )
    prepareForObject(players, team)
}

const prepareForObject = (players, team) => {
    const slicedPlayers = players.map(player => player.slice(0,4))
    createObjects(slicedPlayers, team)
}

const createObjects = (objectReady, team) => {
    objectReady.forEach(player => {
        const [ number, name, position, grade] = player
        playerObjects.push({
            playername: `${number} ${team}`,
                name,
                position,
                grade
            })
    })
    console.log(playerObjects, team)
}
console.log(teamCsvInput)


// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


// const func = async () => {
//     const response = await window.versions.ping()
//     console.log(response) // prints out 'pong'
//   }
  
//   func()