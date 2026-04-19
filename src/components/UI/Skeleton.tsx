export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`animate-pulse rounded-xl bg-(--card-bg) ${className}`}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl border border-(--card-border) bg-(--card-bg) p-4">
      <div className="mb-4 aspect-square w-full rounded-2xl bg-black/50" />
      <div className="mb-2 h-3 w-16 rounded bg-black/30" />
      <div className="mb-2 h-5 w-3/4 rounded bg-black/30" />
      <div className="mb-4 h-6 w-20 rounded bg-black/30" />
      <div className="mt-auto h-11 w-full rounded-xl bg-black/30" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-black/20">
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="h-6 w-48 rounded-full bg-black/20" />
        <div className="h-16 w-80 rounded bg-black/20" />
        <div className="h-24 w-96 rounded bg-black/20" />
        <div className="h-4 w-64 rounded bg-black/20" />
      </div>
    </div>
  )
}

export function SectionSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 rounded bg-black/20" 
          style={{ width: `${100 - i * 15}%` }} 
        />
      ))}
    </div>
  )
}
