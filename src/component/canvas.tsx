import styles from '../styles/canvas.module.css'
import { useRef, useEffect } from 'react'
type gameInfo = {
  rows: number
  cols: number
  board: Square[][]
}
type Square = {
  painter: number
  drawer: number
  unit: number
  ability: boolean
}
let tileSize = 0
let rowsC = 0
let colsC = 0
let boardC: Square[][]
const unitSize = 0.7 //Square is 1

const colors = [
  'rgb(255, 105, 180)',
  'rgb(203, 114, 244)',
  'rgb(255, 215, 0)',
  'rgb(44, 237, 236)',
]

//Provisional
const drawerColors = [
  'rgb(255, 43, 127)',
  'rgb(161, 50, 233)',
  'rgb(255, 180, 0)',
  'rgb(0, 180, 180)',
]
const abilityColors = [
  'rgb(255, 43, 127)',
  'rgb(161, 50, 233)',
  'rgb(255, 180, 0)',
  'rgb(0, 180, 180)',
]
const unitColors = [
  'rgb(151, 0, 58)',
  'rgb(97, 0, 148)',
  'rgb(188, 86, 0)',
  'rgb(0, 122, 123)',
]
//Provisional
const upgradedColors = [
  'rgb(151, 0, 58)',
  'rgb(97, 0, 148)',
  'rgb(188, 86, 0)',
  'rgb(0, 122, 123)',
]
const squareDefaultColor = 'rgb(30,30,30)'
const bonusColor = 'rgb(200,0,0)'

export function Canvas({ rows, cols, board }: gameInfo) {
  // Create a reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // console.log(canvasRef)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    // Now, you can use the `context` to draw on the canvas
  }, [])
  rowsC = rows
  colsC = cols
  boardC = board

  //window.addEventListener('resize', onWindowResize, false)
  onWindowResize(canvasRef) //llama a paint();

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  )
}

function paint(canvasRef) {
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'black'
  context.fillRect(0, 0, tileSize * colsC, tileSize * rowsC)
  for (let i = 0; i < rowsC; ++i) {
    for (let j = 0; j < colsC; ++j) {
      const sq = boardC[i][j]
      paintTile(sq, i, j, canvasRef)
    }
  }
}
function paintTile(sq: Square, x: number, y: number, canvasRef) {
  let sqColor = squareDefaultColor
  if (sq.painter >= 0) sqColor = colors[sq.painter]
  if (sq.ability) sqColor = abilityColors[sq.painter]
  if (sq.drawer >= 0) sqColor = drawerColors[sq.drawer]

  paintSquare(sqColor, x, y, canvasRef)

  let uColor

  if (sq.unit >= UnitCodes.OWN0 && sq.unit <= UnitCodes.OWN3) {
    uColor = unitColors[sq.unit - UnitCodes.OWN0]
    paintUnit(uColor, x, y, canvasRef)
  } else if (sq.unit >= UnitCodes.OWN0UP && sq.unit <= UnitCodes.OWN3UP) {
    uColor = upgradedColors[sq.unit - UnitCodes.OWN0UP]
    paintUnit(uColor, x, y, canvasRef)
  } else if (sq.unit >= UnitCodes.BUBBLE0 && sq.unit <= UnitCodes.BUBBLE3) {
    uColor = upgradedColors[sq.unit - UnitCodes.BUBBLE0]
    paintBubble(uColor, x, y, canvasRef)
  } else if (sq.unit === UnitCodes.BONUS) {
    uColor = bonusColor
    paintBonus(uColor, x, y, canvasRef)
  }
}
function paintSquare(col: string, x: number, y: number, canvasRef) {
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  const i = x * tileSize
  const j = y * tileSize
  context.fillStyle = col
  context.fillRect(j, i, tileSize - 0.5, tileSize - 0.5)
}

function paintUnit(color: string, x: number, y: number, canvasRef) {
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  context.fillStyle = color
  const i = x * tileSize + 0.125*tileSize
  const j = y * tileSize + 0.125*tileSize
  //let size = unitSize * tileSize * 0.7
  context.fillRect(j, i, unitSize*tileSize, unitSize*tileSize)
  context.stroke()
}

function onWindowResize(canvasRef) {
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return

  const size = 700
  canvas.width = size
  canvas.height = size

  const max = Math.max(colsC, rowsC)
  tileSize = size / max
  paint(canvasRef)
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
function paintBonus(color: string, x: number, y: number, canvasRef) {
  paintUnit(color, x, y, canvasRef)
}

function paintBubble(color: string, x: number, y: number, canvasRef) {
  const canvas = canvasRef.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  const size = unitSize * tileSize * 0.7
  const offset = (tileSize - size) / 2
  context.beginPath()
  context.arc(
    y * tileSize + size / 2 + offset,
    x * tileSize + size / 2 + offset,
    size / 2,
    0,
    2 * Math.PI,
    false
  )
  context.fillStyle = color
  context.fill()
}
