import styles from '../styles/leftPannel.module.css'
type pannelProps = {
  players: { name: string; score: number; color: string }[]
  round: number
  uploadText: (file: string) => void
}

export function LeftPannel({ players, round, uploadText }: pannelProps) {
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.files?.[0]
    if (text) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const file = e.target.result as string
        uploadText(file)
      }
      reader.readAsText(text)
    }
  }
  return (
    <div className={styles.container}>
      <label htmlFor="counter" style={{ fontSize: '35px' }}>
        Round:
      </label>
      <div className={styles.roundCount}>{round}</div>
      <div className={styles.players}>
        {players.map((player) => (
          <div key={player.color}>
            <label key={player.name} style={{ color: player.color }}>
              {player.name}
            </label>
            <br />
            <label key={player.score}>{player.score}</label>
          </div>
        ))}
      </div>
      <input type="file" onChange={handleText} />
    </div>
  )
}
