// import { useState } from 'react'
import { LeftPannel } from './component/leftPannel'
import styles from './styles/body.module.css'
import { TopPannel } from './component/topPannel'

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
]

function App() {
  // const { players, setPlayers } = useState([])
  return (
    <div className={styles.container}>
      <LeftPannel players={players} />
      <TopPannel />
    </div>
  )
}

export default App
