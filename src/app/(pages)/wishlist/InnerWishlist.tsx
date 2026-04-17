"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/interfaces/Product";
import Link from "next/link";

interface InnerWishlistProps {
  products: Product[];
  token: string;
}

export default function InnerWishlist({ products, token }: InnerWishlistProps) {
  const [items, setItems] = useState<Product[]>(products);

  function handleRemove(productId: string) {
    setItems((prev) => prev.filter((p) => p._id !== productId));
  }

  if (items.length === 0) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-sm mx-auto">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-rose-50 mx-auto mb-6">
            <Heart className="h-9 w-9 text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save products you love by clicking the heart icon on any product.
          </p>
          <Button asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full">
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
          <span className="text-sm font-semibold text-rose-600">{items.length}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        <AnimatePresence>
          {items.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard
                id={product._id}
                name={product.title}
                images={product.images && Array.isArray(product.images) && product.images.length > 0 ? product.images.map(img => img.startsWith("http") ? img : (product.imageCover ? product.imageCover.substring(0, product.imageCover.lastIndexOf('/') + 1) + img : img)) : (product.imageCover ? [product.imageCover] : [])}
                rating={product.ratingsAverage}
                reviewCount={product.ratingsQuantity}
                price={product.price}
                originalPrice={product.price + 200}
                onWishlistRemove={() => handleRemove(product._id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
