"use client";

import { createContext, useContext, useMemo } from "react";
import { useMyUser } from "@/lib/hooks/api/useUser";
import type { MyUserResponse } from "@/lib/api/types";

interface UserContextValue {
  user: MyUserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, refetch } = useMyUser();

  const value = useMemo(
    () => ({
      user: user ?? null,
      isLoading,
      isAuthenticated: !!user,
      refetch,
    }),
    [user, isLoading, refetch]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
