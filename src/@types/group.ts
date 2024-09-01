import { z } from "zod";

const groupSchema = z.object({
  display_name: z.string(),
  slug: z.string(),
  login_names: z.array(z.string()),
});

export type Group = z.infer<typeof groupSchema>;
