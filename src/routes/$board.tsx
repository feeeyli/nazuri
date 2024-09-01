import { Sidebar } from "@/components/board/sidebar/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$board")({
  component: Board,
});

function Board() {
  return (
    <main className="grid [grid-template-areas:'main_sidebar'] grid-cols-[1fr_2.5rem]">
      <div className="[grid-area:main]"></div>
      <Sidebar />
    </main>
  );
}
