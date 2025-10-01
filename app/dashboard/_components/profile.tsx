"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";
import { authClient } from "@/utils/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p>{session.user.name}</p>
        <p className="text-muted-foreground">{session.user.email}</p>
        <Button size={"sm"} onClick={logout}>
          <LogOut /> Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
