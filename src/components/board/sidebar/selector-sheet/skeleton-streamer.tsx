import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonStreamer() {
  return (
    <div className="p-2 h-auto w-full flex-col gap-2">
      <Skeleton className="w-full aspect-square" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}
