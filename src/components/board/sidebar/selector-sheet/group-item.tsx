import { Streamer } from "@/@types/streamer";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Heart } from "@phosphor-icons/react";
import { ComponentProps } from "react";

type GroupItemProps = ComponentProps<typeof ToggleGroupItem> & {
  group: {
    display_name: string;
    slug: string;
    streamers: Streamer[];
  };
};

export function GroupItem({ group, ...props }: GroupItemProps) {
  const cols =
    group.streamers.length === 1
      ? 1
      : [2, 3, 4].includes(group.streamers.length)
        ? 2
        : [5, 6, 7, 8, 9].includes(group.streamers.length)
          ? 3
          : 4;

  return (
    <div className="relative">
      <ToggleGroupItem
        {...props}
        className="p-2 h-auto w-full grid grid-cols-[7rem_1fr] items-start gap-4"
      >
        <picture className="size-28 flex flex-wrap items-center justify-center rounded-md bg-muted/40 p-0.5">
          {group.streamers.map((streamer) => (
            <img
              className="aspect-square p-[1px] rounded-md"
              src={streamer.thumbnail_url}
              key={streamer.login_name}
              style={{
                width: `${100 / cols}%`,
              }}
            />
          ))}
        </picture>
        <div className="flex flex-col text-left h-full pt-2 pb-9">
          <span>{group.display_name}</span>
          <p className="text-xs text-muted-foreground">
            {group.streamers
              .map((streamer) => streamer.display_name)
              .join(", ")}
          </p>
        </div>
      </ToggleGroupItem>
      <div className="absolute bottom-2 right-2 flex gap-2">
        <Toggle className="size-7 p-0 bg-secondary hover:bg-secondary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
          <Heart className="size-4" />
        </Toggle>
      </div>
    </div>
  );
}
