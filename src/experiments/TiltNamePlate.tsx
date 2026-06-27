import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from './hooks'

/**
 * Experiment #1 — pointer-tilt name plate.
 * The slab rotates in 3D toward the cursor; the name floats above the surface
 * via translateZ (real parallax depth, not a flat rotation) and a brass
 * specular highlight tracks the pointer.
 */
export default function TiltNamePlate() {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--ry', `${(px - 0.5) * 24}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * 24}deg`)
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    })
  }

  function reset() {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
  }

  return (
    <div ref={ref} className="tilt" onPointerMove={onMove} onPointerLeave={reset}>
      <div className="tilt__plate">
        <div className="tilt__shine" aria-hidden="true" />
        <span className="tilt__coord">a1</span>
        <h2 className="tilt__name">
          Victor
          <br />
          Jiang
        </h2>
        <p className="tilt__role">Software engineer</p>
      </div>
    </div>
  )
}
