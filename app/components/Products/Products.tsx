"use client";
import { useProductsByCategory } from "@/app/hooks/useProductsByCategory";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/general-types";
import Grid from "@mui/material/Grid";

function Products() {
  const { data: productData } = useProductsByCategory();
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
