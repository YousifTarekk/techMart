"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Mail, MapPin, Phone, Link as LinkIcon, ShoppingBagIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand & Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-primary text-primary-foreground p-1.5 rounded-md">
                <ShoppingBagIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                FreshCart
              </span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for the latest electronics, fashion, and home essentials. Quality products at unbeatable prices.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                <LinkIcon className="w-4 h-4" /> Facebook
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                 <LinkIcon className="w-4 h-4" /> Twitter
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                 <LinkIcon className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Shop</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-primary transition-colors">Top Brands</Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-primary transition-colors">Special Offers</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>123 Commerce St, Tech City, 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>support@freshcart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

