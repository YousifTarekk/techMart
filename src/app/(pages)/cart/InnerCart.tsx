"use client";

import { Loader2, Minus, Plus, ShoppingCart as ShoopinCartIcon, ShoppingBagIcon, ShoppingCartIcon, Trash2 } from "lucide-react";
import { use, useContext, useEffect, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddToCartResponse } from "@/interfaces/cart/AddToCartResponse";
import Link from "next/link";
import { removeItem } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import apiService from "../../../../services/api";
import CartProduct from "@/components/product/CartProduct";
import { toast } from "sonner";
import { col, style } from "framer-motion/client";
import { cartContext } from "@/contexts/cartContext";
import AddressForm from "@/components/checkout/AddressForm";



interface InnerCartProps {
  cart: AddToCartResponse;
  token: string;
}


export default function ShoppingCart({ cart, token }: InnerCartProps) {
  const [innerCartData, setInnerCartData] = useState<AddToCartResponse>(cart);
  const [isClearing, setIsClearing] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  useEffect(() => {
    setCartCount(innerCartData.numOfCartItems);
  }, [innerCartData, setCartCount]);


  async function removeItem(productId: string) {
    const res = await apiService.removeProductFromCart(productId, token);
    setInnerCartData(res);
    toast.success(res.message);
  }

  async function handleCheckout(data: { details: string; phone: string; city: string }) {
    setIsCheckoutLoading(true);
    try {
      const res = await apiService.checkout(cart.cartId, token, data);
      toast.success("Proceeding to checkout...");
      location.href = res.session.url;
    } catch (error) {
      toast.error("Error processing checkout");
    } finally {
      setIsCheckoutLoading(false);
    }
  }

  async function clearCart() {
    setIsClearing(true);
    const res = await apiService.clearCart(token);
    toast.success("Cart cleared successfully");
    setInnerCartData(res);
    setIsClearing(false);
  }
  async function updateProductCount(productId: string, count: number) {
    const res = await apiService.updateProductCount(productId, count, token);
    setInnerCartData(res);
    toast.success("Cart updated successfully");
  }


  if (innerCartData.numOfCartItems === 0) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="container max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="container grid gap-4">
        <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCartData.data.products.map((item) => (
                <CartProduct
                  key={item._id}
                  removeItem={removeItem} item={item}
                  updateProductCount={updateProductCount}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShoppingCartIcon className="size-4" />
                    {innerCartData.numOfCartItems}{" "}
                    {innerCartData.numOfCartItems === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(0)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
              </div>

              <AddressForm onSubmit={handleCheckout} isLoading={isCheckoutLoading} />

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>

        <Button variant={"outline"}
          style={
            {
              background: "black",
              color: "red"
            }
          }
          onClick={clearCart}
          disabled={isClearing}
          className="w-fit px-8 disabled:cursor-not-allowed bg-accent-foreground mt-4"
        >
          {isClearing && <Loader2 className="mr-2 animate-spin" />}{" "}clear cart</Button>

      </div>
    </section>
  );
};


export { ShoppingCart };
