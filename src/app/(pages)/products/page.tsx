"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/redux/slices/productSlice";
import { ProductCard } from "@/components/product/ProductCard";


export default function Products() {
  const dispatch = useDispatch<any>();
  const { products, loading } = useSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-5 gap-4">

        {
          products.map((product: any) => (
            <ProductCard name={product.title} images={product.images} rating={product.ratingsAverage}
              reviewCount={product.ratingsQuantity}
              price={product.price}
              originalPrice={product.price + 200}
              id={product._id}
            />

          ))
        }






      </div>
    </div>
  );
}