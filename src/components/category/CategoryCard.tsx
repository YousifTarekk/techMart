"use client";

import { motion } from "framer-motion";
import { Category } from "@/interfaces/Category";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/products?category=${category._id}`}
        className="group flex flex-col items-center text-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-all duration-300 shadow-sm">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Name */}
        <span className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}
