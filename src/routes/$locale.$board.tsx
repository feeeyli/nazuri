import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/$board")({
  component: Board,
  beforeLoad({ params }) {
    if (!["pt", "en"].includes(params.locale)) {
      throw redirect({
        to: "/$locale/$board",
        params: { ...params, locale: "pt" },
        replace: true,
      });
    }
  },
});

function Board() {
  const { locale, board } = Route.useParams();

  return (
    <div>
      <span>Lang: {locale}</span>
      <div>Board: {board}!</div>
    </div>
  );
}
