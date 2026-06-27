import {
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useReducedMotion } from './hooks'

/**
 * Experiment #2 — multi-layer pointer parallax.
 * Chess glyphs and squares sit at different depths and drift by the pointer
 * offset scaled by each layer's `--depth`, so the name reads as floating in
 * front of a shallow 3D space.
 */
type Layer = {
  depth: number
  top: string
  left: string
  glyph: string
  size: string
}

const LAYERS: Layer[] = [
  { depth: 0.018, top: '18%', left: '12%', glyph: '♞', size: '3rem' },
  { depth: 0.05, top: '62%', left: '20%', glyph: '♝', size: '2.2rem' },
  { depth: 0.032, top: '24%', left: '74%', glyph: '♜', size: '2.6rem' },
  { depth: 0.07, top: '68%', left: '78%', glyph: '♛', size: '3.4rem' },
  { depth: 0.026, top: '46%', left: '46%', glyph: '♟', size: '1.8rem' },
]

export default function ParallaxField() {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = e.clientX - rect.left - rect.width / 2
    const py = e.clientY - rect.top - rect.height / 2
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--px', `${px}px`)
      el.style.setProperty('--py', `${py}px`)
    })
  }

  function reset() {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--px', '0px')
    el.style.setProperty('--py', '0px')
  }

  return (
    <div
      ref={ref}
      className="parallax"
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {LAYERS.map((l) => (
        <span
          key={l.glyph}
          className="parallax__piece"
          aria-hidden="true"
          style={
            {
              '--depth': l.depth,
              top: l.top,
              left: l.left,
              fontSize: l.size,
            } as CSSProperties
          }
        >
          {l.glyph}
        </span>
      ))}
      <div className="parallax__name" style={{ '--depth': 0.11 } as CSSProperties}>
        <span className="parallax__coord">d4</span>
        <h2>Victor Jiang</h2>
      </div>
    </div>
  )
}
