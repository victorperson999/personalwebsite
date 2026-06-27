import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting and updates live if it
 * changes. Experiments use this to disable pointer tilt / parallax / auto-spin
 * and fall back to a composed static state.
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
