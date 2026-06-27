import {
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { clamp, dragXToT, snapT } from '../carousel'
import './CornerSlider.css'

type Props = {
  value: number
  onChange: (t: number) => void
  onDraggingChange?: (dragging: boolean) => void
}

const DOTS = [0, 1, 2, 3]

/**
 * The carousel control under the name: a track line with ‹ › arrowheads, 4 dots
 * (one per corner), and a square handle. Drag (or arrow-keys) sets t ∈ [0,3];
 * the parent rotates the four corner objects from it. Snaps to the nearest dot
 * on release. Updates are rAF-batched so dragging stays smooth.
 */
export default function CornerSlider({ value, onChange, onDraggingChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const liveT = useRef(value) // latest value during a drag, read on release

  function updateFromPointer(clientX: number) {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const t = dragXToT(clientX, rect.left, rect.width)
    liveT.current = t
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => onChange(t))
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    onDraggingChange?.(true)
    updateFromPointer(e.clientX)
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.buttons === 0) return // only while the handle is held
    updateFromPointer(e.clientX)
  }
  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    cancelAnimationFrame(frame.current)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    onDraggingChange?.(false)
    onChange(snapT(liveT.current))
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      onChange(snapT(value + 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      onChange(snapT(value - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      onChange(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      onChange(3)
    }
  }

  const handlePct = (clamp(value, 0, 3) / 3) * 100

  return (
    <div
      ref={trackRef}
      className="cslider"
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={3}
      aria-valuenow={Math.round(clamp(value, 0, 3))}
      aria-label="Rotate the home-page objects between corners"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <span className="cslider__arrow cslider__arrow--left" aria-hidden="true">‹</span>
      <span className="cslider__arrow cslider__arrow--right" aria-hidden="true">›</span>
      <span className="cslider__line" aria-hidden="true" />
      {DOTS.map((d) => (
        <span
          key={d}
          className="cslider__dot"
          style={{ left: `${(d / 3) * 100}%` }}
          aria-hidden="true"
        />
      ))}
      <span
        className="cslider__handle"
        style={{ left: `${handlePct}%` }}
        aria-hidden="true"
      />
    </div>
  )
}
