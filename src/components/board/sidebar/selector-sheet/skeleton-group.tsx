import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonGroup() {
  return (
    <div className="p-2 h-auto w-full grid grid-cols-[7rem_1fr] items-start gap-2">
      <Skeleton className="size-28" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
