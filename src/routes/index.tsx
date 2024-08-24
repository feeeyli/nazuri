import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <></>,
  beforeLoad() {
    throw redirect({
      to: "/$locale",
      params: { locale: "pt" },
      replace: true,
    });
  },
});
