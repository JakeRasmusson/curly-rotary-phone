import SkillPosition from './skillPosition.js'

export class NonQbSkillPosition extends SkillPosition{
    constructor(jerseyNumber, name, position, grade, team, rushTouchdowns, rushYards, tackles, interceptions, passDefended, rushAttempts, receptions, recYards, drops, recTouchdowns){
        super(jerseyNumber, name, position, grade, team, rushYards, interceptions, rushTouchdowns, rushAttempts, rushTouchdowns, passDefended, tackles)
        this.receptions         = receptions        || 0
        this.recYards           = recYards          || 0
        this.drops              = drops             || 0
        this.recTouchdowns      = recTouchdowns     || 0
    }
}
