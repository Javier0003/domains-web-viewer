import styles from '../styles/leftPannel.module.css'
type pannelProps = {
  players: { name: string; score: number; color: string }[]
  round: number
  uploadText: (file: string) => void
  resetCalls: number
}

export function LeftPannel({
  players,
  round,
  uploadText,
  resetCalls,
}: pannelProps) {
  let playersD
  if (players) {
    playersD = players.map((player) => (
      <div key={player.color}>
        <label key={player.name} style={{ color: player.color }}>
          {player.name}
        </label>
        <br />
        <label key={player.score}>{player.score}</label>
      </div>
    ))
  }

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target?.files?.[0]
    if (text) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const file = e.target?.result as string
        uploadText(file)
      }
      reader.readAsText(text)
    }
    if (resetCalls !== 0) {
      resetCalls = 0
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="counter" style={{ fontSize: '35px' }}>
          Round:
        </label>
        <div className={styles.roundCount}>{round}</div>
        <div className={styles.players}>{playersD}</div>
      </div>
      <div className={styles.uploadContainer}>
        <div className={styles.labelInput}>
          <label htmlFor="fileInput" style={{ fontSize: '18px' }}>
            Upload file
          </label>
        </div>
        <input
          type="file"
          onChange={handleText}
          className={styles.upload}
          accept=".txt"
          id="fileInput"
        />
      </div>
    </div>
  )
}
