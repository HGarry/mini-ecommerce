"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/general-types";
import { useCartStore } from "../../store/useCartStore";

const formatPrice = (price: number) => `${price.toLocaleString()} MMK`;

function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!productId) return;

    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data: Product) => setProduct(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-12 text-slate-500">
        Loading product...
      </main>
    );
  }

  if (hasError || !product) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Product unavailable
        </h1>
        <p className="mt-2 text-slate-500">We could not load this product.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const gallery = product.images?.length ? product.images : [product.thumbnail];
  const stock = product.stock ?? 0;
  const canAdd = stock > 0;
  const changeQuantity = (delta: number) => {
    setQuantity((current) =>
      Math.min(Math.max(1, current + delta), Math.max(1, stock)),
    );
  };

  return (
    <main className="min-h-[calc(100vh-7rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-purple-600 hover:text-purple-600"
        >
          ← Back to Products
        </Link>
        <div className="mt-6 grid gap-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          <section aria-label="Product images">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={gallery[selectedImage] || product.thumbnail}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-8"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-slate-100 ${selectedImage === index ? "border-fuchsia-500" : "border-transparent"}`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          <section className="flex flex-col justify-center">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                {product.category}
              </span>
              <span
                className={`text-sm font-semibold ${canAdd ? "text-emerald-600" : "text-red-600"}`}
              >
                {canAdd ? `${stock} in stock` : "Out of stock"}
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </p>
            <p className="mt-6 leading-7 text-slate-600">
              {product.description ||
                "A carefully selected product for your everyday needs."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6">
              <div className="flex items-center rounded-lg border border-slate-300">
                <button
                  type="button"
                  onClick={() => changeQuantity(-1)}
                  aria-label="Decrease quantity"
                  className="size-10 text-lg text-slate-600 hover:text-fuchsia-600"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => changeQuantity(1)}
                  aria-label="Increase quantity"
                  className="size-10 text-lg text-slate-600 hover:text-fuchsia-600"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                disabled={!canAdd}
                onClick={() => {
                  addToCart(product, quantity);
                  setIsAdded(true);
                }}
                className="min-w-48 flex-1 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-none"
              >
                {isAdded ? "Added to cart" : "Add to Cart"}
              </button>
            </div>
            {isAdded && (
              <Link
                href="/cart"
                className="mt-4 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700"
              >
                View your cart →
              </Link>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;
