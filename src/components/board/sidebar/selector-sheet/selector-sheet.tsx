import { Streamer } from "@/@types/streamer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { GROUPS } from "@/data";
import { getStreamersData } from "@/lib/api/get-streamers-data";
import { getStreamsData } from "@/lib/api/get-streams-data";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SidebarSheetTrigger } from "../sidebar-sheet-trigger";
import { GroupItem } from "./group-item";
import { SkeletonGroup } from "./skeleton-group";
import { SkeletonStreamer } from "./skeleton-streamer";
import { StreamerItem } from "./streamer-item";

type SelectedGroup = {
  display_name: string;
  slug: string;
  streamers: Streamer[];
};

type SelectedStreamer = {
  display_name: string;
  login_name: string;
};

export function SelectorSheet() {
  const { t } = useTranslation("board");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: streamersData, isLoading: isLoadingStreamersData } = useQuery({
    queryKey: ["streamers"],
    queryFn: getStreamersData,
    staleTime: 60 * 1000,
  });
  const {
    data: streamsData,
    isLoading: isLoadingStreamsData,
    refetch,
    isStale,
  } = useQuery({
    queryKey: ["streams"],
    queryFn: getStreamsData,
    staleTime: 60 * 60 * 1000,
  });
  const [selectedStreamers, setSelectedStreamers] = useState<
    SelectedStreamer[]
  >([]);
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroup[]>([]);

  const isLoading = isLoadingStreamersData || isLoadingStreamsData;

  const mergedStreamersData = streamersData?.map(function (streamer): Streamer {
    const stream = streamsData?.find(
      (s) => s.login_name === streamer.login_name
    );

    if (!stream) return { ...streamer, is_online: false };
    return { ...streamer, ...stream, is_online: true };
  });

  const mergedGroupsData = GROUPS.map(function (group) {
    return {
      display_name: group.display_name,
      slug: group.slug,
      streamers: group.login_names
        .map((login_name) => {
          return mergedStreamersData?.find((s) => s.login_name === login_name);
        })
        .filter((s) => s !== undefined) as Streamer[],
    };
  });

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open && isStale) refetch();
      }}
    >
      <SidebarSheetTrigger />
      <SheetContent
        className="sm:max-w-lg"
        side={isDesktop ? "right" : "bottom"}
      >
        <div className="grid grid-rows-[auto_1fr_auto] gap-y-4 max-h-full h-full">
          <SheetHeader>
            <SheetTitle>{t("sidebar.selector.title")}</SheetTitle>
            <SheetDescription>
              {t("sidebar.selector.description")}
            </SheetDescription>
          </SheetHeader>
          <Tabs
            defaultValue="streamers"
            className="overflow-y-hidden flex flex-col"
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="streamers">Streamers</TabsTrigger>
              <TabsTrigger value="groups">Grupos</TabsTrigger>
            </TabsList>
            <TabsContent value="streamers" className="overflow-y-hidden">
              {isLoading && (
                <div className="md:h-full h-[45vh] grid grid-cols-3 overflow-y-hidden">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonStreamer key={i} />
                  ))}
                </div>
              )}
              {!isLoading && (
                <ToggleGroup
                  type="multiple"
                  className="md:h-full h-[45vh] grid grid-cols-3 overflow-y-auto scrollbar pr-2"
                  value={selectedStreamers.map((s) => s.login_name)}
                  onValueChange={(value) => {
                    setSelectedStreamers(
                      value.map(
                        (s) =>
                          mergedStreamersData?.find(
                            (streamer) => streamer.login_name === s
                          ) as SelectedStreamer
                      )
                    );
                  }}
                >
                  {mergedStreamersData?.map((streamer) => {
                    return (
                      <StreamerItem
                        streamer={streamer}
                        value={streamer.login_name}
                        key={streamer.login_name}
                      />
                    );
                  })}
                </ToggleGroup>
              )}
            </TabsContent>
            <TabsContent value="groups" className="overflow-y-hidden">
              {isLoading && (
                <div className="md:h-full h-[45vh] grid grid-cols-1 overflow-y-hidden pr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonGroup key={i} />
                  ))}
                </div>
              )}
              {!isLoading && (
                <ToggleGroup
                  type="multiple"
                  className="md:h-full h-[45vh] grid grid-cols-1 overflow-y-auto scrollbar pr-2"
                  value={selectedGroups.map((s) => s.slug)}
                  onValueChange={(value) => {
                    setSelectedGroups(
                      value.map(
                        (s) =>
                          mergedGroupsData?.find(
                            (group) => group.slug === s
                          ) as SelectedGroup
                      )
                    );
                  }}
                >
                  {mergedGroupsData?.map((group) => {
                    return (
                      <GroupItem
                        key={group.slug}
                        value={group.slug}
                        group={group}
                      />
                    );
                  })}
                </ToggleGroup>
              )}
            </TabsContent>
          </Tabs>
          <div>
            <Button
              onClick={() => console.log(selectedStreamers, selectedGroups)}
            >
              Assistir
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
