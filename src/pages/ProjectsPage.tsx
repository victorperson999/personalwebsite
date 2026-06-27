import Logo from '../components/Logo'
import ProjectsGallery from '../components/ProjectsGallery'
import './ProjectsPage.css'

/**
 * Standalone Projects page at `/projects`. "The Arsenal" — a 3D rotating gallery
 * where each project is cast as a chess piece (see ProjectsGallery).
 */
export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <Logo className="page-logo" />
      <header className="projects-page__head">
        <span className="projects-page__coord">e4</span>
        <h1 className="projects-page__title">Projects</h1>
        <p className="projects-page__note">
          The board — each project a piece. Click any to explore.
        </p>
      </header>
      <ProjectsGallery />
    </main>
  )
}
