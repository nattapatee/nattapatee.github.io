/** Placeholder tiles shown for a beat while the real page takes over from the intro. */
export function SkeletonPage() {
  return (
    <div className="gb-skeleton" aria-hidden="true">
      <div className="gb-skeleton-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="gb-skeleton-tile" key={index} />
        ))}
      </div>
    </div>
  )
}
