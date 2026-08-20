/**
 * Tiny 8x8 pixel glyphs for the skill list, drawn inline so no extra
 * request is made. `kind` is picked per skill in skillIcons.ts.
 */
export type IconKind =
  | 'braces'
  | 'type'
  | 'hash'
  | 'database'
  | 'atom'
  | 'triangle'
  | 'leaf'
  | 'server'
  | 'container'
  | 'key'
  | 'doc'
  | 'scan'
  | 'brain'
  | 'branch'
  | 'gear'
  | 'cloud'
  | 'bug'
  | 'shield'
  | 'pen'
  | 'board'
  | 'window'
  | 'terminal'

const P = (x: number, y: number, w = 1, h = 1, fill = 'currentColor') => ({ x, y, w, h, fill })

const GLYPHS: Record<IconKind, ReturnType<typeof P>[]> = {
  // { }
  braces: [P(2, 0, 2), P(1, 1), P(1, 2), P(0, 3, 2), P(1, 4), P(1, 5), P(2, 6, 2),
    P(4, 0, 2), P(6, 1), P(6, 2), P(6, 3, 2), P(6, 4), P(6, 5), P(4, 6, 2)],
  // T
  type: [P(0, 1, 8, 2), P(3, 3, 2, 4)],
  // #
  hash: [P(2, 0, 1, 8), P(5, 0, 1, 8), P(0, 2, 8, 1), P(0, 5, 8, 1)],
  // stacked disks
  database: [P(1, 0, 6, 2), P(1, 3, 6, 2), P(1, 6, 6, 2)],
  // orbit
  atom: [P(3, 3, 2, 2), P(0, 3, 1, 2), P(7, 3, 1, 2), P(3, 0, 2, 1), P(3, 7, 2, 1),
    P(1, 1), P(6, 1), P(1, 6), P(6, 6)],
  // ▲
  triangle: [P(3, 1, 2), P(2, 2, 4), P(1, 3, 6), P(1, 4, 6), P(0, 5, 8), P(0, 6, 8)],
  // leaf
  leaf: [P(4, 0, 3), P(3, 1, 4), P(2, 2, 5), P(2, 3, 4), P(1, 4, 4), P(1, 5, 2), P(0, 6, 2)],
  // rack
  server: [P(0, 0, 8, 3), P(0, 4, 8, 3), P(6, 1), P(6, 5)],
  // box
  container: [P(0, 1, 8, 1), P(0, 2, 1, 5), P(7, 2, 1, 5), P(0, 7, 8, 1), P(2, 3, 4, 2)],
  // key
  key: [P(0, 2, 3, 3), P(3, 3, 5, 1), P(6, 4, 1, 2), P(4, 4, 1, 1)],
  // page
  doc: [P(1, 0, 6, 8), P(2, 2, 4, 1, 'var(--color-paper)'), P(2, 4, 4, 1, 'var(--color-paper)'),
    P(2, 6, 3, 1, 'var(--color-paper)')],
  // scanner beam
  scan: [P(0, 0, 2, 1), P(6, 0, 2, 1), P(0, 1, 1, 1), P(7, 1, 1, 1),
    P(0, 3, 8, 2), P(0, 6, 1, 1), P(7, 6, 1, 1), P(0, 7, 2, 1), P(6, 7, 2, 1)],
  // chip / brain
  brain: [P(2, 2, 4, 4), P(0, 3, 2, 1), P(0, 5, 2, 1), P(6, 3, 2, 1), P(6, 5, 2, 1),
    P(3, 0, 1, 2), P(5, 0, 1, 2), P(3, 6, 1, 2), P(5, 6, 1, 2)],
  // git branch
  branch: [P(1, 0, 2, 2), P(1, 6, 2, 2), P(5, 3, 2, 2), P(1, 2, 2, 4), P(3, 4, 2, 1)],
  // gear
  gear: [P(2, 0, 4, 1), P(1, 1, 6, 6), P(2, 7, 4, 1), P(0, 2, 1, 4), P(7, 2, 1, 4),
    P(3, 3, 2, 2, 'var(--color-paper)')],
  // cloud
  cloud: [P(2, 2, 4, 2), P(1, 4, 6, 2), P(0, 5, 8, 2)],
  // bug
  bug: [P(2, 1, 4, 6), P(0, 2, 2, 1), P(6, 2, 2, 1), P(0, 5, 2, 1), P(6, 5, 2, 1),
    P(2, 0, 1, 1), P(5, 0, 1, 1)],
  // shield
  shield: [P(1, 0, 6, 5), P(2, 5, 4, 1), P(3, 6, 2, 1)],
  // pen
  pen: [P(5, 0, 3, 3), P(3, 2, 3, 3), P(1, 4, 3, 3), P(0, 6, 2, 2)],
  // board / kanban
  board: [P(0, 0, 8, 1), P(0, 1, 1, 6), P(7, 1, 1, 6), P(0, 7, 8, 1),
    P(2, 2, 1, 4), P(4, 2, 1, 3), P(6, 2, 1, 5)],
  // window
  window: [P(0, 0, 8, 2), P(0, 2, 1, 6), P(7, 2, 1, 6), P(0, 7, 8, 1), P(6, 0, 1, 1, 'var(--color-paper)')],
  // >_
  terminal: [P(0, 0, 8, 1), P(0, 7, 8, 1), P(0, 1, 1, 6), P(7, 1, 1, 6),
    P(2, 3, 1, 1), P(3, 4, 1, 1), P(2, 5, 1, 1), P(4, 5, 2, 1)],
}

export function SkillIcon({ kind }: { kind: IconKind }) {
  return (
    <svg className="skill-icon" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      {GLYPHS[kind].map((cell, index) => (
        <rect key={index} x={cell.x} y={cell.y} width={cell.w} height={cell.h} fill={cell.fill} />
      ))}
    </svg>
  )
}
