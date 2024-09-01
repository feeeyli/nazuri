import { Streamer } from "@/@types/streamer";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Heart } from "@phosphor-icons/react";
import { ComponentProps } from "react";

type StreamerItemProps = ComponentProps<typeof ToggleGroupItem> & {
  streamer: Streamer;
};

export function StreamerItem({ streamer, ...props }: StreamerItemProps) {
  return (
    <div className="relative h-full">
      <ToggleGroupItem
        {...props}
        data-is-online={streamer.is_online}
        className="p-2 h-auto w-full flex-col gap-2 group"
      >
        <img
          className="w-full aspect-square group-data-[is-online=false]:grayscale rounded-md"
          src={streamer.thumbnail_url}
        />
        <div className="flex flex-col w-full text-left">
          <span>{streamer.display_name}</span>
          {streamer.is_online && (
            <span className="text-xs text-primary">{streamer.game_name}</span>
          )}
        </div>
      </ToggleGroupItem>
      <Toggle className="absolute top-1 left-1 size-7 p-0 bg-secondary hover:bg-secondary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
        <Heart className="size-4" />
      </Toggle>
    </div>
  );
}
