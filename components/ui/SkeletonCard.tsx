export default function SkeletonCard() {
  return (
    <div className="card p-0 h-full">
      <div className="skeleton h-48 w-full rounded-t-xl rounded-b-none" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex gap-3 pt-2">
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
