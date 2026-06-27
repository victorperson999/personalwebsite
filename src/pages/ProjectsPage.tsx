import { Link } from '../router'
import './ProjectsPage.css'

/**
 * Standalone Projects page at `/projects`. Placeholder scaffold for now — the
 * actual project listing gets added here.
 */
export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <header className="projects-page__head">
        <Link to="/" className="projects-page__back">
          ← Victor Jiang
        </Link>
        <span className="projects-page__coord">e4</span>
        <h1 className="projects-page__title">Projects</h1>
        <p className="projects-page__note">
          Selected work — coming soon.
        </p>
      </header>
    </main>
  )
}
