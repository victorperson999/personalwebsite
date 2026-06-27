import {
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

/**
 * Experiment #4 — 3D flip / reveal.
 * Name on the front, contact links on the back. Mouse hover flips it; touch and
 * keyboard (Enter / Space) toggle it. Reduced motion makes the swap instant.
 */
export default function FlipReveal() {
  const [flipped, setFlipped] = useState(false)

  function onEnter(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse') setFlipped(true)
  }
  function onLeave(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse') setFlipped(false)
  }
  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setFlipped((f) => !f)
    }
  }

  return (
    <div
      className="flip"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Victor Jiang — flip card to reveal contact links"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={onKeyDown}
    >
      <div className={`flip__inner${flipped ? ' is-flipped' : ''}`}>
        <div className="flip__face flip__front">
          <span className="flip__coord">e4</span>
          <h2>Victor Jiang</h2>
          <p>Software engineer</p>
          <span className="flip__hint">Hover · tap · Enter</span>
        </div>
        <div
          className="flip__face flip__back"
          onClick={(e) => e.stopPropagation()}
        >
          <a href="mailto:victorjchess9@gmail.com">Email</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
