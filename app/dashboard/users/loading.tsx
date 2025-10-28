import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto space-y-1.5 py-5">
      {Array.from({ length: 4 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <keyindex>
        <div className="space-y-2 rounded-lg border p-3" key={i}>
          <Skeleton className="h-4 w-34" />
          <Skeleton className="h-4 w-64" />
        </div>
      ))}
    </div>
  );
}
