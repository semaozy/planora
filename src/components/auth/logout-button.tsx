import { LogOut } from "lucide-react";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start text-muted-foreground"
      >
        <LogOut className="size-4" />
        Çıkış yap
      </Button>
    </form>
  );
}