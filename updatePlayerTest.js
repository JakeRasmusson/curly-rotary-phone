
//Update Stats
// class addStats{

//     constructor(playerStats, plusEvent) {
//         this.player = playerStats
//         this.plusEvent = plusEvent
//         this.plusOneAddEvents()
//     }

//     plusOneAddEvents() {
//         const stat = Object.keys(this.plusEvent)
//         this.player[stat] += this.plusEvent[stat]
//         console.log(this.player)
//         if (dirtyPlayers.includes(this.player)) {
//             updateJson(dirtyPlayers)
//         } else {
//         dirtyPlayers.push(this.player)
//         updateJson(this.player, this.player.playerId)
//         }
//     }
// }

// const findPlayer = (playerEventId, statData) => {
//     allPlayerObjects.forEach(player => {
//         if (player.playerId == playerEventId) {
//             const newAdd = new addStats(player, statData)
//         }
        
//     });
// }