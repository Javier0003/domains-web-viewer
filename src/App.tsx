import { LeftPannel } from './component/leftPannel'
import styles from './styles/body.module.css'
import { TopPannel } from './component/topPannel'
import { Canvas } from './component/canvas'
import { useState } from 'react'

let players = []

let calls = 0
let rounds = 0
let cols = 0
let rows = 0
let boards: Square[][][] = []
const scores = new Array()

const animationTimer = 100

function App() {
  const [currentValue, setCurrentValue] = useState(1)
  const [text, updateText] = useState('')

  if (text) {
    console.log('fillBoards')
    fillBoards(text)
  }
  return (
    <div className={styles.container}>
      <LeftPannel
        players={players}
        round={currentValue}
        uploadText={updateText}
        resetCalls={calls}
      />
      <div className={styles.sidePannel}>
        <TopPannel
          setCurrentValue={setCurrentValue}
          startingValue={currentValue}
          timer={animationTimer}
        />
        <Canvas rows={rows} cols={cols} board={boards[currentValue]} />
      </div>
    </div>
  )
}

function fillBoards(text: string) {
  if (++calls > 1) return

  boards = []
  players = []

  //Array of strings for each line
  const lines = text.split(/\r?\n/)

  //0 is nrounds, rows and cols
  let str = lines[0].split(' ')
  rounds = parseInt(str[0])
  rows = parseInt(str[1])
  cols = parseInt(str[2])
  //1 is nplayers, name1,name2,(name3),(name4)
  str = lines[1].split(' ')
  const nplayers = parseInt(str[0])
  // console.log('rounds' + rounds)
  console.log('rows: ' + rows)
  console.log('cols: ' + cols)
  // console.log('lines: ' + lines.length)

  const colors = [
    'rgb(255, 105, 180)',
    'rgb(203, 114, 244)',
    'rgb(255, 215, 0)',
    'rgb(44, 237, 236)',
  ]

  console.log('nplayers:' + nplayers)
  for (let i = 0; i < nplayers; ++i) {
    const name = str[i + 1]
    players.push({ name: name, color: colors[i], score: 0 })
  }
  //2 is 0 start
  //3 is 0 end
  const START = 2
  for (
    let i = START;
    i < rounds + 2;
    ++i //Rounds
  ) {
    str = lines[i].split(' ')

    scores[i - START] = []
    boards[i - START] = []
    let l = 0
    for (; l < nplayers; ++l) {
      scores[i - START][l] = parseInt(str[l + 1])
    }
    const round = str[str.length-1]

    for (let j = 0; j < rows; j = j+1) {
      boards[i - START][j] = []
      for (let k = 0; k < cols; k = k+1) {
        //console.log('i:' + (i - START) + ' j:' + j + ' k:' + k)
        //Get 2 chars
        const sq = round.charAt(2*j*rows+2*k)
        const un = round.charAt(2*j*rows+2*k+1)
        const aux = decode(sq, un)
        boards[i - START][j][k] = aux
      }
    }
  }
  console.log('resultado leido')
}

function decode(square: string, unit: string) {
  const excl = "!"
  const exclCode = excl.charCodeAt(0)
  let sq = square.charCodeAt(0)
  let un = unit.charCodeAt(0)

  sq -= exclCode
  un -= exclCode
  //console.log("sq: " + square + " un: " + unit + " sqcode: " + sq + " uncode: " + un)
  // const un = unit.charCodeAt(0) - excl.charCodeAt(0)

  let painter = -1
  let drawer = -1
  let ability = false

  if (sq === SquareCodes.EMPTY) {
    painter = -1
    drawer = -1
  } else if (sq >= SquareCodes.PAINT0 && sq <= SquareCodes.PAINT3) {
    painter = sq - SquareCodes.PAINT0
    drawer = -1
  } else if (sq >= SquareCodes.DRAW0 && sq <= SquareCodes.DRAW3) {
    painter = -1
    drawer = sq - SquareCodes.DRAW0
  } else if (sq >= SquareCodes.ABILITY0 && sq <= SquareCodes.ABILITY3) {
    painter = sq - SquareCodes.ABILITY0
    drawer = -1
    ability = true
  } else {
    switch (sq) {
      case SquareCodes.P0D1:
        painter = 0
        drawer = 1
        break
      case SquareCodes.P0D2:
        painter = 0
        drawer = 2
        break
      case SquareCodes.P0D3:
        painter = 0
        drawer = 3
        break
      case SquareCodes.P1D0:
        painter = 1
        drawer = 0
        break
      case SquareCodes.P1D2:
        painter = 1
        drawer = 2
        break
      case SquareCodes.P1D3:
        painter = 1
        drawer = 3
        break
      case SquareCodes.P2D0:
        painter = 2
        drawer = 0
        break
      case SquareCodes.P2D1:
        painter = 2
        drawer = 1
        break
      case SquareCodes.P2D3:
        painter = 2
        drawer = 3
        break
      case SquareCodes.P3D0:
        painter = 3
        drawer = 0
        break
      case SquareCodes.P3D1:
        painter = 3
        drawer = 1
        break
      case SquareCodes.P3D2:
        painter = 3
        drawer = 2
        break
      default:
        break
    }
  }

  const result: Square = {
    painter: painter,
    drawer: drawer,
    unit: un,
    ability: ability,
  }

  return result
}

type Square = {
  painter: number
  drawer: number
  unit: number
  ability: boolean
}

const SquareCodes = {
  EMPTY: 0,

  PAINT0: 1,
  PAINT1: 2,
  PAINT2: 3,
  PAINT3: 4,
  ABILITY0: 5,
  ABILITY1: 6,
  ABILITY2: 7,
  ABILITY3: 8,
  DRAW0: 9,
  DRAW1: 10,
  DRAW2: 11,
  DRAW3: 12,

  P0D1: 13,
  P0D2: 14,
  P0D3: 15,
  P1D0: 16,
  P1D2: 17,
  P1D3: 18,
  P2D0: 19,
  P2D1: 20,
  P2D3: 21,
  P3D0: 22,
  P3D1: 23,
  P3D2: 24,

  ERRSQUARE: 25,
}

const UnitCodes = {
  OWN0: 0,
  OWN1: 1,
  OWN2: 2,
  OWN3: 3,
  OWN0UP: 4,
  OWN1UP: 5,
  OWN2UP: 6,
  OWN3UP: 7,
  BUBBLE0: 8,
  BUBBLE1: 9,
  BUBBLE2: 10,
  BUBBLE3: 11,
  BONUS: 12,
  NOTHING: 13,

  ERRUNIT: 14,
}

export default App
