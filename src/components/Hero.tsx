import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useReducedMotion } from '../hooks'
import { carouselCenter, type Slot } from '../carousel'
import ContactFlip from './ContactFlip'
import ProjectsDodeca from './ProjectsDodeca'
import ExperiencePrism from './ExperiencePrism'
import AboutCard from './AboutCard'
import CornerSlider from './CornerSlider'
import Logo from './Logo'
import './Hero.css'

/**
 * Home hero — a dark, chess-themed parallax field. Piece glyphs drift by a
 * normalized pointer offset scaled per layer (`--shift`). Four objects sit in
 * the four corners; the slider under the name (value `t`) rotates them around
 * the perimeter — each object is placed in a `.hero__slot` whose position Hero
 * computes from `t`, while the object keeps its own spin/tilt transform.
 */
type Piece = { glyph: string; top: string; left: string; shift: string; size: string }

// Closer pieces (larger glyph) drift more; all kept clear of the center so the
// name stays legible.
const PIECES: Piece[] = [
  { glyph: '♞', top: '15%', left: '11%', shift: '16px', size: '4rem' },
  { glyph: '♜', top: '19%', left: '83%', shift: '13px', size: '3.4rem' },
  { glyph: '♚', top: '12%', left: '52%', shift: '10px', size: '2.6rem' },
  { glyph: '♟', top: '49%', left: '7%', shift: '7px', size: '2.1rem' },
  { glyph: '♝', top: '72%', left: '16%', shift: '12px', size: '3rem' },
  { glyph: '♛', top: '75%', left: '81%', shift: '18px', size: '4.2rem' },
  { glyph: '♟', top: '87%', left: '49%', shift: '6px', size: '2rem' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  // Carousel state: t ∈ [0,3] (slider), and whether it's mid-drag (to disable
  // the slot transition so objects track the handle in real time).
  const [t, setT] = useState(0)
  const [dragging, setDragging] = useState(false)

  function onMove(e: ReactPointerEvent<HTMLElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--px', `${clamp(nx)}`)
      el.style.setProperty('--py', `${clamp(ny)}`)
    })
  }

  function reset() {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--px', '0')
    el.style.setProperty('--py', '0')
  }

  // Position (% of hero) for an object given its home corner and the slider.
  function slotStyle(home: Slot): CSSProperties {
    const c = carouselCenter(home, t)
    return { left: `${c.x}%`, top: `${c.y}%` }
  }

  return (
    <section ref={ref} className="hero" onPointerMove={onMove} onPointerLeave={reset}>
      {PIECES.map((p, i) => (
        <span
          key={`${p.glyph}-${i}`}
          className="hero__piece"
          aria-hidden="true"
          style={
            {
              '--shift': p.shift,
              top: p.top,
              left: p.left,
              fontSize: p.size,
            } as CSSProperties
          }
        >
          {p.glyph}
        </span>
      ))}

      {/* Four corner objects — home slots: About=TL(0), Prism=TR(1),
          Contact=BR(2), Dodeca=BL(3). */}
      <div className="hero__slot" data-dragging={dragging} style={slotStyle(0)}>
        <AboutCard />
      </div>
      <div className="hero__slot" data-dragging={dragging} style={slotStyle(1)}>
        <ExperiencePrism />
      </div>
      <div className="hero__slot" data-dragging={dragging} style={slotStyle(2)}>
        <ContactFlip />
      </div>
      <div className="hero__slot" data-dragging={dragging} style={slotStyle(3)}>
        <ProjectsDodeca />
      </div>

      <div className="hero__center">
        <div className="hero__name" style={{ '--shift': '28px' } as CSSProperties}>
          <span className="hero__coord">c4</span>
          <h1>Victor Jiang</h1>
        </div>
        <CornerSlider value={t} onChange={setT} onDraggingChange={setDragging} />
        <Logo className="hero__logo" />
      </div>
    </section>
  )
}
