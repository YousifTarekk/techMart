"use client";

import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import apiService from "../../../services/api";
import { toast } from "sonner";
import { cartContext } from "@/contexts/cartContext";
import { useWishlist } from "@/contexts/wishlistContext";


export interface ProductCardProps {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  freeShipping?: boolean;
  id: string;
  onWishlistRemove?: () => void;
}
export function ProductCard({
  name = "Premium Wool Sweater",
  price = 89.99,
  originalPrice = 129.99,
  rating = 4.8,
  reviewCount = 142,
  images = ["/logo.svg", "/logo.svg", "/logo.svg"],
  colors = ["#1e293b", "#a855f7", "#0ea5e9", "#84cc16"],
  sizes = ["XS", "S", "M", "L", "XL"],
  isNew = true,
  isBestSeller = true,
  discount = 30,
  freeShipping = true,
  id,
  onWishlistRemove
}: ProductCardProps) {
  const session = useSession();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const { isWishlisted, toggleWishlist } = useWishlist();

  const isWished = isWishlisted(id);

  // Filter out empty or invalid image URLs
  const validImages = (images ?? []).filter(img => img && typeof img === 'string' && img.trim().length > 0);
  const displayImages = validImages.length > 0 ? validImages : ["/logo.svg"];
  const currentImage = displayImages[currentImageIndex];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setImageError(false);
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setImageError(false);
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isAddedToCart) return;
    setIsAddingToCart(true);
    const token = session.data?.user?.token as string;
    const res = await apiService.addProductToCart(id, token);

    if (res.status === "success") {
      toast.success(res.message, {
        style: { color: "green" },
      });
      setCartCount(res.numOfCartItems);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } else {
      toast.error(res.message || "Failed to add to cart");
    }

    setIsAddingToCart(false);
  };

  async function handleToggleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    await toggleWishlist(id);
    if (isWished && onWishlistRemove) {
      onWishlistRemove();
    }
  }

  return (
    <Card className=" p-0 w-full max-w-sm overflow-hidden group bg-backgrou text-foreground shadow-xl hover:shadow-lg transition-all duration-300 rounded-md block">
      {/* Image carousel */}
      <div className="relative aspect-[3/4] overflow-hidden p-0 block">
        <Link href={`/products/${id}`} className="block w-full h-full">
          <motion.img
            key={currentImageIndex}
            src={currentImage}
            alt={`${name} - View ${currentImageIndex + 1}`}
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              setImageError(true);
              (e.target as HTMLImageElement).src = "/logo.svg";
            }}
          />
        </Link>

        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm pointer-events-auto"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm pointer-events-auto"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
          {displayImages.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all pointer-events-auto ${index === currentImageIndex ? "bg-primary w-4" : "bg-primary/30"
                }`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setImageError(false);
                setCurrentImageIndex(index);
              }}
            />
          ))}
        </div>

        {/* Wishlist button */}
        <Button
          variant="secondary"
          size="icon"
          className={`absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm z-10 ${isWished ? "text-rose-500" : ""
            }`}
          onClick={handleToggleWishlist}
        >
          <Heart
            className={`h-4 w-4 ${isWished ? "fill-rose-500" : ""}`}
          />
        </Button>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/products/${id}`} className="font-medium line-clamp-1">
              {name}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span className="ml-1 text-sm font-medium">{rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviewCount} reviews)
              </span>
              {freeShipping && (
                <span className="text-xs text-emerald-600 ml-auto">
                  Free shipping
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{formatPrice(price)}</span>
            {originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Colors & Sizes */}

        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart || isAddedToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : isAddedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}





