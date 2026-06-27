import './lab.css'
import TiltNamePlate from './TiltNamePlate'
import ParallaxField from './ParallaxField'
import AmbientObject from './AmbientObject'
import FlipReveal from './FlipReveal'

/**
 * 3D experiments gallery. Reachable at /#lab (see src/main.tsx). Each stage is
 * a self-contained hero candidate — pick a direction and the rest get deleted.
 */
type Stage = {
  coord: string
  title: string
  caption: string
  node: React.ReactNode
}

const STAGES: Stage[] = [
  {
    coord: 'a1',
    title: 'Tilt name plate',
    caption: 'Slab tilts toward the cursor; name floats in depth with a moving highlight.',
    node: <TiltNamePlate />,
  },
  {
    coord: 'b2',
    title: 'Parallax field',
    caption: 'Chess pieces drift at different depths behind the name as you move.',
    node: <ParallaxField />,
  },
  {
    coord: 'c3',
    title: 'Ambient object',
    caption: 'Slow auto-rotating cube as a centerpiece — hover to pause and read a face.',
    node: <AmbientObject />,
  },
  {
    coord: 'd4',
    title: 'Flip reveal',
    caption: 'Front shows the name; flips to contact links on hover, tap or Enter.',
    node: <FlipReveal />,
  },
]

export default function Lab() {
  return (
    <main className="lab">
      <header className="lab__head">
        <p className="lab__eyebrow">3D Lab · pick a direction</p>
        <h1 className="lab__title">Hero experiments</h1>
        <p className="lab__note">
          Four isolated 3D prototypes for the landing hero. Move your pointer over
          each. <a href="/">← live site</a>
        </p>
      </header>

      <section className="lab__grid">
        {STAGES.map((s) => (
          <article key={s.coord} className="lab__stage">
            <div className="lab__bar">
              <span className="lab__coord">{s.coord}</span>
              <div>
                <h2 className="lab__stageTitle">{s.title}</h2>
                <p className="lab__caption">{s.caption}</p>
              </div>
            </div>
            <div className="lab__canvas">{s.node}</div>
          </article>
        ))}
      </section>
    </main>
  )
}
