import styles from '../styles/leftPannel.module.css'
type pannelProps = {
  players: { name: string; score: number; color: string }[]
  round: number
}

export function LeftPannel({ players, round }: pannelProps) {
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
    </div>
  )
}
