"use client";

import CartContextProvider from "@/contexts/cartContext";
import WishlistContextProvider from "@/contexts/wishlistContext";
import { store } from "@/redux/store";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider>
          <CartContextProvider>
            <WishlistContextProvider>{children}</WishlistContextProvider>
          </CartContextProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}