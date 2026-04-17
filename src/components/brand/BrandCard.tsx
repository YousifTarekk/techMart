"use client";

import { motion } from "framer-motion";
import { Brand } from "@/interfaces/Brand";
import Link from "next/link";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/products?brand=${brand._id}`}
        className="group flex flex-col items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
      >
        {/* Logo */}
        <div className="h-20 w-20 flex items-center justify-center rounded-xl overflow-hidden bg-muted group-hover:bg-muted/60 transition-colors duration-300 p-2">
          <img
            src={brand.image}
            alt={brand.name}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Name */}
        <span className="text-sm font-semibold text-center leading-tight group-hover:text-primary transition-colors duration-200">
          {brand.name}
        </span>
      </Link>
    </motion.div>
  );
}
