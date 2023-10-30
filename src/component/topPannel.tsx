import styles from '../styles/topPannel.module.css'

type setValueProps = {
  setCurrentValue: (value: number) => void
  startingValue: number
  timer: number
  rounds: number
}

export function TopPannel({
  setCurrentValue,
  startingValue,
  timer,
  rounds,
}: setValueProps) {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this function handles the change of the range thnigy
    setCurrentValue(Number(e.target.value))
  }

  let intervalId = 0
  const animationInterval = () => {
    // animation interval
    setCurrentValue((prevValue: number) => {
      const newValue = prevValue + 1
      if (newValue === rounds) {
        clearInterval(intervalId)
        return prevValue
      }
      return newValue
    })
  }
  const handleAnimation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!intervalId) {
        intervalId = setInterval(animationInterval, timer)
      }
      return
    }
    clearInterval(intervalId)
  }

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        name="animationCheck"
        className={styles.animationcheck}
        onChange={handleAnimation}
      />
      <label>Animation</label>
      <input
        type="range"
        min={0}
        max={rounds - 1}
        value={startingValue}
        className={styles.range}
        onChange={handleRangeChange}
      />
    </div>
  )
}
