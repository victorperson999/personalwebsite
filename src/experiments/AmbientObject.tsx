/**
 * Experiment #3 — ambient rotating object.
 * A slow auto-spinning CSS cube as an ambient centerpiece; faces carry the
 * name, role and chess motifs. Hover to pause and read a face; the spin is
 * driven by a CSS keyframe so it stops cleanly under reduced motion.
 */
export default function AmbientObject() {
  return (
    <div className="cube">
      <div className="cube__box">
        <div className="cube__face cube__face--front">
          <span className="cube__coord">a1</span>
          <strong>VJ</strong>
        </div>
        <div className="cube__face cube__face--back cube__face--glyph">♞</div>
        <div className="cube__face cube__face--right cube__face--name">
          Victor
          <br />
          Jiang
        </div>
        <div className="cube__face cube__face--left cube__face--role">
          Software
          <br />
          engineer
        </div>
        <div className="cube__face cube__face--top cube__face--glyph">♜</div>
        <div className="cube__face cube__face--bottom cube__face--glyph">♚</div>
      </div>
    </div>
  )
}
