import { useEffect, useMemo, useState } from 'react'

function getCountdown(targetDate: Date) {
  const diff = targetDate.getTime() - Date.now()
  const safeDiff = Math.max(diff, 0)

  return {
    days: Math.floor(safeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDiff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDiff / (1000 * 60)) % 60),
    seconds: Math.floor((safeDiff / 1000) % 60),
    isComplete: diff <= 0,
  }
}

export function useCountdown() {

  const targetDate = useMemo(
    () =>
      new Date(
        2026, // year
        5,    // June (0-indexed)
        1,    // date
        9,    // hour
        0,    // minute
        0,    // second
      ),
    [],
  )

  const [countdown, setCountdown] = useState(() =>
    getCountdown(targetDate),
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(targetDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [targetDate])

  return useMemo(
    () => [
      {
        label: 'Days',
        value: String(countdown.days).padStart(2, '0'),
      },
      {
        label: 'Hours',
        value: String(countdown.hours).padStart(2, '0'),
      },
      {
        label: 'Minutes',
        value: String(countdown.minutes).padStart(2, '0'),
      },
      {
        label: 'Seconds',
        value: String(countdown.seconds).padStart(2, '0'),
      },
    ],
    [countdown],
  )
}