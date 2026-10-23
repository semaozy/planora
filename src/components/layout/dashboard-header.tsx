"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pageTitles: Record<string, string> = {
  "/dashboard": "Ana Sayfa",
  "/calendar": "Takvim",
  "/tasks": "Görevler",
  "/habits": "Alışkanlıklar",
  "/sports": "Spor",
  "/nutrition": "Beslenme",
  "/courses": "Dersler",
  "/work": "İş ve Kariyer",
  "/projects": "Projeler",
  "/notes": "Notlar",
  "/reports": "Raporlar",
  "/profile": "Profil",
  "/settings": "Ayarlar",
};

function getPageTitle(pathname: string) {
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  const matchingPath = Object.keys(pageTitles).find(
    (path) =>
      path !== "/dashboard" &&
      pathname.startsWith(`${path}/`)
  );

  return matchingPath
    ? pageTitles[matchingPath]
    : "Planora";
}

export function DashboardHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex w-full items-center gap-3">
        <MobileNavigation />

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">
            {pageTitle}
          </h2>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Planora'da ara..."
              className="w-56 pl-9 lg:w-72"
              aria-label="Planora'da ara"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Bildirimleri görüntüle"
            title="Bildirimler"
          >
            <Bell className="size-4" />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}