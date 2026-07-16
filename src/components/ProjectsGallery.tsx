import mapsImg from '../assets/maps.webp';
import paintImg from '../assets/painting.webp';
import simulImg from '../assets/simulation.webp';
import plusImg from '../assets/paint++.webp';
import shellImg from '../assets/shell.webp';
import vestibuleImg from '../assets/vestibule.webp'
import './ProjectsGallery.css'

/**
 * "The Board" — the projects grid. Every project is visible at once as a card,
 * each cast as the chess piece that fits its character (flagship → queen, clever
 * → knight, foundational → rook, focused → bishop, early → pawn). Cards with a
 * `href` are links; the rest read as "Coming soon". Chosen over a 3D gallery so
 * visitors can scan and reach everything immediately (the home hero already
 * carries the 3D motif).
 */
type Project = {
  title: string
  piece: string
  pieceName: string
  blurb: string
  image?: string
  tags: string[]
  github?: string
  link?: string
}

const PROJECTS: Project[] = [
  {
    title: 'Vestibule (In process)',
    piece: '♚',
    pieceName: '',
    blurb:
      'A local, kernel-isolated code-execution sandbox for AI agents, exposed as an MCP server — run untrusted agent-generated code in a sealed chamber on your own machine: no cloud (E2B, AWS), no fees, nothing sent to a third party service.',
    image: vestibuleImg,
    tags: ['Python', 'MCP', 'AI Agents', 'Sandboxing', 'Linux Namespaces', 'Security'],
    github: 'https://github.com/victorperson999/Vestibule',
  },
  {
    title: 'AI Destination Itinerary Generator',
    piece: '♛',
    pieceName: '',
    blurb:
      'Full-stack web app that turns "where should I go?" into an AI-assisted, geographically optimized day-by-day trip plan.',
    image: mapsImg,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Gemini AI', 'Algorithms'],
    github: 'https://github.com/victorperson999/Destination-Itinerary-Generator',
  },
  {
    title: 'Machine Learning Painting Classifier',
    piece: '♞',
    pieceName: '',
    blurb:
      'Machine-learning classifier that predicts viewer responses to three famous paintings — a 322-feature Logistic Regression with a dependency-free, NumPy-only inference pipeline.',
    image: paintImg,
    tags: ['Machine Learning', 'Python', "Pandas", "Scikit-learn","Matplotlib"],
    github: 'https://github.com/victorperson999/3-Paintings-Classifier'
  },
  {
    title: 'Bias-Variance Tradeoff Explorer',
    piece: '♜',
    pieceName: '',
    blurb:
      'An R package + interactive Shiny app that visualizes the bias–variance tradeoff in real time — decomposing model error via Monte Carlo simulation across polynomial-regression and k-NN complexity.',
    image: simulImg,
    tags: ['R', 'Shiny', 'plotly', 'Monte Carlo', 'Statistics'],
    github: 'https://github.com/Euswbnix/AKMproject',
    link: 'https://019cea29-16b6-3560-2cce-56feb47d4a51.share.connect.posit.cloud/'
  },
  {
    title: 'Paint++',
    piece: '♝',
    pieceName: '',
    blurb:
      'A modern, Clean-Architecture reimagining of Microsoft Paint — a Java desktop app for drawing and editing images, with Supabase-backed login that saves your past canvases.',
    image: plusImg,
    tags: ['Java', 'Supabase', 'Agile', 'SOLID', 'Clean Architecture'],
    github: 'https://github.com/fcorbin567/paintplusplus'
  },
  {
    title: 'Mysh',
    piece: '♟',
    pieceName: '',
    blurb: 'A UNIX Shell written in C',
    image: shellImg,
    tags: ['C', 'UNIX','Algorithms', 'Systems programming'],
    github: 'https://github.com/victorperson999/mysh'
  },
]

function Card({ p }: { p: Project }) {
  return (
    <>
      {p.github && (
        <a
          className="pgrid__github"
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.title} on GitHub`}
        >
          <svg viewBox="0 0 16 16" width="28" height="28" aria-hidden="true" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      )}
      <span className="pgrid__piece" aria-hidden="true">
        {p.piece}
      </span>
      <span className="pgrid__piece-name">{p.pieceName}</span>
      <h3 className="pgrid__title">{p.title}</h3>
      <p className="pgrid__blurb">{p.blurb}</p>
      {p.image ? (
        <div className="pgrid__media pgrid__media--photo">
          <img className="pgrid__img" src={p.image} alt={p.title} loading="lazy" />
        </div>
      ) : (
        <div className="pgrid__media pgrid__media--placeholder" aria-hidden="true">
          <span>image</span>
        </div>
      )}
      <ul className="pgrid__tags">
        {p.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {p.link && (
        <a
          className="pgrid__link"
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo →
        </a>
      )}
    </>
  )
}

export default function ProjectsGallery() {
  return (
    <ul className="pgrid" aria-label="Projects">
      {PROJECTS.map((p, i) => (
        <li key={i} className="pgrid__cell">
          <article className="pgrid__card">
            <Card p={p} />
          </article>
        </li>
      ))}
    </ul>
  )
}
