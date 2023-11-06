import { useEffect } from 'react'
import styles from '../styles/topPannel.module.css'

const maxRounds = 501 //Hardcoded value

type setValueProps = {
  setCurrentValue: (prevValue: number | ((value: number) => number)) => void
  startingValue: number
  timer: number
  rounds: number
}
let intervalId: number
export function TopPannel({
  setCurrentValue,
  startingValue,
  timer,
  rounds,
}: setValueProps) {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(Number(e.target.value))
  }

  const animationInterval = () => {
    setCurrentValue((prevValue) => {
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
      intervalId = setInterval(animationInterval, timer)
      return
    }
    clearInterval(intervalId)
  }

  const handleArrowKeys = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        setCurrentValue((prevValue: number) => {
          const newValue = prevValue - 1
          if (newValue === -1) return prevValue
          return newValue
        })
        break
      case 'ArrowRight':
        event.preventDefault()
        setCurrentValue((prevValue: number) => {
          const newValue = prevValue + 1
          if (newValue >= maxRounds) return prevValue
          return newValue
        })
        break
      default:
        break
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeys)
    return () => {
      window.removeEventListener('keydown', handleArrowKeys)
    }
  })
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        name="animationCheck"
        className={styles.animationcheck}
        onChange={handleAnimation}
      />
      <label className={styles.text}>Animation</label>
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
