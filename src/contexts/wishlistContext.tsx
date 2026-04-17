"use client";

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import apiService from "../../services/api";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistIds: string[];
  setWishlistIds: Dispatch<SetStateAction<string[]>>;
  toggleWishlist: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  setWishlistIds: () => {},
  toggleWishlist: async () => {},
  isWishlisted: () => false,
  wishlistCount: 0,
});

export function useWishlist() {
  return useContext(wishlistContext);
}

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      const token = (session?.user as any)?.token as string;
      if (!token) {
        toast.error("Please sign in to use wishlist");
        return;
      }
      const alreadyWishlisted = wishlistIds.includes(productId);
      if (alreadyWishlisted) {
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        const res = await apiService.removeFromWishlist(productId, token);
        if (res.status !== "success") {
          setWishlistIds((prev) => [...prev, productId]);
          toast.error("Failed to remove from wishlist");
        } else {
          toast.success("Removed from wishlist");
        }
      } else {
        setWishlistIds((prev) => [...prev, productId]);
        const res = await apiService.addToWishlist(productId, token);
        if (res.status !== "success") {
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
          toast.error("Failed to add to wishlist");
        } else {
          toast.success("Added to wishlist ❤️");
        }
      }
    },
    [wishlistIds, session]
  );

  return (
    <wishlistContext.Provider
      value={{
        wishlistIds,
        setWishlistIds,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
