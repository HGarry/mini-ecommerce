"use client";
import { Product } from "@/types/general-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Image from "next/image";
import CustomButton from "../CustomButton";

interface ProductProps {
  product: Product;
}

function ProductCard({ product }: ProductProps) {
  const { title, thumbnail, price } = product;
  return (
    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
      <Box
        sx={{
          p: 5,
          m: 2,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: 3,
          height: "100%",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#BF00FF",
            boxShadow: `
              0 20px 40px -4px rgba(0, 0, 0, 0.12),
              0 8px 16px -2px rgba(0, 0, 0, 0.06),
              inset 0 1px 2px 0 rgba(255, 255, 255, 1)
            `,
            color: "#fefefe",
          },
        }}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={800}
          height={500}
          style={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography component="h3">{title}</Typography>
        <Typography>$ {price}</Typography>
        <CustomButton product={product} />
      </Box>
    </Grid>
  );
}

export default ProductCard;
