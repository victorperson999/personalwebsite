import { Link } from '../router'
import './ProjectsDodeca.css'

/**
 * Ambient "Projects" dodecahedron for the home hero. A slow vertical turntable
 * spin (pure CSS) carries 12 pentagonal faces. The front (+Z) and back (−Z)
 * faces are a parallel pole-pair, so a "Projects" face swings to the viewer
 * every half-turn — you never wait a full rotation to see what it links to.
 * The other 10 faces carry the site's chess motif. Hover / focus pauses the
 * spin so the link is clickable; reduced motion stops it on a readable pose.
 */
type Face =
  | { kind: 'projects'; primary: boolean }
  | { kind: 'glyph'; glyph: string }

// Face 1 = front (+Z), face 2 = back (−Z) — the two parallel "Projects" faces.
// Faces 3–7 are the upper ring, 8–12 the lower ring (chess glyphs).
const FACES: Face[] = [
  { kind: 'projects', primary: true },
  { kind: 'projects', primary: false },
  { kind: 'glyph', glyph: '♞' },
  { kind: 'glyph', glyph: '♜' },
  { kind: 'glyph', glyph: '♚' },
  { kind: 'glyph', glyph: '♛' },
  { kind: 'glyph', glyph: '♝' },
  { kind: 'glyph', glyph: '♟' },
  { kind: 'glyph', glyph: '♞' },
  { kind: 'glyph', glyph: '♜' },
  { kind: 'glyph', glyph: '♛' },
  { kind: 'glyph', glyph: '♟' },
]

export default function ProjectsDodeca() {
  return (
    <div className="dodeca">
      <div className="dodeca__solid">
        {FACES.map((face, i) => (
          <div key={i} className={`dodeca__face dodeca__face--${i + 1}`}>
            {face.kind === 'projects' ? (
              <Link
                className="dodeca__link"
                to="/projects"
                // The back face is a visual duplicate — keep it clickable by
                // mouse but out of the tab order / a11y tree to avoid a second
                // identical link.
                aria-hidden={face.primary ? undefined : true}
                tabIndex={face.primary ? undefined : -1}
              >
                Projects
              </Link>
            ) : (
              <span className="dodeca__glyph" aria-hidden="true">
                {face.glyph}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
