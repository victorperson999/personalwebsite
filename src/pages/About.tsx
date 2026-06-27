import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import dataphoto from '../assets/dataintense.webp'
import './About.css'

/**
 * About page at /about. Two columns: an image carousel on the left (arrow keys
 * or the ‹ › buttons cycle through the photos) and plain bio text on the right.
 * To grow the gallery, import more files and add them to IMAGES.
 */
type Photo = { src: string; alt: string }

const IMAGES: Photo[] = [
  { src: dataphoto, alt: 'Victor Jiang' },
  // Add more here, e.g. { src: anotherImg, alt: '...' },
]

export default function About() {
  const [i, setI] = useState(0)
  const n = IMAGES.length

  // Arrow keys move the carousel while the About page is mounted.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setI((p) => (p - 1 + n) % n)
      else if (e.key === 'ArrowRight') setI((p) => (p + 1) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  return (
    <main className="about-page">
      <Logo className="page-logo" />
      <header className="about-page__head">
        <span className="about-page__coord">a8</span>
      </header>

      <div className="about-page__body">
        {/* Left: image carousel */}
        <section
          className="about-gallery"
          aria-roledescription="carousel"
          aria-label="Photos"
        >
          <div className="about-gallery__frame">
            {IMAGES.map((img, idx) => (
              <img
                key={idx}
                className={`about-gallery__img${idx === i ? ' is-active' : ''}`}
                src={img.src}
                alt={img.alt}
                aria-hidden={idx !== i}
                draggable={false}
              />
            ))}
            <button
              className="about-gallery__arrow about-gallery__arrow--prev"
              type="button"
              aria-label="Previous image"
              disabled={n <= 1}
              onClick={() => setI((p) => (p - 1 + n) % n)}
            >
              ‹
            </button>
            <button
              className="about-gallery__arrow about-gallery__arrow--next"
              type="button"
              aria-label="Next image"
              disabled={n <= 1}
              onClick={() => setI((p) => (p + 1) % n)}
            >
              ›
            </button>
          </div>
          <p className="about-gallery__count" aria-live="polite">
            {i + 1} / {n}
          </p>
        </section>

        {/* Right: bio text (no card — just text) */}
        <section className="about-bio">
          <p>
            Hey! Welcome to my bio
          </p>
          <p>
            I was born in Brooklyn, New York and immigrated to Canada at a young age. Currenly residing in the Greater Toronto Area.
          </p>
          <p>
            I'm currently enrolled at the University of Toronto Studying Computer Science, Statistics, and Math.
          </p>
          <p>
            I am always interested in learning and trying new things, and currently interested in building products the better the lives of others.
          </p>
          <p>
            Some hobbies of mine are playing chess (kind of obvious at this point), building applications that interest me, helping others, playing Counter-Strike, and reading. If you've made it this far, feel free to contact me!
          </p>
          <p>(I'm adding more images later)</p>

        </section>
      </div>
    </main>
  )
}
