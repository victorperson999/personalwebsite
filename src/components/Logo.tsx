import { Link } from '../router'
import './Logo.css'

/**
 * VJ monogram (the site's logo / favicon mark). Always links to home — shown
 * below the hero slider and pinned top-left on the inner pages as the way back.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo${className ? ` ${className}` : ''}`}
      aria-label="Victor Jiang — home"
    >
      <img className="logo__img" src="/logo.svg" alt="" width="40" height="40" />
    </Link>
  )
}
