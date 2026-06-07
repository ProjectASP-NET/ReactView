"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { UserResponseData } from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";

interface UserContextType {
  user: UserResponseData | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, user: UserResponseData) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserResponseData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

function getStoredAuth(): { token: string | null; user: UserResponseData | null } {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponseData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { token: storedToken, user: storedUser } = getStoredAuth();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);

      AuthService.getCurrentUser(storedToken)
        .then((freshUser) => {
          setUser(freshUser);
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setToken(null);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((newToken: string, newUser: UserResponseData) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const updateUser = useCallback((updates: Partial<UserResponseData>) => {
    setUser((current) => {
      if (!current) return null;
      const updated = { ...current, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user && !!token,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
