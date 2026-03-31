import { useEffect, useMemo, useState } from 'react'

function getCountdown(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now()
  const safeDiff = Math.max(diff, 0)

  return {
    days: Math.floor(safeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDiff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDiff / (1000 * 60)) % 60),
    seconds: Math.floor((safeDiff / 1000) % 60),
    isComplete: diff <= 0,
  }
}

export function useCountdown(targetDate: string) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(targetDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [targetDate])

  return useMemo(
    () => [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds },
    ],
    [countdown],
  )
}
