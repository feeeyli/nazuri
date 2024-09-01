import { STREAMERS } from "@/data";
import axios from "axios";
import { z } from "zod";

export const streamSchema = z.object({
  login_name: z.string(),
  game_name: z.string().optional(),
  title: z.string().optional(),
});

const twitchStreamSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_login: z.string(),
  user_name: z.string(),
  game_id: z.string(),
  game_name: z.string(),
  type: z.enum(["live", "archive"]),
  title: z.string(),
  tags: z.array(z.string()),
  viewer_count: z.number(),
  started_at: z.string(),
  language: z.string(),
  thumbnail_url: z.string(),
  tag_ids: z.array(z.string()),
  is_mature: z.boolean(),
});

export async function getStreamsData() {
  const response = await axios.get<{
    data: z.infer<typeof twitchStreamSchema>[];
  }>("https://api.twitch.tv/helix/streams", {
    params: {
      user_login: STREAMERS,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TWITCH_ACCESS_TOKEN}`,
      "Client-Id": import.meta.env.VITE_TWITCH_CLIENT_ID,
    },
    paramsSerializer: {
      indexes: null,
    },
  });

  return response.data.data.map((stream) =>
    streamSchema.parse({
      login_name: stream.user_login,
      game_name: stream.game_name,
      title: stream.title,
    })
  );
}
