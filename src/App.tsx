import { LeftPannel } from './component/leftPannel'
import styles from './styles/body.module.css'
import { TopPannel } from './component/topPannel'
import { Canvas } from './component/canvas'
import { useState } from 'react'

const players = [
  {
    name: 'xploid',
    score: 69,
    color: 'green',
  },
  {
    name: 'nigga',
    score: 420,
    color: 'black',
  },
  {
    name: 'jew',
    score: 50,
    color: 'rgb(255, 255, 69)',
  },
]

const animationTimer = 100

function App() {
  const [currentValue, setCurrentValue] = useState(0)

  return (
    <div className={styles.container}>
      <LeftPannel players={players} round={currentValue} />
      <div className={styles.sidePannel}>
        <TopPannel
          setCurrentValue={setCurrentValue}
          startingValue={currentValue}
          timer={animationTimer}
        />
        <Canvas />
      </div>
    </div>
  )
}

export default App
