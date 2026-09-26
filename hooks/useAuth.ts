import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/user.api";
import { TUser } from "@/types/user.types";

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  const user: TUser | null = data?.data ?? null;

  return {
    user,
    isLoading,
    isAuthenticated: !isLoading && !isError && !!user,
  };
}