import Player from ('./player.js')

export class NonSkillPosition extends Player{
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


