import { z } from "zod";

const streamerSchema = z.object({
  display_name: z.string(),
  login_name: z.string(),
  thumbnail_url: z.string(),
  platform: z.enum(["TWITCH", "YOUTUBE"]),
  is_online: z.boolean(),
  game_name: z.string().optional(),
  title: z.string().optional(),
});

export type Streamer = z.infer<typeof streamerSchema>;
