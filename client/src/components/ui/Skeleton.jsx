export function SkeletonBox({ className = "" }) {
  return (
    <div
      className={`bg-slate-200 rounded-lg animate-pulse ${className}`}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      <SkeletonBox className="aspect-video rounded-none" />
      <div className="p-5 space-y-3">
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <SkeletonBox className="h-6 w-16" />
          <SkeletonBox className="h-6 w-16" />
          <SkeletonBox className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      <SkeletonBox className="aspect-video rounded-none" />
      <div className="p-5 space-y-3">
        <SkeletonBox className="h-3 w-1/3" />
        <SkeletonBox className="h-5 w-11/12" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-2/3" />
      </div>
    </div>
  );
}