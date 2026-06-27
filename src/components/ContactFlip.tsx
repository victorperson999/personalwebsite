import {
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import './ContactFlip.css'

// ─── EDIT THESE THREE with your real details ────────────────────────────────
const CONTACTS = {
  email: 'victorjchess9@gmail.com',
  linkedin: 'https://www.linkedin.com/in/victor-jiang-722289280/',
  github: 'https://github.com/victorperson999',
}
// ────────────────────────────────────────────────────────────────────────────

/**
 * Bottom-right "Contact" flip card on the home hero. Front shows the label;
 * flips to email / LinkedIn / GitHub. Mouse hover flips; touch and keyboard
 * (Enter / Space) toggle. Reduced motion makes the swap instant.
 */
export default function ContactFlip() {
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
      className="contact"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Contact — flip to reveal email, LinkedIn and GitHub"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={onKeyDown}
    >
      <div className={`contact__inner${flipped ? ' is-flipped' : ''}`}>
        <div className="contact__face contact__front">
          <span className="contact__coord">h1</span>
          <span className="contact__label">Contact</span>
          <span className="contact__hint">Hover · tap</span>
        </div>
        <div
          className="contact__face contact__back"
          onClick={(e) => e.stopPropagation()}
        >
          <a href={`mailto:${CONTACTS.email}`}>Email</a>
          <a href={CONTACTS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={CONTACTS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
