import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from 'react'

/**
 * Minimal History-API router — no dependencies. `usePath` re-renders on browser
 * back/forward (popstate) and on our own client-side navigations; `navigate`
 * pushes a new URL; `Link` is an anchor that navigates without a full reload
 * but still behaves like a real link (modifier/middle-click open normally).
 */
const LOCATION_CHANGE = 'locationchange'

export function usePath(): string {
  const [path, setPath] = useState(() => normalize(window.location.pathname))

  useEffect(() => {
    const onChange = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', onChange)
    window.addEventListener(LOCATION_CHANGE, onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener(LOCATION_CHANGE, onChange)
    }
  }, [])

  return path
}

export function navigate(to: string) {
  if (normalize(to) === normalize(window.location.pathname)) return
  window.history.pushState({}, '', to)
  // pushState doesn't fire popstate, so notify listeners ourselves.
  window.dispatchEvent(new Event(LOCATION_CHANGE))
  window.scrollTo(0, 0)
}

// Strip a trailing slash so "/projects" and "/projects/" match (but keep "/").
function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

type LinkProps = { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>

export function Link({ to, onClick, ...rest }: LinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    // Let the browser handle new-tab / new-window / modified clicks normally.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...rest} />
}
