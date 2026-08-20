import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useTypewriter(text: string, msPerChar = 60): string {
  const reduced = useReducedMotion()
  const [length, setLength] = useState(() => (reduced ? text.length : 0))

  useEffect(() => {
    if (reduced) {
      setLength(text.length)
      return
    }
    setLength(0)
    const timer = setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          clearInterval(timer)
          return current
        }
        return current + 1
      })
    }, msPerChar)
    return () => clearInterval(timer)
  }, [text, msPerChar, reduced])

  return text.slice(0, length)
}
