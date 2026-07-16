import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import Logo from '../components/Logo'
import './Experience.css'

type Entry = {
  square: string
  col: number // 1 = a … 8 = h
  row: number // 1 … 8 (8 = top rank)
  role: string
  org: string
  period: string
  blurb: string
  note?: string
  links?: string[]
}

// The knight rests at a8, then makes 4 valid L-shaped hops onto these squares as
// you scroll (a8→b6→c4→e3→g2). Fill in the placeholders below.
const HOME = { col: 2, row: 8 }
const ENTRIES: Entry[] = [
  {
    square: 'c6',
    col: 3,
    row: 6,
    role: 'Software/Data Engineering Intern',
    org: 'Homega Indonesia',
    period: 'Jul 2026 — Present',
    blurb: 'Building a verified, AI-assisted database/distribution platform of motorcycle repair/spare-parts shops nationwide, cross-checking multiple data sources to score which listings are real, live, and callable. Using Claude API embedded to classify Google Street View evidence to cross-check shop verification.',
  },
  {
    square: 'b4',
    col: 2,
    row: 4,
    role: 'Local Freelance Website developer',
    org: 'Self-Employed',
    period: 'May 2026 - Present',
    blurb: 'Helped local users develop portfolio, personal, and professional websites:',
    links: [
      'https://topgradestutoring.ca/',
      'https://danielaxentii.com/',
      'https://valentinbujor.com/',
    ],
  },
  {
    square: 'd3',
    col: 4,
    row: 3,
    role: 'Lifeguard and Swim Instructor',
    org: 'Bradford Leisure Centre - Town  of Bradford West Gwillimbury',
    period: 'Jul 2022 — Jul 2023 (unofficial)',
    blurb: 'Part of the lifeguard pool team — communicated and coordinated continuously with fellow guards to keep patrons safe across the pool facilities, working as a team to maintain constant surveillance. Also instructed swimming techniques and water safety rules.',
    note: 'saved a drowning patron upon first week of employment, earned the black whistle.',
  },
  {
    square: 'f2',
    col: 6,
    row: 2,
    role: 'Produce Stocker',
    org: 'No Frills - George Weston Limited',
    period: 'Sep 2021 — Jun 2022',
    blurb: 'Responsible for keeping fresh produce stocked at No Frills grocery store, assisting customers, and being a team member',
  },
  {
    square: 'h1',
    col: 8,
    row: 1,
    role: 'Crew Member',
    org: 'Mucho Burrito - Fresh Mexican Grill',
    period: 'Jun 2020 — May 2021',
    blurb: 'My first part time job - I handled customer service, food preparation, and store logistics',
  },
]

// Square centre as a % of the board (row 8 is the top rank).
const squarePos = (col: number, row: number) => ({
  left: `${((col - 0.5) / 8) * 100}%`,
  top: `${((8 - row + 0.5) / 8) * 100}%`,
})

/**
 * Knight's-tour Experience page. The chessboard is pinned (sticky) while the
 * full-size career cards scroll past; whichever card is centred (tracked with an
 * Intersection Observer) becomes active, and the knight hops to its square.
 * Every card stays full and readable — only the active one is highlighted.
 */
export default function Experience() {
  const [active, setActive] = useState(-1)
  const entryRefs = useRef<(HTMLLIElement | null)[]>([])
  const intersecting = useRef<Set<number>>(new Set())

  // Drag-the-knight state. `drag` holds the live pointer position as a % of the
  // board while dragging (null otherwise);
  const boardRef = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)
  const [dropTarget, setDropTarget] = useState(-1)
  const draggingRef = useRef(false)
  const rafRef = useRef(0)
  const suppressObserver = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (records) => {
        for (const rec of records) {
          const idx = Number((rec.target as HTMLElement).dataset.index)
          if (rec.isIntersecting) intersecting.current.add(idx)
          else intersecting.current.delete(idx)
        }
        // While a drag-drop smooth-scrolls a card into view, keep the
        // intersecting set fresh but don't let the observer activate an
        // in-between card and yank the knight off course.
        if (suppressObserver.current) return
        if (intersecting.current.size === 0) return
        const mid = window.innerHeight / 2
        let best = -1
        let bestDist = Infinity
        for (const idx of intersecting.current) {
          const el = entryRefs.current[idx]
          if (!el) continue
          const r = el.getBoundingClientRect()
          const dist = Math.abs(r.top + r.height / 2 - mid)
          if (dist < bestDist) {
            bestDist = dist
            best = idx
          }
        }
        if (best !== -1) setActive(best)
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 1] },
    )
    for (const el of entryRefs.current) if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ----- Drag the knight to another square -----
  // Pointer → board cell, clamped to the board (so the knight can't be dragged
  // off the edge)
  function boardPointFromClient(clientX: number, clientY: number) {
    const board = boardRef.current
    if (!board) return null
    const rect = board.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left))
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top))
    const col = Math.min(8, Math.floor((x / rect.width) * 8) + 1)
    const row = Math.max(1, Math.min(8, 8 - Math.floor((y / rect.height) * 8)))
    return { xPct: (x / rect.width) * 100, yPct: (y / rect.height) * 100, col, row }
  }

  // Index of the entry sitting on a square, -1 if the square has no circle.
  const entryAt = (col: number, row: number) =>
    ENTRIES.findIndex((e) => e.col === col && e.row === row)

  function onKnightDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    draggingRef.current = true
    const p = boardPointFromClient(e.clientX, e.clientY)
    if (!p) return
    setDrag({ x: p.xPct, y: p.yPct })
    setDropTarget(entryAt(p.col, p.row))
  }

  function onKnightMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return
    const { clientX, clientY } = e
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const p = boardPointFromClient(clientX, clientY)
      if (!p) return
      setDrag({ x: p.xPct, y: p.yPct })
      setDropTarget(entryAt(p.col, p.row))
    })
  }

  function onKnightUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return
    draggingRef.current = false
    cancelAnimationFrame(rafRef.current)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* pointer already released */
    }
    const p = boardPointFromClient(e.clientX, e.clientY)
    const idx = p ? entryAt(p.col, p.row) : -1
    setDrag(null)
    setDropTarget(-1)
    // Valid drop on a different circle: activate that experience and bring its
    // card into view. Invalid drop just clears `drag`, so the knight springs
    // back to its current square it was on.
    if (idx !== -1 && idx !== active) {
      setActive(idx)
      // Pause the scroll observer until the programmatic scroll settles, so it
      // doesn't activate in-between cards and detour the knight mid-flight.
      suppressObserver.current = true
      const release = () => {
        suppressObserver.current = false
        window.removeEventListener('scrollend', release)
        clearTimeout(timer)
      }
      const timer = setTimeout(release, 1000)
      window.addEventListener('scrollend', release, { once: true })
      entryRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const knight = active >= 0 ? ENTRIES[active] : HOME

  return (
    <main className="exp">
      <Logo className="page-logo" />
      <header className="exp__head">
        <span className="exp__coord">d4</span>
        <h1 className="exp__title">Experience</h1>
        <p className="exp__intro">
          A knight's tour through the work so far — scroll to follow the path.
        </p>
      </header>

      <div className="exp__stage">
        <div className="exp__board-col">
          <div className="exp__board-wrap">
            <div className="exp__ranks" aria-hidden="true">
              {[8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>

            <div className="exp__board" ref={boardRef}>
              <div className="exp__grid" aria-hidden="true">
                {Array.from({ length: 64 }).map((_, i) => {
                  const col = (i % 8) + 1
                  const row = 8 - Math.floor(i / 8)
                  // Light squares (the lit ones) are where col+row is odd, so
                  // h1 (bottom-right) is light — standard white's-POV board.
                  const light = (col + row) % 2 === 1
                  return <div key={i} className={`exp__sq${light ? ' is-light' : ''}`} />
                })}
              </div>

              {ENTRIES.map((e, i) => (
                <span
                  key={e.square}
                  className={`exp__marker${active === i ? ' is-active' : ''}${
                    dropTarget === i ? ' is-target' : ''
                  }`}
                  style={squarePos(e.col, e.row)}
                  aria-hidden="true"
                />
              ))}

              <div
                className={`exp__knight${drag ? ' is-dragging' : ''}`}
                style={
                  drag
                    ? { left: `${drag.x}%`, top: `${drag.y}%` }
                    : squarePos(knight.col, knight.row)
                }
                onPointerDown={onKnightDown}
                onPointerMove={onKnightMove}
                onPointerUp={onKnightUp}
                onPointerCancel={onKnightUp}
                aria-hidden="true"
              >
                ♞
              </div>
            </div>

            <div className="exp__files" aria-hidden="true">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        <ol className="exp__entries">
          {ENTRIES.map((e, i) => (
            <li
              key={i}
              ref={(el) => {
                entryRefs.current[i] = el
              }}
              data-index={i}
              data-active={active === i}
              className="exp__entry"
            >
              <article className="exp__card">
                <span className="exp__card-square">{e.square}</span>
                <h2 className="exp__card-role">{e.role}</h2>
                <p className="exp__card-org">
                  {e.org} · {e.period}
                </p>
                <p className="exp__card-blurb">{e.blurb}</p>
                {e.note && (
                  <p className="exp__card-note">
                    <strong>Notable achievement:</strong> {e.note}
                  </p>
                )}
                {e.links && e.links.length > 0 && (
                  <ul className="exp__card-links">
                    {e.links.map((url) => (
                      <li key={url}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
