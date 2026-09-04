"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/useCartStore";

function Cart() {
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted) {
    return <main className="min-h-[60vh]" aria-busy="true" />;
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
            🛒
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add something you love and it will appear here.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-fuchsia-600"
          >
            Browse Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-7rem)] flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 lg:gap-12">
        <Link
            href="/products"
            className="text-sm font-semibold text-slate-500 hover:text-fuchsia-600"
          >
            ← Go Back to Products
          </Link>
        <header className="mb-8 flex items-end justify-between gap-4">
          
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-600">
              Your selection
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Shopping cart
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
          >
            Clear cart
          </button>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start">
          <section aria-labelledby="cart-items-heading">
            <h2 id="cart-items-heading" className="sr-only">
              Cart items
            </h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:p-5"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="flex min-w-0 items-center gap-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center text-2xl text-slate-400">
                          ◇
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.price.toLocaleString()} MMK each
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="flex size-8 items-center justify-center rounded-md border border-gray-300 text-lg text-gray-700 transition hover:border-purple-600 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="flex size-8 items-center justify-center rounded-md border border-gray-300 text-lg text-gray-700 transition hover:border-purple-600 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <p className="font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} MMK
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-1 text-xs font-semibold text-red-500 transition hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside
            className="mt-auto rounded-xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm lg:mt-0"
            aria-labelledby="summary-heading"
          >
            <h2 id="summary-heading" className="text-lg font-bold">
              Order summary
            </h2>
            <div className="mt-6 space-y-4 border-b border-gray-200 pb-5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total items</span>
                <span className="font-semibold text-gray-900">
                  {totalQuantity}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {totalPrice.toLocaleString()} MMK
                </span>
              </div>
            </div>
            <div className="flex justify-between py-5 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{totalPrice.toLocaleString()} MMK</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full rounded-lg bg-purple-600 px-4 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span className="block text-center">Proceed to checkout</span>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
