import Logo from '../components/Logo'
import './About.css'

/**
 * Standalone About page at /about. Placeholder scaffold for now — the real
 * about content (holographic profile / story) gets built out here later.
 */
export default function About() {
  return (
    <main className="about-page">
      <Logo className="page-logo" />
      <header className="about-page__head">
        <span className="about-page__coord">a8</span>
        <h1 className="about-page__title">About</h1>
        <p className="about-page__note">More about me — coming soon.</p>
      </header>
    </main>
  )
}
