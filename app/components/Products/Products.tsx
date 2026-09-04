"use client";
import { useProductsByCategory } from "@/app/hooks/useProductsByCategory";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/general-types";
import Grid from "@mui/material/Grid";
import { isError } from "util";

function Products() {
  const { data: productData, isLoading, isError } = useProductsByCategory();

  if (isLoading) return <p>Loading Products...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div>
      <Grid container spacing={2} sx={{mt: 4}}>
      {productData?.products?.map((product: Product, index: number) => {
        return (
          <React.Fragment key={index}>
            <ProductCard product={product} />
          </React.Fragment>
        );
      })}
      </Grid>
    </div>
  );
}

export default Products;
