"use client";

import { MenuIcon, ShoppingCart, Heart, ShoppingBagIcon } from "lucide-react";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cartContext } from "@/contexts/cartContext";
import { useWishlist } from "@/contexts/wishlistContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {


  const session = useSession();
  const router = useRouter();
  const { cartCount } = useContext(cartContext);
  const { wishlistCount } = useWishlist();

  return (
    <section className={cn("p-4", className)}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-primary text-primary-foreground p-1.5 rounded-md">
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              FreshCart
            </span>
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>

              <NavigationMenuItem>
                <Link href="/products" className={navigationMenuTriggerStyle()}>
                  Products
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/categories" className={navigationMenuTriggerStyle()}>
                  Categories
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/brands" className={navigationMenuTriggerStyle()}>
                  Brands
                </Link>
              </NavigationMenuItem>

              {session.status === "authenticated" &&
                <>
                 <NavigationMenuItem>
                    <Link href="/wishlist" className={navigationMenuTriggerStyle()}>
                      <div className="relative flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        Wishlist
                        {wishlistCount > 0 && (
                          <Badge className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-500 hover:bg-rose-600">
                            {wishlistCount}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                  <Link href="/cart" className={navigationMenuTriggerStyle()}>
                    <div className="relative flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4" />
                      Cart
                      {cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {cartCount}
                        </Badge>
                      )}
                    </div>
                  </Link>
                </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/orders" className={navigationMenuTriggerStyle()}>
                      Orders
                    </Link>
                  </NavigationMenuItem>
                </>}

            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Buttons */}
          {
            session.status === "unauthenticated" ? (
              <div className="hidden items-center gap-4 lg:flex">
                <Button onClick={() => router.push("/auth/signin")} variant="outline">Sign in</Button>
                <Button onClick={() => router.push("/auth/signup")}>Sign up</Button>
              </div>
            ) : <div className="hidden items-center gap-4 lg:flex">
              <Button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                variant="outline"
              >
                Sign out
              </Button>

            </div>
          }
          {/* Mobile Sheet (زي ما هو TOP) */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex items-center justify-center bg-primary text-primary-foreground p-1.5 rounded-md">
                      <ShoppingBagIcon className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                      FreshCart
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">

                {/* ✅ اللينكات بدل القديمة */}
                <div className="flex flex-col gap-4 mt-4">

                  <Link href="/products" className="font-medium hover:text-primary transition-colors">
                    Products
                  </Link>

                  <Link href="/categories" className="font-medium hover:text-primary transition-colors">
                    Categories
                  </Link>

                  <Link href="/brands" className="font-medium hover:text-primary transition-colors">
                    Brands
                  </Link>

                  {session.status === "authenticated" && (
                    <>
                       <Link href="/wishlist" className="font-medium hover:text-primary transition-colors relative">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Wishlist
                          {wishlistCount > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-500">
                              {wishlistCount}
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <Link href="/cart" className="font-medium hover:text-primary transition-colors relative">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Cart
                          {cartCount > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                              {cartCount}
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <Link href="/orders" className="font-medium hover:text-primary transition-colors">
                        Orders
                      </Link>
                    </>
                  )}

                </div>

                <div className="mt-6 flex flex-col gap-4">
                  {session.status === "unauthenticated" ? (
                    <>
                      <Button onClick={() => router.push("/auth/signin")} variant="outline">Sign in</Button>
                      <Button onClick={() => router.push("/auth/signup")}>Sign up</Button>
                    </>
                  ) : (
                    <Button onClick={() => signOut({ callbackUrl: "/auth/signin" })} variant="outline">Sign out</Button>
                  )}
                </div>

              </div>
            </SheetContent>
          </Sheet>

        </nav>
      </div>
    </section>
  );
};

export default Navbar;