import { SelectorSheet } from "./selector-sheet/selector-sheet";

export function Sidebar() {
  return (
    <aside className="[grid-area:sidebar] py-4">
      <SelectorSheet />
    </aside>
  );
}
