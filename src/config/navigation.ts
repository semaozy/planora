import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckSquare,
  Dumbbell,
  FolderKanban,
  HeartPulse,
  LayoutDashboard,
  NotebookPen,
  Repeat2,
  Settings,
  UserRound,
} from "lucide-react";

export const mainNavigation = [
  {
    title: "Ana Sayfa",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Takvim",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Görevler",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Alışkanlıklar",
    href: "/habits",
    icon: Repeat2,
  },
];

export const lifeNavigation = [
  {
    title: "Spor",
    href: "/sports",
    icon: Dumbbell,
  },
  {
    title: "Beslenme",
    href: "/nutrition",
    icon: HeartPulse,
  },
  {
    title: "Dersler",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "İş ve Kariyer",
    href: "/work",
    icon: BriefcaseBusiness,
  },
];

export const organizationNavigation = [
  {
    title: "Projeler",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Notlar",
    href: "/notes",
    icon: NotebookPen,
  },
  {
    title: "Raporlar",
    href: "/reports",
    icon: BarChart3,
  },
];

export const accountNavigation = [
  {
    title: "Profil",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "Ayarlar",
    href: "/settings",
    icon: Settings,
  },
];

export type NavigationItem = (typeof mainNavigation)[number];