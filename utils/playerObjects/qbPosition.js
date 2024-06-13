import SkillPosition from './skillPosition.js'

export class QBPosition extends SkillPosition{
    constructor(jerseyNumber, name, position, grade, team, rushTouchdowns, rushYards, interceptions, passAtt, passComp, passYards, passTouchdowns, tackles, passDefended, rushAttempts){
        super(jerseyNumber, name, position, grade, team, rushYards, interceptions, rushAttempts, rushTouchdowns, passDefended, tackles)
        this.passAtt            = passAtt            || 0
        this.passComp           = passComp           || 0
        this.passYards          = passYards          || 0
        this.passTouchdowns     = passTouchdowns     || 0
    }
}

