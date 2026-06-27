import Logo from '../components/Logo'
import './ProjectsPage.css'

/**
 * Standalone Projects page at `/projects`. Placeholder scaffold for now — the
 * actual project listing gets added here.
 */
export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <Logo className="page-logo" />
      <header className="projects-page__head">
        <span className="projects-page__coord">e4</span>
        <h1 className="projects-page__title">Projects</h1>
        <p className="projects-page__note">
          Selected work — coming soon.
        </p>
      </header>
    </main>
  )
}
