import { type PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from '../hooks'
import { Link } from '../router'
import portrait from '../assets/IMG_4896.jpg'
import './AboutCard.css'

/**
 * Ambient "About" object — bottom-left of the home hero. A holographic player
 * card that tilts toward the cursor with a moving foil sheen; carries a "VJ"
 * monogram crest. Links to /about. Reduced motion keeps it flat and still.
 */
export default function AboutCard() {
  const reduced = useReducedMotion()

  function onMove(e: ReactPointerEvent<HTMLAnchorElement>) {
    if (reduced) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - py) * 16}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 16}deg`)
  }

  function reset(e: ReactPointerEvent<HTMLAnchorElement>) {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
  }

  return (
    <Link
      to="/about"
      className="aboutcard"
      aria-label="About — view profile"
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div className="aboutcard__inner">
        <div className="aboutcard__foil" aria-hidden="true" />
        <div className="aboutcard__shine" aria-hidden="true" />
        <div className="aboutcard__content">
          <span className="aboutcard__coord">a8</span>
          <img className="aboutcard__portrait" src={portrait} alt="Victor Jiang" />
          <span className="aboutcard__name">Victor Jiang</span>
          <span className="aboutcard__title">Software Engineer</span>
          <span className="aboutcard__cta">About →</span>
        </div>
      </div>
    </Link>
  )
}
