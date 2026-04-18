export function ProductCardSkeleton() {
  return (
    <div className="glass rounded-3xl overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-rose-soft/40 to-sage-soft/40 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-2 w-16 rounded-full bg-foreground/10 animate-pulse" />
        <div className="h-4 w-3/4 rounded-full bg-foreground/10 animate-pulse" />
        <div className="h-4 w-1/2 rounded-full bg-foreground/10 animate-pulse" />
        <div className="h-5 w-20 rounded-full bg-foreground/10 animate-pulse mt-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
