import apiService from "../../../../services/api";
import { Brand } from "@/interfaces/Brand";
import BrandCard from "@/components/brand/BrandCard";

export const revalidate = 3600;

export default async function Brands() {
  const brands: Brand[] = await apiService.getBrands();

  return (
    <div>
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Top Brands</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Browse products from the world's leading brands
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
