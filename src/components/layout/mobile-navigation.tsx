"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Navigasyon menüsünü aç"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[290px] p-0 sm:max-w-[290px]"
      >
        <SheetTitle className="sr-only">
          Planora navigasyon menüsü
        </SheetTitle>

        <SheetDescription className="sr-only">
          Planora sayfaları arasında geçiş yapın.
        </SheetDescription>

        <AppSidebar onNavigate={closeMenu} />
      </SheetContent>
    </Sheet>
  );
}