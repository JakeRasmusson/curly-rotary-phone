import Player from './player.js'

export class SkillPosition extends Player{


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


