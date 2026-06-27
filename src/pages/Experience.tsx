import { useEffect, useRef, useState } from 'react'
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
}

// The knight rests at a8, then makes 4 valid L-shaped hops onto these squares as
// you scroll (a8→b6→c4→e3→g2). Fill in the placeholders below.
const HOME = { col: 1, row: 8 }
const ENTRIES: Entry[] = [
  {
    square: 'b6',
    col: 2,
    row: 6,
    role: 'Role title',
    org: 'Company',
    period: '2024 — Present',
    blurb: 'Short description of what you did here — replace this placeholder.',
  },
  {
    square: 'c4',
    col: 3,
    row: 4,
    role: 'Role title',
    org: 'Company',
    period: '2022 — 2024',
    blurb: 'Short description of what you did here — replace this placeholder.',
  },
  {
    square: 'e3',
    col: 5,
    row: 3,
    role: 'Role title',
    org: 'Company',
    period: '2021 — 2022',
    blurb: 'Short description of what you did here — replace this placeholder.',
  },
  {
    square: 'g2',
    col: 7,
    row: 2,
    role: 'Role title',
    org: 'Company',
    period: '2020 — 2021',
    blurb: 'Short description of what you did here — replace this placeholder.',
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

  useEffect(() => {
    const obs = new IntersectionObserver(
      (records) => {
        for (const rec of records) {
          const idx = Number((rec.target as HTMLElement).dataset.index)
          if (rec.isIntersecting) intersecting.current.add(idx)
          else intersecting.current.delete(idx)
        }
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

            <div className="exp__board">
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
                  className={`exp__marker${active === i ? ' is-active' : ''}`}
                  style={squarePos(e.col, e.row)}
                  aria-hidden="true"
                />
              ))}

              <div
                className="exp__knight"
                style={squarePos(knight.col, knight.row)}
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
              </article>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
