import Hero from '../components/Hero'

/** Home page at `/` — the hero (parallax field, name, dodecahedron, contact). */
export default function Home() {
  return (
    <main className="page">
      <Hero />
      {/* More home sections (about, contact) can go here later. */}
    </main>
  )
}
