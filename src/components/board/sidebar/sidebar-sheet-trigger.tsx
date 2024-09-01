import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { TelevisionSimple } from "@phosphor-icons/react";

export function SidebarSheetTrigger() {
  return (
    <SheetTrigger asChild>
      <Button className="rounded-r-none w-10" size="icon">
        <TelevisionSimple className="size-4" />
      </Button>
    </SheetTrigger>
  );
}
