"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface AdminRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function AdminRoute({ children, allowedRoles = ["Admin", "Manager"] }: AdminRouteProps) {
  const { user, isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/auth");
        return;
      }

      if (user && !allowedRoles.includes(user.role?.name || "")) {
        router.push("/");
      }
    }
  }, [isLoggedIn, isLoading, user, router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-(--text-secondary)">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user || !allowedRoles.includes(user.role?.name || "")) {
    return null;
  }

  return <>{children}</>;
}
