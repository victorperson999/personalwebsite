import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting and updates live if it
 * changes. Used to disable pointer-driven motion (parallax, etc.) and fall back
 * to a calm static state.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
