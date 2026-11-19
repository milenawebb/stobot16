import { useQuery } from "@tanstack/react-query";
import { listActiveListings } from "@/lib/listings.functions";

export const activeListingsQuery = {
  queryKey: ["active-listings"] as const,
  queryFn: () => listActiveListings(),
  staleTime: 60_000,
};

/** true/false once resolved; undefined while loading (render nothing then). */
export function useHasActiveListings(): boolean | undefined {
  const { data, isSuccess } = useQuery(activeListingsQuery);
  return isSuccess ? data.length > 0 : undefined;
}
