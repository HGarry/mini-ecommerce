"use client";
import { Product } from "@/types/general-types";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../CustomButton";

interface ProductProps {
  product: Product;
}

function ProductCard({ product }: ProductProps) {
  const { title, thumbnail, price } = product;
  return (
    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
      <article className="group m-2 flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-shadow duration-200 hover:shadow-md">
        <Link href={`/products/${product.id}`} aria-label={`View ${title}`}>
          <div className="overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={thumbnail}
              alt={title}
              width={800}
              height={500}
              className="mx-auto h-44 w-full object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <h3 className="mt-4 truncate font-semibold text-gray-900">{title}</h3>
        </Link>
        <p className="mt-2 text-lg font-bold text-gray-900">
          {price.toLocaleString()} MMK
        </p>
        <CustomButton product={product} />
      </article>
    </Grid>
  );
}

export default ProductCard;
