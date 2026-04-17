import apiService from "../../../../services/api";
import { Category } from "@/interfaces/Category";
import CategoryCard from "@/components/category/CategoryCard";

export const revalidate = 3600;

export default async function Categories() {
  const categories: Category[] = await apiService.getCategories();

  return (
    <div>
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Shop by Category</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Explore our wide range of product categories
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}
