// function Player(number, name, position, grade, playerStats) {
//     this.number = number
//     this.name = name
//     this.position = position
//     this.grade = grade

//     this.playerStats = playerStats
//   }
class Player{
    constructor(number, name, position, grade){
        this.number = number
        this.name = name
        this.position = position
        this.grade = grade
    }
}

class SkillPosition extends Player{
    constructor(receptions, touchdowns, recYards, rushYards, tackles, int, passDefended){
        super(number, name, position, grade)
    }

}

class NonSkillPosition extends Player{
    constructor(pancake, sack, tackle, tackleForLoss)
        super(number,name,position,grade)
}

// const player = {
//   {
//     playername: '84 away',
//     number: '84',
//     name: 'Mason Mitacek',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '32 away',
//     number: '32',
//     name: 'Jordan Oppenneer',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '33 away',
//     number: '33',
//     name: 'Asher Pauley',
//     position: 'RB/LB',
//     grade: ''
//   },
//   {
//     playername: '85 away',
//     number: '85',
//     name: 'Espen Pieroni',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '17 away',
//     number: '17',
//     name: 'DQ Pinter',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '85 away',
//     number: '85',
//     name: 'Matteo Ruffolo',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '20 away',
//     number: '20',
//     name: 'Rocco Ruffolo',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '22 away',
//     number: '22',
//     name: 'Seth Scheele',
//     position: 'RB/DB',
//     grade: ''
//   },
//   {
//     playername: '9 away',
//     number: '9',
//     name: 'Samuel Sippy',
//     position: 'TE/LB',
//     grade: ''
//   },
//   {
//     playername: '23 away',
//     number: '23',
//     name: 'tynan Skinner',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '2 away',
//     number: '2',
//     name: 'Ruslan St. Germain',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '62 away',
//     number: '62',
//     name: 'Brandon Stewart',
//     position: 'OL/DL',
//     grade: ''
//   },
//   {
//     playername: '38 away',
//     number: '38',
//     name: 'Landon Taylor',
//     position: 'RB/LB',
//     grade: ''
//   },
//   {
//     playername: '11 away',
//     number: '11',
//     name: 'Joshua Topercer',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '64 away',
//     number: '64',
//     name: 'Jacob Ward',
//     position: 'OL/DL',
//     grade: ''
//   },
//   {
//     playername: '21 away',
//     number: '21',
//     name: 'Sentrell Watts',
//     position: 'WR/DB',
//     grade: ''
//   },
//   {
//     playername: '42 away',
//     number: '42',
//     name: 'Mason Wierzbicki',
//     position: 'TE/DL',
//     grade: ''
//   },
//   {
//     playername: '61 away',
//     number: '61',
//     name: 'Joshua Yehle',
//     position: 'OL/DL',
//     grade: ''
//   },
//   {
//     playername: '46 away',
//     number: '46',
//     name: 'Garett Zagame',
//     position: 'RB/LB',
//     grade: ''
//   }}