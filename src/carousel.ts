// Corner-carousel math (verified with a second pass). Four objects sit at the
// four corners; a slider value t ∈ [0,3] rotates them around the perimeter.
// Lerping between *consecutive* corners always traces a rectangle edge (never a
// diagonal), so the objects glide along the sides as they rotate.

export type Slot = 0 | 1 | 2 | 3

type Corner = { x: number; y: number }

// Corner CENTRES as % of the hero, in clockwise/perimeter order TL→TR→BR→BL.
// Center-based so objects of different sizes all anchor cleanly.
export const CORNERS: readonly [Corner, Corner, Corner, Corner] = [
  { x: 14, y: 20 }, // 0 — top-left
  { x: 86, y: 20 }, // 1 — top-right
  { x: 86, y: 80 }, // 2 — bottom-right
  { x: 14, y: 80 }, // 3 — bottom-left
]

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v))
}

function mod4(v: number): Slot {
  return (((v % 4) + 4) % 4) as Slot
}

/** Pointer x → slider value t ∈ [0,3] across the 4 evenly-spaced dots. */
export function dragXToT(clientX: number, trackLeft: number, trackWidth: number): number {
  if (trackWidth <= 0) return 0
  return clamp(((clientX - trackLeft) / trackWidth) * 3, 0, 3)
}

/** Nearest dot — used to snap on release. */
export function snapT(t: number): Slot {
  return clamp(Math.round(t), 0, 3) as Slot
}

/**
 * An object's centre (% of hero) for its home slot at slider value t. The
 * object moves from corner (home+⌊t⌋) toward the next corner by the fraction
 * of t, i.e. along one perimeter edge.
 */
export function carouselCenter(home: Slot, tInput: number): { x: number; y: number } {
  const t = clamp(tInput, 0, 3)
  const whole = Math.floor(t)
  const frac = t - whole
  const base = CORNERS[mod4(home + whole)]
  const next = CORNERS[mod4(home + whole + 1)]
  return {
    x: base.x + (next.x - base.x) * frac,
    y: base.y + (next.y - base.y) * frac,
  }
}
