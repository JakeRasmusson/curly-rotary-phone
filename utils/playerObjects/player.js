 export class Player{
    constructor(jerseyNumber, name, position, grade, team){
        this.jerseyNumber   = jerseyNumber
        this.name           = name
        this.position       = position
        this.grade          = grade
        this.team           = team
        this.playerId       = jerseyNumber + team
    }
}

