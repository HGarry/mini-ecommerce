"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

type DeliveryMethod = "standard" | "express" | "dropoff";

type AddressFields = {
  fullName: string;
  phone: string;
  stateCity: string;
  township: string;
  address: string;
};

const deliveryOptions: Array<{
  id: DeliveryMethod;
  name: string;
  detail: string;
  fee: number;
}> = [
  {
    id: "standard",
    name: "Standard Home Delivery",
    detail: "3-5 business days",
    fee: 2500,
  },
  {
    id: "express",
    name: "Express Delivery",
    detail: "Next business day",
    fee: 6000,
  },
  {
    id: "dropoff",
    name: "Township Drop-off Point",
    detail: "Collect in 2-4 business days",
    fee: 1500,
  },
];

const initialAddress: AddressFields = {
  fullName: "",
  phone: "",
  stateCity: "",
  township: "",
  address: "",
};

const formatPrice = (price: number) => `${price.toLocaleString()} MMK`;

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [isMounted, setIsMounted] = useState(false);
  const [address, setAddress] = useState<AddressFields>(initialAddress);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("standard");
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressFields, string>>
  >({});
  const [isPlaced, setIsPlaced] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted) return <main className="min-h-[60vh]" aria-busy="true" />;

  if (cart.length === 0 && !isPlaced) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-slate-500">
            Add products before starting checkout.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-fuchsia-600"
          >
            Browse Products
          </Link>
        </section>
      </main>
    );
  }

  const subtotal = getTotalPrice();
  const selectedDelivery =
    deliveryOptions.find((option) => option.id === deliveryMethod) ??
    deliveryOptions[0];
  const grandTotal = subtotal + selectedDelivery.fee;

  const updateAddress = (field: keyof AddressFields, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof AddressFields, string>> = {};
    (Object.keys(address) as Array<keyof AddressFields>).forEach((field) => {
      if (!address[field].trim()) nextErrors[field] = "This field is required";
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsPlaced(true);
    clearCart();
  };

  if (isPlaced) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <section className="w-full max-w-lg rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
            ✓
          </div>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Order confirmed
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Thanks, {address.fullName}
          </h1>
          <p className="mt-3 text-slate-500">
            Your order is being prepared. We will contact you at {address.phone}{" "}
            with delivery updates.
          </p>
          <Link
            href="/"
            className="mt-7 inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-7rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cart"
          className="text-sm font-semibold text-slate-500 hover:text-fuchsia-600"
        >
          ← Back to cart
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-600">
                  Delivery details
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  Where should we deliver?
                </h1>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={address.fullName}
                  error={errors.fullName}
                  onChange={(value) => updateAddress("fullName", value)}
                />
                <Field
                  label="Phone number"
                  type="tel"
                  value={address.phone}
                  error={errors.phone}
                  onChange={(value) => updateAddress("phone", value)}
                />
                <Field
                  label="State / City"
                  value={address.stateCity}
                  error={errors.stateCity}
                  onChange={(value) => updateAddress("stateCity", value)}
                />
                <Field
                  label="Township / District"
                  value={address.township}
                  error={errors.township}
                  onChange={(value) => updateAddress("township", value)}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Detailed street address"
                    value={address.address}
                    error={errors.address}
                    onChange={(value) => updateAddress("address", value)}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-600">
                Delivery method
              </p>
              <div className="mt-5 space-y-3">
                {deliveryOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${deliveryMethod === option.id ? "border-fuchsia-500 bg-fuchsia-50" : "border-slate-200 hover:border-slate-400"}`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={deliveryMethod === option.id}
                        onChange={() => setDeliveryMethod(option.id)}
                        className="size-4 accent-fuchsia-600"
                      />
                      <span>
                        <span className="block font-semibold text-slate-900">
                          {option.name}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {option.detail}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-slate-900">
                      {formatPrice(option.fee)}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-600">
                Payment
              </p>
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                  Cash on delivery
                </span>
                <br />
                Pay securely when your order arrives.
              </div>
            </section>

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Confirm &amp; Place Order
            </button>
          </form>

          <aside
            className="rounded-xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm lg:sticky lg:top-6 sm:p-6"
            aria-labelledby="checkout-summary"
          >
            <h2 id="checkout-summary" className="text-lg font-bold">
              Order summary
            </h2>
            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto border-b border-gray-200 pb-5">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center text-gray-400">
                        ◇
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{formatPrice(selectedDelivery.fee)}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-between border-t border-gray-200 pt-5 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  error,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-2 w-full rounded-lg border bg-white px-3 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100 ${error ? "border-red-400" : "border-slate-300"}`}
      />
      {error && (
        <span className="mt-1 block text-xs font-normal text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
