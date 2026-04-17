"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllProducts } from "@/redux/slices/productSlice";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import CategoryCard from "@/components/category/CategoryCard";
import apiService from "../../services/api";
import { Category } from "@/interfaces/Category";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    dispatch(getAllProducts());
    apiService.getCategories().then(setCategories).catch(console.error);
  }, [dispatch]);

  // Take only top 10 products for the homepage
  const featuredProducts = products?.slice(0, 10) || [];
  // Take only 5 categories
  const featuredCategories = categories?.slice(0, 5) || [];

  return (
    <div className="flex flex-col gap-24">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden rounded-xl bg-slate-50/80 border text-slate-900 shadow-sm mt-4">
        
        <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-20 gap-10">
          <div className="flex-1 space-y-6 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Everything you need, delivered</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Fresh <span className="text-primary">Products</span> & More at Your Doorstep
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Discover the latest gadgets, fresh trends, and premium accessories all in one place. Free shipping on all orders over $100.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button asChild size="lg" className="h-12 px-8 font-semibold shadow-md">
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 font-semibold">
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative z-10 hidden md:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1000&auto=format&fit=crop" 
                alt="Shopping cart with fresh products" 
                className="absolute inset-0 w-full h-full object-cover rounded-full shadow-xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground mt-2 text-lg">Find exactly what you're looking for</p>
          </div>
          <Link href="/categories" className="text-primary font-medium hover:underline inline-flex items-center gap-1 hidden sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
        
        <div className="mt-6 text-center sm:hidden">
            <Link href="/categories" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              View all categories <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
      </section>

      {/* ── LATEST PRODUCTS ── */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Latest Arrivals</h2>
            <p className="text-muted-foreground mt-2 text-lg">Fresh stock just added to our catalog</p>
          </div>
          <Link href="/products" className="text-primary font-medium hover:underline inline-flex items-center gap-1 hidden sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((skeleton) => (
              <div key={skeleton} className="aspect-[3/4] bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                id={product._id}
                name={product.title} 
                images={product.images && product.images.length > 0 ? product.images : [product.imageCover]} 
                rating={product.ratingsAverage}
                reviewCount={product.ratingsQuantity}
                price={product.price}
                originalPrice={product.price + 20}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── PROMOTIONAL BANNER ── */}
      <section className="rounded-3xl bg-secondary p-8 md:p-12 lg:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join our newsletter</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 h-12 px-4 rounded-md border border-border bg-background"
          />
          <Button size="lg" className="h-12 w-full sm:w-auto font-semibold">Subscribe</Button>
        </div>
      </section>
    </div>
  );
}
