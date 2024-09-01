import { STREAMERS } from "@/data";
import axios from "axios";
import { z } from "zod";

export const streamerSchema = z.object({
  display_name: z.string(),
  login_name: z.string(),
  thumbnail_url: z.string(),
  platform: z.enum(["TWITCH", "YOUTUBE"]),
});

const twitchUserSchema = z.object({
  id: z.string(),
  login: z.string(),
  display_name: z.string(),
  type: z.enum(["admin", "global_mod", "staff", ""]),
  broadcaster_type: z.enum(["partner", "affiliate", ""]),
  description: z.string().optional(),
  profile_image_url: z.string(),
  offline_image_url: z.string(),
  view_count: z.number(),
  email: z.string().optional(),
  created_at: z.string(),
});

export async function getStreamersData() {
  const response = await axios.get<{
    data: z.infer<typeof twitchUserSchema>[];
  }>("https://api.twitch.tv/helix/users", {
    params: {
      login: STREAMERS,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TWITCH_ACCESS_TOKEN}`,
      "Client-Id": import.meta.env.VITE_TWITCH_CLIENT_ID,
    },
    paramsSerializer: {
      indexes: null,
    },
  });

  return response.data.data
    .map((streamer) =>
      streamerSchema.parse({
        display_name: streamer.display_name,
        login_name: streamer.login,
        thumbnail_url: streamer.profile_image_url,
        platform: "TWITCH",
      })
    )
    .sort((a, b) => a.display_name.localeCompare(b.display_name));
}
