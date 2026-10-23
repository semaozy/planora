"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck2, Sparkles } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

import {
  accountNavigation,
  lifeNavigation,
  mainNavigation,
  organizationNavigation,
} from "@/config/navigation";

import { cn } from "@/lib/utils";

type AppSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

type NavigationSectionProps = {
  title: string;
  items: Array<{
    title: string;
    href: string;
    icon: React.ComponentType<{
      className?: string;
    }>;
  }>;
  pathname: string;
  onNavigate?: () => void;
};

function NavigationSection({
  title,
  items,
  pathname,
  onNavigate,
}: NavigationSectionProps) {
  return (
    <div className="space-y-2">
      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="size-5 shrink-0" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppSidebar({
  className,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-r bg-background",
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <CalendarCheck2 className="size-5" />
          </div>

          <div>
            <p className="text-lg font-bold leading-none">
              Planora
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Kişisel yaşam asistanın
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        <NavigationSection
          title="Genel"
          items={mainNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
        />

        <NavigationSection
          title="Yaşam"
          items={lifeNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
        />

        <NavigationSection
          title="Organizasyon"
          items={organizationNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
        />

        <NavigationSection
          title="Hesap"
          items={accountNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      </div>

      <div className="border-t p-4">
        <div className="rounded-xl bg-muted p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Günlük hedef
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Bugün kendin için küçük bir görevi tamamla.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            S
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Sema
            </p>

            <p className="truncate text-xs text-muted-foreground">
              Planora kullanıcısı
            </p>
          </div>
        </div>
        <div className="mt-3">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}