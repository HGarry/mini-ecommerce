"use client";
import React from "react";
import { useCategories } from "../hooks/useCategories";
import Category from "./Category";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { categoryImages } from "../Dummy/data";

function Categories() {
  const { data: categories, isLoading, isError } = useCategories();
  const images = categoryImages;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <Container maxWidth="lg" sx={{}}>
        <Grid container sx={{ border: "1px solid #333", borderRadius: 4 }}>
          {categories
            ?.slice(0, 6)
            ?.map((category: { name: string; slug: string }, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Category
                    category={category}
                    categoryImage={images[index]}
                  />
                </React.Fragment>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default Categories;
